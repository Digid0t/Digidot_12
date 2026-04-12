# Digidot_12
nicht freigegeben! keine medizinische verwendung! Test tool!

# VitalPlan

**Evidenzbasierte Bewegungstherapie-App für ältere Erwachsene mit Parkinson und/oder Diabetes.**

VitalPlan ist eine Single-File Progressive Web App (PWA), die vollständig offline auf dem Gerät des Nutzers läuft. Sie wurde für Menschen ab 60 Jahren entwickelt, die trotz chronischer Erkrankungen sicher und strukturiert trainieren möchten -- mit besonderem Fokus auf Barrierefreiheit für blinde und sehbehinderte Nutzer.

---

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
  - [Onboarding](#onboarding)
  - [Sicherheits-Check vor dem Training](#sicherheits-check-vor-dem-training)
  - [Training](#training)
  - [Trainingslogik und Periodisierung](#trainingslogik-und-periodisierung)
  - [Übungsbibliothek](#übungsbibliothek)
  - [Benchmark-Tests](#benchmark-tests)
  - [Wohlbefinden-Tracking](#wohlbefinden-tracking)
  - [Ernährung](#ernährung)
  - [Tagebuch und Statistiken](#tagebuch-und-statistiken)
  - [Parkinson-spezifische Funktionen](#parkinson-spezifische-funktionen)
  - [Diabetes-spezifische Funktionen](#diabetes-spezifische-funktionen)
  - [Barrierefreiheit](#barrierefreiheit)
  - [Anleitung](#anleitung)
  - [Datenverwaltung](#datenverwaltung)
- [Technische Architektur](#technische-architektur)
- [Installation und Nutzung](#installation-und-nutzung)
- [Zitierte Forschung](#zitierte-forschung)
- [Disclaimer](#disclaimer)
- [Lizenz](#lizenz)

---

## Überblick

VitalPlan kombiniert Kraft-, Balance-, Haltungs- und Ausdauertraining in einem strukturierten Programm, das sich automatisch an die Fähigkeiten des Nutzers anpasst. Die App berücksichtigt dabei:

- **Parkinson-Stadium** (Hoehn-Yahr I--III) mit stadienspezifischen Übungsvarianten
- **Diabetes Typ 1 und Typ 2** mit Blutzucker-Sicherheitschecks und Hypo-Erinnerungen
- **Alter und Geschlecht** für normierte Vergleichswerte bei Benchmark-Tests
- **Verfügbare Ausrüstung** (Stuhl, Wand, Wasserflaschen, Stufe)

Alle Daten bleiben ausschließlich auf dem Gerät des Nutzers -- es gibt keinen Server, kein Cloud-Sync und keine Datenübertragung.

---

## Features

### Onboarding

Das Onboarding führt in 6 Schritten durch die Ersteinrichtung:

1. **Name** -- Nur zur lokalen Anzeige auf dem Gerät
2. **Geburtsjahr und Geschlecht** -- Für altersgerechte Vergleichswerte (Numpad-Eingabe oder Sprache)
3. **Diabetes-Typ** -- Kein Diabetes, Typ 2 oder Typ 1 (steuert Glukose-Abfragen)
4. **Parkinson-Stadium** -- Keins, Stadium I/II/III oder Unsicher (steuert Übungsvarianten)
5. **Ausrüstung** -- Stuhl, Wand, Gewichte, Stufe (Mindestens Stuhl oder Wand erforderlich)
6. **Wochenziel** -- 2--5 Einheiten pro Woche

Jeder Schritt wird bei aktivierter Sprachführung vollständig vorgelesen, einschließlich Erklärung, was zu tun ist und warum.

---

### Sicherheits-Check vor dem Training

Vor jeder Trainingseinheit durchläuft der Nutzer einen mehrstufigen Sicherheits-Check:

**Symptom-Screening:**
- Brustschmerz oder Engegefühl
- Neue oder starke Atemnot
- Starker Schwindel
- Fieber oder Krankheitsgefühl
- Sturz am selben Tag
- Starkes Freezing (Parkinson-spezifisch)

Bei Auswahl eines Symptoms wird das Training blockiert mit Handlungsempfehlung.

**Blutzucker-Messung (bei Diabetes):**
- Typ 2: Empfohlener Bereich 120--180 mg/dl
- Typ 1: Unter 90 mg/dl blockiert (erst Kohlenhydrate essen), über 250 mg/dl erfordert Keton-Messung
- Keton-Test bei Typ 1: Negativ / Spur / Moderat / Hoch -- ab Moderat kein Training

**Ausrüstungs-Checkliste:**
- Auflistung aller benötigten Hilfsmittel vor Trainingsbeginn

---

### Training

Eine Trainingseinheit besteht aus 6 Phasen:

| Phase | Inhalt | Ziel |
|-------|--------|------|
| Aufwärmen | Marschieren, Armkreise, Gewichtsverlagerung | Kreislauf aktivieren, Gelenke mobilisieren |
| Kraft | Aufstehen, Wadenheben, Kniebeugen | Muskelkraft aufbauen und erhalten |
| Haltung | Rudern, Wandliegestütz, Rotation | Haltung verbessern, Steifigkeit reduzieren |
| Gleichgewicht | Tandem-Stand, Seitgehen, Große Schritte | Gangsicherheit trainieren |
| Ausdauer | Lockeres Gehen (5--30 Min.) | Herz-Kreislauf stärken |
| Cool-down | Atemübung, Dehnung | Entspannung und Flexibilität |

**Während des Trainings:**
- Große, gut lesbare Anzeigen (Übungsname, Anleitung, Sicherheitshinweise)
- Timer mit Countdown-Ansagen (10, 5, 4, 3, 2, 1) und Halbzeit-Ansage
- Wiederholungszähler mit Numpad oder Spracheingabe
- Pause-Funktion mit Zeitanzeige
- Übung überspringen (mit Grund: Schmerz, Ausrüstung, Sonstiges)
- Vorlese-Button für detaillierte Übungsanleitung
- Coaching-Tipps während längerer Übungen

**Übungs-Feedback nach jeder Übung:**
- Emoji-Bewertung: Leicht / Passt / Zu schwer
- Zusammenfassung (Zeit oder Wiederholungen)
- Bei wiederholtem "Zu schwer" automatische Anpassung

**Trainingsabschluss (Post-Log):**
- RPE-Bewertung (1--10 Anstrengungsskala) mit Zielbereich 4--6
- Parkinson-Skalen: Freezing, Steifigkeit, Gleichgewicht (je 0--4)
- Erschöpfungsgrad (0--4)
- Blutzucker nach dem Training (bei Diabetes)
- Optionale Notizen
- Alles mit vollständiger Sprachführung

---

### Trainingslogik und Periodisierung

**Kalibrierungsphase (erste 2 Einheiten):**
- Ausgangswerte werden ermittelt (RPE, Glukose-Muster, Freezing-Level)
- Keine automatische Progression
- Ehrliche Bewertung ermöglicht optimale Anpassung

**Stabilitätsbewertung (wöchentlich):**
- Wochenziel an Einheiten erreicht?
- Durchschnittliche RPE unter 6,5?
- Keine Sicherheitsereignisse?
- 2 stabile Wochen in Folge = Progression möglich

**Eindimensionale Progression:**
Nach 2 stabilen Wochen wird genau EINE Variable gesteigert:
1. +1 Kraft-Satz (z.B. 2 auf 3 Sätze)
2. +10% Wiederholungsfaktor
3. +3 Minuten Gehzeit
4. +20% Balance-Dauer
5. +1 Einheit pro Woche (bis max. 5)

**Deload-Wochen:**
- Automatisch nach 4 aufeinanderfolgenden Progressionen
- Volumen auf 70% reduziert
- Biologisch notwendige Erholungsphase
- Danach erneuter Progressionszyklus

---

### Übungsbibliothek

26 Übungen in 6 Kategorien, jede mit:
- Ausführlicher Anleitung und Sicherheitshinweis
- Audio-Beschreibung für blinde Nutzer
- Stadienspezifischen Varianten (Parkinson I/II/III)
- Ausrüstungsanforderungen (Stuhl, Wand, Gewichte)
- Wissenschaftlicher Quellenangabe

**Beispiele:**
- **Vom Stuhl aufstehen** -- Kernübung für Beinkraft, 5 Wiederholungen x 2 Sätze
- **Halb-Tandem-Stand** -- Balance-Training, 20 Sek. x 2 Sätze, Wandsicherung
- **Große Schritte gehen** -- Gegenwirkt Parkinson-typisch verkürzte Schrittlänge
- **Lockeres Gehen** -- Ausdauer, 5--30 Min. je nach Progressionsstufe

Übungen rotieren wöchentlich aus einem Pool, um Abwechslung zu bieten. Kernübungen (Marschieren, Aufstehen, Gehen, Atmen) sind in jeder Einheit enthalten.

---

### Benchmark-Tests

Alle 4 Wochen werden 3 standardisierte Tests durchgeführt:

| Test | Messung | Klinische Bedeutung |
|------|---------|---------------------|
| **30-Sekunden-Stuhltest** | Wiederholungen in 30 Sek. | Beinkraft (Rikli & Jones Altersnorm) |
| **Timed Up and Go (TUG)** | Sekunden (Aufstehen, 3m gehen, zurück, setzen) | Sturzrisiko (>13,5 Sek. = erhöht) |
| **4-Meter-Gangtest** | Gehgeschwindigkeit in m/s | Funktionelle Mobilität (<0,8 m/s = kritisch) |

Ergebnisse werden über die Zeit verfolgt mit Trendanzeige und evidenzbasierter Interpretation.

---

### Wohlbefinden-Tracking

Tägliche Erfassung auf Emoji-Skalen (0--4):

| Dimension | 0 | 4 |
|-----------|---|---|
| **Stimmung** | Sehr schlecht | Sehr gut |
| **Schlafqualität** | Sehr schlecht | Sehr gut |
| **Schmerzen** | Keine | Sehr stark |
| **Stress** | Kein Stress | Sehr hoch |

Optional: Schlafstunden, Schmerzort, Medikation, Notizen.

---

### Ernährung

- **Mahlzeiten-Tracking:** Frühstück, Mittagessen, Abendessen, Snacks
- **Nährstoffe:** Kohlenhydrate, Protein, Fett, Kalorien pro Mahlzeit
- **Wasser-Tracker:** 250 ml pro Glas, tägliche Übersicht
- **Blutzucker vor Mahlzeit:** Optional (für Diabetiker)
- **Tagesübersicht:** Summe aller Nährstoffe und Wasseraufnahme
- **Numpad-Eingabe** für alle Zahlenfelder mit Sprachunterstützung

---

### Tagebuch und Statistiken

- **Zeitraumfilter:** Tag, Woche, Monat, Jahr
- **Statistiken:** Anzahl Einheiten, Gesamtminuten, Durchschnitts-RPE, Adhärenz in Prozent
- **Sitzungsliste:** Jede Einheit mit Details (Dauer, RPE, Glukose, Freezing, Phasen)
- **Diagramme:** RPE-Trend, Glukose-Verlauf, Freezing-Progression
- **Problemmarkierung:** Auffällige Sitzungen werden hervorgehoben
- **Motivationssprüche:** Evidenzbasierte Zitate zur Ermutigung

---

### Parkinson-spezifische Funktionen

- **Stadienspezifische Übungsvarianten** (Hoehn-Yahr I--III)
  - Stadium I: Standardprogramm
  - Stadium II: Wandsicherung bei Balance-Übungen
  - Stadium III: Sitzende oder unterstützte Varianten
- **Freezing-Erfassung** nach jedem Training (0--4 Skala)
- **Steifigkeits-Tracking** (0--4 Skala)
- **Gleichgewichts-Bewertung** (0--4 Skala)
- **Freezing-Trenddiagramm** über die Zeit
- **Große-Schritte-Training** gegen Parkinson-typische Schrittverkürzung
- **Freezing als Sicherheits-Warnsymptom** im Pre-Check

---

### Diabetes-spezifische Funktionen

**Typ-2-Diabetes:**
- Blutzucker-Messung vor und nach dem Training
- Empfohlener Trainingsbereich: 120--180 mg/dl
- Verlaufsanzeige im Tagebuch

**Typ-1-Diabetes:**
- Pflicht-Blutzuckermessung vor Training
- Unter 90 mg/dl: Training blockiert (erst Kohlenhydrate essen)
- Über 250 mg/dl: Keton-Messung erforderlich
- Keton-Stufen: Negativ / Spur / Moderat / Hoch
- Ab Moderat: Training blockiert
- **Verzögerte Hypoglykämie-Erinnerung:** Automatische Benachrichtigung 2 und 4 Stunden nach dem Training
- Traubenzucker-Erinnerung in Ausrüstungsliste

---

### Barrierefreiheit

VitalPlan wurde von Grund auf für blinde und sehbehinderte Nutzer entwickelt:

**Sprachführung:**
- Vollständige Sprachführung aktivierbar (jeder Bildschirm wird vorgelesen)
- Automatische Bildschirm-Beschreibung bei jedem Seitenwechsel
- Jede Aktion wird akustisch bestätigt (Auswahl, Eingabe, Navigation)
- Ziffern werden beim Tippen vorgelesen
- Übungsanleitungen mit Audio-Beschreibung
- Countdown-Ansagen (10, 5, 4, 3, 2, 1) und Halbzeit-Ansage
- Coaching-Tipps während Übungen
- FAB-Button (Lautsprecher) liest aktuelle Seite jederzeit vor

**Spracheingabe:**
- Alle Zahlenfelder per Sprache bedienbar (Deutsch)
- Automatische Zahlenerkennung
- Bestätigungs-Feedback

**Visuell:**
- Hoher Kontrast-Modus
- Große Schrift-Modus (bis 56px Überschriften)
- Farbunabhängige Warnungen (Icons + Farbe)
- Großer Numpad statt kleiner Zahleneingabefelder

**Haptik:**
- Vibrationspatterns für verschiedene Ereignisse
- Tastenton bei Buttonklicks

**Screenreader:**
- ARIA-Labels auf allen interaktiven Elementen
- ARIA-Live-Regionen für Ansagen
- Semantisches HTML
- Geführte Tour beim Erststart (4 Schritte, vorlesbar)

---

### Anleitung

10 integrierte Kapitel mit Vorlese-Funktion:

1. Was ist VitalPlan?
2. Sicheres Training -- Wann aufhören?
3. RPE verstehen -- Anstrengungsskala
4. Kalibrierung in den ersten 2 Einheiten
5. Wie Progression funktioniert
6. Benchmark-Tests korrekt durchführen
7. Parkinson-spezifische Hinweise
8. Diabetes-spezifische Hinweise
9. Barrierefreiheit nutzen
10. Evidenz-Überblick

---

### Datenverwaltung

- **Export:** Alle Daten als JSON-Datei sichern
- **Import:** JSON-Backup von anderem Gerät laden
- **Löschen:** Komplette Datenlöschung mit 2-stufiger Bestätigung
- **Offline:** Nach dem ersten Laden funktioniert die App ohne Internetverbindung
- **Privatsphäre:** Keine Datenübertragung, alles lokal auf dem Gerät

---

## Technische Architektur

| Aspekt | Detail |
|--------|--------|
| **Typ** | Single-File Progressive Web App (PWA) |
| **Dateien** | `vitalplan.html` (App), `sw.js` (Service Worker) |
| **Frameworks** | Keine -- reines HTML5/CSS3/JavaScript |
| **Datenspeicherung** | IndexedDB (VitalPlanDB v3) mit 5 Object Stores |
| **Offline** | Service Worker mit Cache-First-Strategie |
| **Sprache** | Web Speech API (Synthese + Erkennung) |
| **Audio** | Web Audio API (Signaltöne) |
| **Haptik** | Vibration API |
| **Bildschirm** | Screen Wake Lock API (bleibt an während Training) |
| **Rendering** | Eigenes reaktives DOM-System mit `h()`-Helper |
| **State** | Zentrales `STATE`-Objekt mit `render()` bei Änderungen |

**IndexedDB Object Stores:**
- `sessions` -- Abgeschlossene Trainingseinheiten
- `benchmarks` -- Benchmark-Testergebnisse
- `nutrition` -- Mahlzeiten und Nährstoffe
- `wellbeing` -- Tägliche Wohlbefinden-Einträge
- `kv` -- Schlüssel-Wert-Speicher (Profil, Plan, aktives Workout)

---

## Installation und Nutzung

### Im Browser (empfohlen)

1. `vitalplan.html` und `sw.js` in denselben Ordner legen
2. Einen lokalen Server starten, z.B.:
   ```bash
   npx serve -l 3456
   ```
3. Im Browser öffnen: `http://localhost:3456/vitalplan.html`
4. Die App installiert den Service Worker und ist danach offline verfügbar

### Als PWA auf dem Smartphone

1. Die URL im mobilen Browser öffnen
2. "Zum Startbildschirm hinzufügen" wählen
3. Die App verhält sich wie eine native Anwendung

### Direkt als Datei

1. `vitalplan.html` lokal speichern
2. Im Browser öffnen (Service Worker funktioniert nur über HTTP/HTTPS)
3. Grundfunktionen laufen auch ohne Service Worker

---

## Zitierte Forschung

Die Trainingsgestaltung und Sicherheitsgrenzen basieren auf peer-reviewed Forschung:

- **Mak et al. 2017** -- Exercise in Parkinson's disease (Nature Reviews Neurology, Meta-Analyse 20 RCTs)
- **Shu et al. 2014** -- Aerobic exercise for Parkinson's (PLOS ONE, Systematischer Review)
- **Colberg et al. 2016** -- Physical Activity & Diabetes (ADA Position Statement, Diabetes Care)
- **Riddell et al. 2017** -- Exercise management Type 1 Diabetes (Lancet Diabetes & Endocrinology)
- **Sherrington et al. 2019** -- Exercise for fall prevention (Cochrane Review)
- **Liu & Latham 2009** -- Progressive resistance training for older adults (Cochrane Database)
- **Rikli & Jones 2013** -- Senior Fitness Test Manual (altersgenormte Referenzwerte)
- **Podsiadlo & Richardson 1991** -- Timed Up and Go Test (J Am Geriatr Soc)
- **Guralnik et al. 1994** -- Short Physical Performance Battery (NEJM)

---

## Disclaimer

**VitalPlan ist kein Medizinprodukt und erhebt keinen medizinischen Anspruch.**

Diese Anwendung dient ausschließlich zu Informations- und Bildungszwecken. Sie ersetzt in keiner Weise:

- Die Diagnose, Beratung oder Behandlung durch einen Arzt, Physiotherapeuten oder andere medizinische Fachkraft
- Ärztlich verordnete Therapien oder Medikation
- Individuelle medizinische Beurteilungen

**Wichtige Hinweise:**

- Konsultieren Sie **vor Beginn eines Trainingsprogramms** Ihren behandelnden Arzt, insbesondere bei Parkinson, Diabetes oder anderen chronischen Erkrankungen.
- Die Sicherheits-Checks in der App ersetzen keine ärztliche Untersuchung. Sie sind lediglich als Orientierungshilfe gedacht.
- Blutzucker-Grenzwerte, Trainingsempfehlungen und Belastungsgrenzen in der App basieren auf allgemeiner Fachliteratur und müssen im Einzelfall von Ihrem Arzt überprüft und angepasst werden.
- Bei Brustschmerzen, Atemnot, starkem Schwindel oder anderen akuten Beschwerden brechen Sie das Training sofort ab und rufen Sie den Notruf (112).
- Die Entwickler übernehmen keine Haftung für gesundheitliche Schäden, die durch die Nutzung dieser Anwendung entstehen könnten.
- Die zitierten Studien belegen allgemeine Wirksamkeit von Bewegung bei den genannten Erkrankungen, stellen aber keine Garantie für individuelle Ergebnisse dar.

**Diese Software wird "as is" bereitgestellt, ohne jegliche Gewährleistung. Die Nutzung erfolgt auf eigene Verantwortung.**

---

## Lizenz

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

