---
title: So konfigurieren Sie KI-Fähigkeiten
sidebar_label: Fähigkeiten konfigurieren
sidebar_position: 2
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

Diese Anleitung führt Sie durch das Aktivieren und Konfigurieren integrierter Fähigkeiten für Ihre AI Employees. Folgen Sie diesen Schritten, um Fähigkeiten einzurichten, die gängige Geschäftsaufgaben wie Lead-Erfassung und Terminbuchung übernehmen.

## Voraussetzungen

Bevor Sie beginnen:
- Sie haben einen AI Employee in Ihrem Business-App-Konto erstellt
- Sie verfügen über die entsprechenden Berechtigungen, um KI-Einstellungen zu konfigurieren
- Sie wissen, welche Fähigkeiten zu Ihren Geschäftsanforderungen passen

## Schritt 1: Auf die AI Employee-Konfiguration zugreifen

1. Navigieren Sie zu <AISparkleIcon /> `AI` → `Workforce` in Ihrem Business-App-Dashboard.
2. Suchen Sie den AI Employee, den Sie konfigurieren möchten.
3. Klicken Sie auf die Schaltfläche **Configure** neben dem Namen des Mitarbeiters.

:::tip
Wenn Sie die Schaltfläche „Configure“ nicht sehen, überprüfen Sie, ob Sie über die nötigen Berechtigungen verfügen, um die Einstellungen des AI Employees zu ändern.
:::

## Schritt 2: Den Abschnitt „Capabilities“ öffnen

1. Scrollen Sie auf der `Configure`-Seite des AI Employees nach unten zum Abschnitt `Capabilities`.
2. Klicken Sie, um den Abschnitt zu erweitern, falls er eingeklappt ist.
3. Sie sehen eine Liste der Fähigkeiten, die dem AI Employee bereits hinzugefügt wurden.

## Schritt 3: Gewünschte Fähigkeiten hinzufügen

Fähigkeiten, die im Abschnitt „Capabilities“ erscheinen, sind aktiv. Um eine neue hinzuzufügen:

1. Klicken Sie auf **+ Add a capability**.
2. **Lesen Sie die Beschreibung der Fähigkeit**, um zu verstehen, was sie bewirkt.
3. **Fügen Sie spezifische Anweisungen hinzu** (optional), um das Verhalten der Fähigkeit anzupassen.

Um eine Fähigkeit zu entfernen, klicken Sie auf das Drei-Punkte-Menü daneben und wählen Sie **Remove**.

### Gängige Fähigkeitskonfigurationen

#### Lead Capture
- **Was es bewirkt**: Sammelt automatisch Kontaktinformationen von potenziellen Kunden
- **Empfohlene Anweisungen**: 
  ```
  Always ask for name, email, and phone number. 
  Qualify leads by asking about budget and timeline.
  Be friendly but persistent in gathering complete information.
  ```

#### Appointment Booking
- **Was es bewirkt**: Plant Termine über Ihren verbundenen Kalender
- **Voraussetzungen**: Stellen Sie sicher, dass Ihr Kalender in Ihren Business-App-Einstellungen verbunden ist
- **Empfohlene Anweisungen**:
  ```
  Check availability for the next 2 weeks.
  Confirm all details before booking: date, time, service type, duration.
  Send confirmation details to the customer.
  ```

#### Communication Style
- **Was es bewirkt**: Sorgt für einen konsistenten Ton und eine einheitliche Markenstimme
- **Empfohlene Anweisungen**:
  ```
  Use a professional but friendly tone.
  Always end responses with "How else can I help you today?"
  Refer to our company as "we" and "our team."
  ```

## Schritt 4: Ziele und Anweisungen hinzufügen (optional)

Für eine präzisere Steuerung des Verhaltens der Fähigkeit:

1. **Klicken Sie auf den Link „Add Instructions“** unter jeder aktivierten Fähigkeit.
2. **Schreiben Sie klare, spezifische Anweisungen**, die Folgendes definieren:
   - Wann die Fähigkeit zu verwenden ist
   - Welche Informationen gesammelt werden sollen
   - Wie in verschiedenen Szenarien zu reagieren ist
   - Was zu tun ist, wenn etwas schiefgeht

### Effektive Anweisungen schreiben

**Gutes Beispiel:**
```
Lead Capture: Only collect contact information after the customer shows interest in our services. Always ask for name, email, and phone. If they're hesitant to share information, explain that it helps us provide better service.
```

