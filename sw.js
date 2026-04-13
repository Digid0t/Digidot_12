/**
 * VitalPlan Service Worker v2.0
 * - Offline-First mit Cache-Strategie (Stale-While-Revalidate)
 * - Push-Benachrichtigungen (Training, Medikation, BZ-Check)
 * - Periodic Background Sync für Erinnerungen
 * - Samsung Internet & Chrome Android optimiert
 */

const CACHE_NAME = 'vitalplan-v20';
const CORE_ASSETS = [
  './vitalplan.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

/* ===== INSTALL ===== */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ===== ACTIVATE ===== */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ===== FETCH — Stale-While-Revalidate ===== */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // Return cached version immediately, update in background
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline — fallback to main page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./vitalplan.html');
        }
        return null;
      });

      return cached || fetchPromise;
    })
  );
});

/* ===== PUSH NOTIFICATIONS ===== */
self.addEventListener('push', event => {
  let data = { title: 'VitalPlan', body: 'Zeit für Ihr Training!', tag: 'vitalplan-push' };

  if (event.data) {
    try {
      data = Object.assign(data, event.data.json());
    } catch (e) {
      data.body = event.data.text() || data.body;
    }
  }

  const options = {
    body: data.body,
    icon: './icons/icon-192.png',
    badge: './icons/icon-96.png',
    tag: data.tag || 'vitalplan-push',
    vibrate: [200, 100, 200, 100, 200], // Deutlich spürbar auf Samsung Tablets
    requireInteraction: true, // Bleibt sichtbar bis Nutzer reagiert
    renotify: true,
    actions: [
      { action: 'open', title: '🏋️ Öffnen' },
      { action: 'dismiss', title: 'Später' }
    ],
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/* ===== NOTIFICATION CLICK ===== */
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  // Open or focus the app
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      // Focus existing window if found
      for (const client of clients) {
        if (client.url.includes('vitalplan') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      return self.clients.openWindow('./vitalplan.html');
    })
  );
});

/* ===== NOTIFICATION CLOSE ===== */
self.addEventListener('notificationclose', event => {
  // Analytics or logging could go here
});

/* ===== MESSAGE HANDLING (from main app) ===== */
self.addEventListener('message', event => {
  const msg = event.data;
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'SCHEDULE_NOTIFICATION':
      // Store scheduled notification in IndexedDB or cache
      scheduleNotification(msg.payload);
      break;

    case 'CHECK_REMINDERS':
      checkAndSendReminders(msg.payload);
      break;

    case 'CACHE_UPDATE':
      // Force update cache
      caches.open(CACHE_NAME).then(cache => {
        cache.addAll(CORE_ASSETS);
      });
      break;
  }
});

/* ===== PERIODIC BACKGROUND SYNC ===== */
self.addEventListener('periodicsync', event => {
  if (event.tag === 'vitalplan-reminder-check') {
    event.waitUntil(checkScheduledReminders());
  }
});

/* ===== BACKGROUND SYNC (for offline actions) ===== */
self.addEventListener('sync', event => {
  if (event.tag === 'vitalplan-backup-sync') {
    // Future: sync backup data when back online
    event.waitUntil(Promise.resolve());
  }
});

/* ===== REMINDER HELPERS ===== */

async function scheduleNotification(payload) {
  // Store in a simple cache-based schedule store
  const cache = await caches.open('vitalplan-schedules');
  const schedules = await getSchedules(cache);
  schedules.push({
    id: Date.now(),
    title: payload.title,
    body: payload.body,
    tag: payload.tag,
    scheduledTime: payload.scheduledTime, // ISO string
    recurring: payload.recurring || false,
    recurringTime: payload.recurringTime || null // "HH:MM"
  });
  await cache.put('schedules.json', new Response(JSON.stringify(schedules)));
}

async function getSchedules(cache) {
  try {
    const resp = await cache.match('schedules.json');
    if (resp) return await resp.json();
  } catch (e) { /* ignore */ }
  return [];
}

async function checkScheduledReminders() {
  const cache = await caches.open('vitalplan-schedules');
  const schedules = await getSchedules(cache);
  const now = new Date();
  const remaining = [];

  for (const s of schedules) {
    const scheduled = new Date(s.scheduledTime);
    if (now >= scheduled) {
      // Fire notification
      await self.registration.showNotification(s.title, {
        body: s.body,
        icon: './icons/icon-192.png',
        badge: './icons/icon-96.png',
        tag: s.tag || 'vitalplan-scheduled',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        renotify: true,
        actions: [
          { action: 'open', title: '🏋️ Öffnen' },
          { action: 'dismiss', title: 'Später' }
        ]
      });

      // If recurring, reschedule for tomorrow
      if (s.recurring && s.recurringTime) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const [h, m] = s.recurringTime.split(':').map(Number);
        tomorrow.setHours(h, m, 0, 0);
        s.scheduledTime = tomorrow.toISOString();
        remaining.push(s);
      }
    } else {
      remaining.push(s);
    }
  }

  await cache.put('schedules.json', new Response(JSON.stringify(remaining)));
}

async function checkAndSendReminders(payload) {
  if (!payload) return;
  const { title, body, tag } = payload;
  try {
    await self.registration.showNotification(title, {
      body: body,
      icon: './icons/icon-192.png',
      badge: './icons/icon-96.png',
      tag: tag || 'vitalplan-reminder',
      vibrate: [200, 100, 200],
      requireInteraction: false,
      renotify: true
    });
  } catch (e) {
    // Notification API not available
  }
}