**Schlechtes Beispiel:**
```
Get contact info when needed.
```

:::tip Bewährte Verfahren für Anweisungen
- **Seien Sie spezifisch bei Auslösebedingungen** - Sagen Sie der KI genau, wann sie handeln soll
- **Fügen Sie Hinweise zur Fehlerbehandlung hinzu** - Was soll passieren, wenn etwas schiefgeht?
- **Verwenden Sie klare, umsetzbare Sprache** - Schreiben Sie, als würden Sie einen neuen Mitarbeiter schulen
- **Zeigen Sie Beispiele, nicht nur Regeln** - „Sagen Sie zum Beispiel: 'I'd be happy to help with that.'"
- **Fassen Sie sich kurz** - Kürzere, spezifische Anweisungen funktionieren oft besser als lange Absätze
- **Testen und iterieren** - Probieren Sie verschiedene Formulierungen aus und prüfen Sie, was bessere Ergebnisse liefert
:::

### Eine Fähigkeit auf bestimmte Kanäle zuschneiden

Ihr AI Employee weiß, auf welchem Kanal er antwortet, sodass die Anweisungen einer Fähigkeit den Kanal namentlich referenzieren können. Das ist nützlich, wenn sich eine Aufgabe je nachdem, wo der Kunde sich meldet, unterschiedlich verhalten soll, zum Beispiel weniger Details bei der Lead-Erfassung per SMS als per E-Mail zu erfassen:

```
When capturing a lead on SMS, ask for name and phone number only, one question at a time, and keep each message short.
When capturing a lead by email, you can ask for name, email, phone, and preferred appointment time in a single reply.
```

Hinweise zum kanalspezifischen Verhalten für den gesamten AI Employee finden Sie unter [Antworten nach Kanal anpassen](../ai-workforce/index.mdx#adjust-responses-by-channel).

#### Warum Beispiele wichtig sind

Beispiele in Ihren Anweisungen helfen Ihrer KI zu verstehen, was Sie genau möchten:

**Ohne Beispiele:**
```
Be friendly when greeting customers.
```

**Mit Beispielen:**
```
Be friendly when greeting customers. For example: "Hi there! Thanks for reaching out. How can I help you today?"
```

Die zweite Version gibt der KI ein konkretes Muster vor, dem sie folgen kann, was zu konsistenteren Ergebnissen führt.

### Bewährte Anweisungsmuster

Verwenden Sie diese bewährten Muster beim Schreiben von Anweisungen für Fähigkeiten:

#### Bedingte Logik: „Wenn X, dann Y"
```
If the customer asks about pricing: Share our standard rates and offer to send a detailed quote.
If they mention a competitor: Acknowledge their research and focus on our unique benefits.
```

#### Aufeinanderfolgende Schritte: „Zuerst... dann... schließlich..."
```
First, greet the customer warmly.
Then, ask what brings them to our site today.
Finally, based on their answer, offer relevant help or information.
```

#### Grenzen setzen: „Nur... wenn..." / „Niemals... außer..."
```
Only ask for contact information when the customer shows clear buying interest.
Never transfer calls unless the customer specifically requests to speak with someone else.
```

#### Fehlerbehandlung: „Falls... nicht..."
```
If you can't find the answer in the knowledge base, say: "I don't have that specific information, but I'd be happy to connect you with someone who does."
```

## Schritt 5: Konfiguration speichern und testen

1. Klicken Sie unten auf der `Configure`-Seite auf `Save Changes`.
2. **Testen Sie die Fähigkeiten**, indem Sie ein Gespräch mit Ihrem AI Employee starten.
3. **Probieren Sie verschiedene Szenarien aus**, um sicherzustellen, dass sich die Fähigkeiten korrekt aktivieren:
   - Stellen Sie Fragen, die den Zugriff auf die Wissensdatenbank auslösen sollten
   - Bekunden Sie Interesse an Dienstleistungen, um die Lead-Erfassung zu testen
   - Fordern Sie einen Termin an, um die Buchungsfunktion zu testen

### Test-Checkliste

- [ ] Fähigkeiten aktivieren sich zum passenden Zeitpunkt
- [ ] Erforderliche Informationen werden vor dem Fortfahren gesammelt
- [ ] Die KI befolgt Ihre benutzerdefinierten Anweisungen
- [ ] Fehlerszenarien werden souverän behandelt
- [ ] Die Kundenerfahrung wirkt natürlich und hilfreich

## Schritt 6: Überwachen und verfeinern

Nach der ersten Einrichtung:

1. **Überprüfen Sie Gesprächsprotokolle**, um zu sehen, wie sich die Fähigkeiten in realen Interaktionen bewähren.
2. **Sammeln Sie Kundenfeedback** zu deren Erfahrung.
3. **Passen Sie Anweisungen an**, basierend auf dem, was Sie lernen.
4. **Fügen Sie Fähigkeiten hinzu oder entfernen Sie sie**, wenn sich Ihre Geschäftsanforderungen weiterentwickeln.

## Fehlerbehebung bei häufigen Problemen

### Fähigkeit aktiviert sich nicht
- **Auslösebedingungen prüfen**: Stellen Sie sicher, dass Kundenanfragen den Parametern der Fähigkeit entsprechen
- **Anweisungen überprüfen**: Stellen Sie sicher, dass die Aktivierungskriterien klar sind
- **Mit verschiedenen Formulierungen testen**: Probieren Sie verschiedene Arten aus, wie Kunden Anfragen stellen könnten

### Informationen werden nicht gesammelt
- **Erforderliche Felder überprüfen**: Stellen Sie sicher, dass die Fähigkeit weiß, welche Informationen zu sammeln sind
- **Klarheit der Anweisungen prüfen**: Machen Sie die Sammelanforderungen explizit
- **Gesprächsablauf testen**: Gehen Sie den Prozess wie ein Kunde durch

### Fähigkeiten stehen in Konflikt
- **Prioritäten der Fähigkeiten überprüfen**: Manche Fähigkeiten können andere überschreiben
- **Anweisungen klären**: Machen Sie Auslösebedingungen spezifischer
- **Konfliktverursachende Fähigkeiten entfernen**: Entfernen Sie störende Fähigkeiten und fügen Sie sie erneut hinzu, sobald die Anweisungen verfeinert wurden

## Erweiterte Konfigurationstipps

### Schichtung von Fähigkeiten
Aktivieren Sie mehrere sich ergänzende Fähigkeiten, die zusammenarbeiten:
- Lead Capture + Appointment Booking für Dienstleistungsunternehmen
- Knowledge Base + Communication Style für Support-Szenarien
- Product Lookup + Lead Capture für Vertriebsinteraktionen

### Schrittweise Einführung
Beginnen Sie mit essenziellen Fähigkeiten und fügen Sie im Laufe der Zeit weitere hinzu:
1. **Woche 1**: Aktivieren Sie grundlegenden Communication Style und Knowledge Base
2. **Woche 2**: Fügen Sie Lead Capture hinzu, sobald die KI gut reagiert
3. **Woche 3**: Fügen Sie Appointment Booking hinzu, nachdem Sie den Lead-Ablauf getestet haben
4. **Woche 4+**: Fügen Sie benutzerdefinierte Fähigkeiten für spezialisierte Anforderungen hinzu

### Leistungsüberwachung
Verfolgen Sie wichtige Kennzahlen, um die Effektivität der Fähigkeiten zu messen:
- Aktivierungsrate (wie oft Fähigkeiten ausgelöst werden)
- Abschlussrate (erfolgreiche Informationssammlung)
- Kundenzufriedenheitswerte
- Konversionsraten bei der Lead-Erfassung

## Nächste Schritte

- **Benutzerdefinierte Fähigkeiten erstellen**: [Erfahren Sie, wie Sie benutzerdefinierte Fähigkeiten erstellen](./creating-custom-capabilities) für spezialisierte Geschäftsanforderungen
- **Erweitertes Prompting**: Entdecken Sie Prompt-Engineering-Techniken für eine bessere Leistung der Fähigkeiten
- **Integrationseinrichtung**: Verbinden Sie externe Systeme, um die Funktionalität der Fähigkeiten zu erweitern

Benötigen Sie Hilfe bei bestimmten Fähigkeitskonfigurationen? Sehen Sie sich unsere [Anleitung zur Fehlerbehebung](#fehlerbehebung-bei-häufigen-problemen) an oder kontaktieren Sie den Support für persönliche Unterstützung.

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Neu bei der Funktionsweise von AI Employees? Absolvieren Sie den Kurs <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>KI-Grundlagen</a> in Vendasta Learn – Einsteiger, 6 Lektionen.
  </span>
</div>
