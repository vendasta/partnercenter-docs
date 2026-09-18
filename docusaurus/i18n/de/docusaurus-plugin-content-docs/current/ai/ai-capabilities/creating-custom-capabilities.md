---
title: So erstellst du benutzerdefinierte Fähigkeiten
sidebar_label: Benutzerdefinierte Fähigkeiten erstellen
sidebar_position: 3
description: Schritt-für-Schritt-Anleitung zum Erstellen benutzerdefinierter KI-Fähigkeiten, die AI Employees über Tools und APIs mit externen Systemen verbinden.
tags: [ai-capabilities, custom-capabilities, ai-workforce, integrations]
keywords: [custom capabilities, AI capabilities, tools, integrations, API, AI Employees, prompts, testing]
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

Diese Anleitung führt dich durch das Erstellen benutzerdefinierter Fähigkeiten, die deine AI Employees mit externen Systemen und APIs verbinden. Benutzerdefinierte Fähigkeiten ermöglichen spezialisierte Geschäftsfunktionen wie Bestandsprüfungen, Terminbuchungen und Auftragsverfolgung.

## Voraussetzungen

Bevor du benutzerdefinierte Fähigkeiten erstellst, stelle sicher, dass du Folgendes hast:
- Zugriff auf die API-Dokumentation des externen Systems
- Gültige API-Anmeldedaten oder Authentifizierungstoken
- Ein klares Verständnis des Geschäftsprozesses, den du automatisieren möchtest
- Grundkenntnisse der API-Konzepte (URLs, Methoden, Parameter)

## Wann du benutzerdefinierte Fähigkeiten einsetzen solltest

Erstelle benutzerdefinierte Fähigkeiten, wenn deine AI Employees Folgendes benötigen:
- Echtzeit-Bestand und Produktdetails prüfen
- Termine oder Buchungen in externen Systemen planen
- Auftragsstatus von deiner E-Commerce-Plattform abrufen
- Individuelle Angebote oder Kostenvoranschläge erstellen
- Auf Kundenkontoinformationen zugreifen (Treuepunkte, Kaufhistorie)
- Interne Wissensdatenbanken oder FAQ-Systeme durchsuchen
- Tickets in Auftrags- oder Support-Systemen erstellen
- Wiederkehrende, für dein Unternehmen spezifische Workflows automatisieren

:::tip
Wenn eine Aktion über eine API ausgeführt werden kann, lässt sie sich wahrscheinlich in eine benutzerdefinierte Fähigkeit umwandeln.
:::

## Schritt für Schritt: eine benutzerdefinierte Fähigkeit erstellen

### Schritt 1: Zugriff auf die Einstellungen für benutzerdefinierte Fähigkeiten

1. Navigiere zu <AISparkleIcon /> `AI` → `Workforce` in deinem Business App-Dashboard.
2. Wähle den AI Employee aus, den du erweitern möchtest (dies kann ein vorgefertigter AI Employee wie Chat Receptionist oder Voice Receptionist sein, oder ein von dir erstellter Custom AI Employee).
3. Klicke auf `Configure`, um die `Configure`-Seite des AI Employee zu öffnen.
4. Öffne `Capabilities`, um alle verfügbaren Fähigkeiten anzuzeigen und zu verwalten.
5. Klicke auf `+ Add a capability`.
6. Wähle `+ New capability`, um eine eigene zu erstellen.

:::tip Benutzerdefinierte Fähigkeiten funktionieren bei allen AI Employees
Benutzerdefinierte Fähigkeiten können sowohl mit vorgefertigten AI Employees (Chat Receptionist, Voice Receptionist) als auch mit von dir erstellten Custom AI Employees verwendet werden. Das bedeutet, du kannst eine benutzerdefinierte Fähigkeit einmal erstellen und bei mehreren AI Employees einsetzen.
:::

### Custom AI Employees erstellen

Du kannst vollständig benutzerdefinierte AI Employees mit spezialisierten Fähigkeiten erstellen. Custom AI Employees nutzen dasselbe Framework wie vorgefertigte AI Employees und geben dir die vollständige Kontrolle über deren Konfiguration.

**Wann du Custom AI Employees erstellen solltest:**
- Du benötigst einen AI Employee, der auf eine bestimmte Geschäftsfunktion spezialisiert ist (z. B. Kostenvoranschlags-Ersteller, Projektmanager)
- Vorgefertigte AI Employees passen nicht genau zu deinem Anwendungsfall
- Du möchtest die vollständige Kontrolle über Gesprächsabläufe und Antworten
- Du benötigst branchenspezifisches Wissen und branchenspezifische Fähigkeiten

**Grundlegende Schritte:**
1. Klicke auf der `Workforce`-Seite auf `Create`
2. Richte das Grundprofil ein (Name, Avatar, Zweck)
3. Konfiguriere Kommunikationskanäle (Web-Chat, SMS, Telefon usw.)
4. Füge Wissensquellen hinzu (Website, Dokumente, benutzerdefinierter Text)
5. Füge sowohl integrierte als auch benutzerdefinierte Fähigkeiten hinzu
6. Teste deinen Custom AI Employee, bevor du ihn bereitstellst

**Vorteile von Custom AI Employees:**
- Spezialisiert auf bestimmte Geschäftsfunktionen
- Maßgeschneiderte Gesprächsabläufe und Antworten
- Branchenspezifisches Wissen und branchenspezifische Fähigkeiten
- Vollständige Kontrolle über Verhalten und Erscheinungsbild
- Kann über mehrere Kanäle bereitgestellt werden (Web-Chat, plattforminterner Chat, Automatisierungen)

**Benutzerdefinierte Fähigkeiten mit Custom AI Employees nutzen:**
Benutzerdefinierte Fähigkeiten funktionieren nahtlos mit Custom AI Employees. Du kannst:
- Benutzerdefinierte Fähigkeiten speziell für deinen Custom AI Employee erstellen
- Benutzerdefinierte Fähigkeiten über mehrere AI Employees hinweg wiederverwenden (sowohl vorgefertigte als auch benutzerdefinierte)
- Spezialisierte Workflows erstellen, die mehrere benutzerdefinierte Fähigkeiten kombinieren

Umfassende Anleitungen zum Erstellen von Custom AI Employees findest du im [Leitfaden für Custom AI Employees](../ai-workforce/custom-ai-employees.md).

### Schritt 2: Grundlegende Informationen zur Fähigkeit festlegen

1. **Namen der Fähigkeit eingeben**: Verwende einen klaren, aussagekräftigen Namen (z. B. `CheckInventory`, `BookAppointment`).
   - Vermeide Leerzeichen im Namen
   - Verwende aussagekräftige Namen, die den Zweck der Fähigkeit anzeigen
2. **Beschreibung hinzufügen**: Schreibe eine kurze Erklärung dessen, was diese Fähigkeit tut.
   - Beispiel: „Prüft die Produktverfügbarkeit im Echtzeit-Bestandssystem"

### Schritt 3: Den Prompt der Fähigkeit erstellen

1. Definiere im Feld **Prompt**, wann und wie die KI diese Fähigkeit nutzen soll.
2. Du kannst mit Platzhaltertext ("TBD") beginnen und ihn verfeinern, nachdem du die Tools eingerichtet hast.
3. Detaillierte Hinweise findest du unter [Effektive Prompts für Fähigkeiten schreiben](#effektive-prompts-für-fähigkeiten-schreiben).

:::tip
Betrachte den Prompt als Anweisungen für die Einarbeitung eines neuen Mitarbeiters. Sei konkret darüber, wann er diese Fähigkeit einsetzen soll und wie er mit verschiedenen Szenarien umgehen soll.
:::

### Schritt 4: Tools konfigurieren

1. Klicke auf `+ New tool`, um die technische Umsetzung festzulegen.
2. Wähle, wie du das Tool einrichten möchtest:
   - `Generate from cURL`: das Tool aus einem funktionierenden API-Aufruf erstellen
   - Manuelle Konfiguration: die Felder des API-Aufrufs selbst ausfüllen
3. Fülle die erforderlichen Tool-Felder aus (siehe [Referenz zur Tool-Konfiguration](#referenz-zur-tool-konfiguration)).
4. Füge mehrere Tools hinzu, wenn deine Fähigkeit mehrere API-Aufrufe erfordert.

:::tip Ausführlicher Leitfaden zum Erstellen von Tools
Umfassende Schritt-für-Schritt-Anleitungen zum Finden von API-Dokumentation, zur Nutzung des cURL-Imports, zur Arbeit mit KI-Assistenten und zum Testen von Tools findest du unter [Benutzerdefinierte Tools erstellen](./tools-overview/building-custom-tools).
:::

### Schritt 5: Testen und verfeinern

1. Klicke auf **Save**, um deine Fähigkeitskonfiguration zu speichern.
2. Teste die Fähigkeit, indem du mit deinem AI Employee chattest.
3. Probiere verschiedene Formulierungen aus, die die Fähigkeit auslösen sollten.
4. Beobachte die Antworten der KI und verfeinere den Prompt bei Bedarf.

### Schritt 6: Bereitstellen und überwachen

1. Sobald du mit den Tests zufrieden bist, aktiviere die Fähigkeit für Live-Interaktionen.
2. Überwache die Gesprächsprotokolle, um zu sehen, wie sich die Fähigkeit verhält.
3. Verfeinere Prompts und Tool-Konfigurationen basierend auf der tatsächlichen Nutzung.

## Referenz zur Tool-Konfiguration

#### Generate from cURL
cURL ist ein Tool, das Entwickler nutzen, um APIs durch Eingabe von Befehlen zu testen. Viele API-Dokumentationen zeigen Beispiel-cURL-Befehle. Das Einfügen eines funktionierenden cURL-Befehls hier füllt die Tool-Einrichtung automatisch aus, was Zeit spart und Fehler vermeidet.

#### Name
Dies ist ein eindeutiger Name für dein Tool innerhalb der Einrichtung deiner KI. Wähle etwas Einfaches und Aussagekräftiges, wie `CheckInventory` oder `BookAppointment`. Du kannst keine Leerzeichen verwenden.

#### Description
Schreibe einen kurzen, klaren Satz, der erklärt, was dieses Tool tut. Das hilft deinem AI Employee zu verstehen, was das Tool leistet, und hilft dir und deinem Team, sich später an seinen Zweck zu erinnern.
*Beispiel:* „Prüft, ob ein Produkt auf Lager ist."

#### Method & URL
- **Method:** Dies ist die Aktion, die deine KI die API ausführen lässt:
  - **GET** bedeutet „gib mir Informationen."
  - **POST** bedeutet „erstelle oder aktualisiere etwas."
  - **PUT/PATCH** bedeutet „ändere etwas."
  - **DELETE** bedeutet „entferne etwas."
- **URL:** Dies ist die Webadresse, die deine KI kontaktiert, um die Aktion auszuführen. Stell es dir wie die Telefonnummer vor, die die KI anruft.
*Beispiel:* `GET https://api.yourbusiness.com/products`

#### Parameters
Parameter sind zusätzliche Details, die deine KI sendet, damit die API genau weiß, was du möchtest. Sie kommen in verschiedenen Arten vor:
- **Query-Parameter:** Werden ans Ende einer URL angehängt, wie eine Frage. Beispiel: `?product_id=123` bedeutet „gib mir Informationen zu Produkt 123."
- **Pfad-Parameter:** Teil des URL-Pfads, wie eine Adresse. Beispiel: `/products/123` bedeutet „schau Produkt 123 nach."
- **Body-Parameter:** Werden innerhalb der Anfrage gesendet, meist um Informationen hinzuzufügen oder zu aktualisieren (wie Kundendaten).
Jeder Parameter hat einen Namen (wie `product_id`), eine Beschreibung (was er bedeutet), einen Ort (Query, Path oder Body) und eine Datenart (Text, Zahl usw.).

#### Headers
Headers sind zusätzliche Informationen, die mit der API-Anfrage gesendet werden, oft aus Sicherheitsgründen. Zum Beispiel:
- `Authorization: Bearer YOUR_API_KEY` (ermöglicht der KI den Zugriff auf die Daten)
- `Content-Type: application/json` (teilt der KI mit, welche Art von Daten gesendet wird)

#### No external processing needed
Aktiviere dieses Kästchen, wenn dein Tool tatsächlich keine externe API aufruft, sondern intern arbeitet — etwa beim Formatieren von Daten oder Text innerhalb der KI. Das spart unnötige Netzwerkaufrufe.

## Effektive Prompts für Fähigkeiten schreiben

Ein gut geschriebener Prompt für eine Fähigkeit besteht aus vier Schlüsselelementen. Betrachte es wie Einarbeitungsanweisungen für einen neuen Mitarbeiter:

### 1. Wann diese Fähigkeit genutzt werden soll
Lege die Auslösebedingungen klar fest:
```
ONLY call CheckCustomerOrderStatus when the user asks about their order status, 
tracking, or delivery. Do NOT use this for general product questions.
```

### 2. Welche Informationen zuerst benötigt werden
Liste die erforderlichen Informationen auf, bevor die KI handeln kann:
```
You MUST have the order_number before calling this tool.
If the customer doesn't provide it, ask: "Could you share your order number? 
You can find it in your confirmation email."
```

### 3. Wie die Antwort verwendet werden soll
Leite die KI an, wie sie Ergebnisse den Kunden präsentieren soll:
```
If successful: "I found your order! It's currently [status] and expected to 
arrive on [date]."

If the order is delayed: Apologize and provide the new estimated delivery date.
```

### 4. Wie mit Fehlern umgegangen werden soll
Erkläre, was zu tun ist, wenn etwas schiefgeht:
```
If the API returns no results: "I couldn't find an order with that number. 
Could you double-check it? Order numbers are typically 8-10 digits."

If the API fails: "I'm having trouble accessing order information right now. 
Would you like me to take your contact info so we can follow up?"
```

### Formatierungstipps für bessere Ergebnisse

Nutze Markdown-Formatierung, um deine Prompts sowohl für Menschen als auch für die KI klar verständlich zu machen:

- **Nutze Überschriften** (`#`, `##`), um verschiedene Abschnitte zu strukturieren
- **Nutze Aufzählungen**, um mehrere Punkte oder Schritte aufzulisten
- **Nutze Fettdruck**, um kritische Anweisungen oder Feldnamen hervorzuheben
- **Nutze Code-Formatierung** für konkrete Beispiele oder API-Feldnamen

**Beispiel mit guter Formatierung:**
```markdown
# Order Status Lookup

## When to Use
- ONLY when customer asks about order status or tracking
- NOT for product availability or general questions

## Required information
Before calling the tool, you MUST have:
- **order_number** (8-10 digit number)
- Ask if missing: "What's your order number?"

## Response format
- Success: "Your order #[number] is [status]."
- Not found: "I couldn't locate that order. Please verify the number."
```

Diese Struktur lässt sich leichter überfliegen und hilft der KI, genau zu verstehen, was zu tun ist.

## Benutzerdefinierte Fähigkeiten verwalten

- **Aktualisieren:** Gespeicherte Änderungen werden angewendet, sobald die KI die Fähigkeit im nächsten Chat wieder in Betracht zieht.
- **Deaktivieren:** Das Löschen von Tools wird noch nicht unterstützt; um ein Tool zu deaktivieren, entferne die Zuweisung vom AI Employee.

## Benutzerdefinierte Fähigkeiten testen und Fehler beheben

### Grundlegende Testschritte

1. Chatte mit deinem AI Employee und probiere verschiedene Formulierungen aus, um die Fähigkeit auszulösen.
2. Überprüfe, ob die KI erforderliche Informationen anfordert und das passende Tool aufruft.
3. Klicke unter *Conversations* auf **Explanation** unter einer Nachricht, um die Argumentation der KI und den rohen API-Aufruf einzusehen.
4. Wenn der API-Aufruf fehlschlägt, teste ihn separat mit Tools wie Postman, passe ihn bei Bedarf an und importiere den cURL-Befehl erneut.

### Fortgeschrittene Testtechniken

**Mit frischen Gesprächen testen**
- Nutze Inkognito-/Privatfenster für saubere Testsitzungen
- Oder lösche zwischen den Tests die Cookies, damit kein Kontext übertragen wird
- Das hilft zu überprüfen, ob deine Fähigkeit für neue Besucher konsistent funktioniert

**Mehrere Formulierungen testen**
- Probiere verschiedene Arten aus, wie Kunden dasselbe anfragen könnten
- Teste mit unvollständigen Anfragen, um zu sehen, wie die KI fehlende Informationen einholt
- Überprüfe, dass die Fähigkeit nicht auslöst, wenn sie es nicht sollte

**KI-Erklärungen systematisch überprüfen**
- Prüfe, ob die KI deine Fähigkeit in Betracht gezogen hat und warum sie sie genutzt hat oder nicht
- Untersuche die genauen API-Aufrufparameter, um die korrekte Datenzuordnung zu überprüfen
- Sieh dir die API-Antwort an und wie die KI sie interpretiert hat
- Vergleiche mehrere Gespräche, um Muster im Verhalten zu erkennen

### Best Practices für die Iteration

Folge bei der Verfeinerung benutzerdefinierter Fähigkeiten diesem systematischen Ansatz:

**Schritt 1: Einfach beginnen**
- Erstelle einen minimalen Prompt für die Fähigkeit mit nur den Grundlagen
- Teste, dass die Kernfunktionalität funktioniert
- Füge Komplexität schrittweise hinzu

**Schritt 2: Konkrete Probleme identifizieren**
- Dokumentiere genau, was schiefgelaufen ist (mit Beispielen)
- Notiere die Eingabe des Kunden und die Antwort der KI
- Überprüfe die Erklärung, um die Entscheidungsfindung der KI zu verstehen

**Schritt 3: Immer nur eine Änderung vornehmen**
- Passe nur einen Aspekt an (Prompt-Formulierung, Tool-Parameter oder Antwortvorlage)
- Speichere und teste sofort
- Wenn es nicht funktioniert, mache die Änderung rückgängig und versuche einen anderen Ansatz

**Schritt 4: Die Änderung testen**
- Verwende dieselbe Kundeneingabe, die zuvor fehlgeschlagen ist
- Überprüfe, ob das Problem behoben ist
- Teste Grenzfälle, um sicherzustellen, dass keine unbeabsichtigten Nebenwirkungen auftreten

**Schritt 5: Deine Änderungen dokumentieren**
- Notiere, was du geändert hast und warum
- Erfasse, welche Änderungen die Leistung verbessert haben
- Baue eine Referenz für zukünftige Fähigkeiten auf

:::tip Wann was angepasst werden sollte
- **Prompt-Probleme**: Die KI weiß nicht, wann sie die Fähigkeit nutzen oder wie sie mit Antworten umgehen soll
- **Probleme mit der Tool-Konfiguration**: API-Aufrufe schlagen fehl, falsche Parameter werden gesendet, oder die Authentifizierung schlägt fehl
- **Wissensprobleme**: Die KI benötigt Kontext, den sie nicht hat (zur Wissensdatenbank hinzufügen, nicht zur Fähigkeit)
- **Zweck-Probleme**: Das Gesamtverhalten der KI steht im Widerspruch zur Fähigkeit (Zweck des AI Employee anpassen)

Beginne mit der spezifischsten Korrektur (Tool-Konfiguration), bevor du breitere Elemente anpasst (Prompts oder Zweck).
:::

### Leistungsüberwachung

Überwache nach der Bereitstellung benutzerdefinierter Fähigkeiten deren Leistung:

**Erfolgsquoten verfolgen**
- Überprüfe Gespräche, in denen die Fähigkeit genutzt wurde
- Identifiziere häufige Fehlermuster
- Achte auf Szenarien, die du nicht getestet hast

**API-Leistung überwachen**
- Prüfe API-Antwortzeiten in den Erklärungen
- Achte auf API-Ratenbegrenzungen oder Timeout-Probleme
- Verfolge Fehlerraten und häufige Fehlerarten

**Indikatoren für die Kundenerfahrung**
- Notiere, wenn Kunden Frustration oder Verwirrung äußern
- Achte auf wiederholte Verständnisfragen
- Prüfe, ob Kunden ihre Ziele erreichen

**Optimierungssignale**
- Die KI fragt häufig nach denselben fehlenden Informationen (zum Prompt hinzufügen)
- Die Fähigkeit löst fälschlicherweise aus (Auslösebedingungen verfeinern)
- Kunden formulieren Anfragen mehrfach um (Klarheit des Prompts verbessern)
- API-Aufrufe schlagen häufig fehl (Tool-Konfiguration oder API-Stabilität prüfen)

## Beispiel für eine benutzerdefinierte Fähigkeit: Produktinformationsabfrage

### Beispiel für eine Tool-Konfiguration

| Feld       | Wert                                              |
|-------------|----------------------------------------------------|
| **ID**      | `LookupProductDetails`                              |
| **Description** | Ruft Details zu einem Produkt aus der Produktdatenbank ab |
| **Method**  | `GET`                                              |
| **URL**     | `https://api.yourdatabase.com/products`            |

### Parameter

- `product_id` (string, *query*) – die eindeutige Kennung des Produkts

### Headers

- `X-API-Key: YOUR_SECURE_API_KEY`

### Prompt-Ausschnitt (kommentiert)

```markdown
# Product Lookup Assistant

## When to use
- ONLY call `LookupProductDetails` when the user asks about a product's 
  price, description, or features.
- Do NOT call this unless the user has provided a specific product name **or** ID.
```
👉 **Warum das funktioniert:** Klare Grenzen verhindern, dass die KI das Tool unnötig aufruft, was API-Aufrufe spart und die Antwortgeschwindigkeit verbessert.

```markdown
## Information needed
- Before calling the tool, you MUST identify `product_id`.
- If the user only gives a name, ask for the ID.
```
👉 **Warum das funktioniert:** Explizite Anforderungen stellen sicher, dass die KI die nötigen Informationen einholt, bevor sie den API-Aufruf versucht.

```markdown
## Tool parameters
- Set `product_id` to the user-provided ID.
```
👉 **Warum das funktioniert:** Einfache, direkte Zuordnung zwischen Gesprächsdaten und API-Parametern.

```markdown
## How to respond
- If successful: "I found **[Product Name]**. The price is **$[Price]**. 
  Description: **[Description]**."
- If not found: Apologize and suggest the user double-check the ID or browse 
  products online.
```
👉 **Warum das funktioniert:** Exakte Antwortvorlagen (mit Fettdruck für Variablen) sorgen für eine konsistente, professionelle Kundenkommunikation.

#### Vorher/Nachher-Vergleich

**❌ Vager Prompt:**
```
Look up products when customers ask about them.
```
**Probleme:** Wann sollte nachgeschaut werden? Welche Informationen werden benötigt? Wie sollte geantwortet werden?

**✅ Detaillierter Prompt (oben):**
Klare Auslösebedingungen, erforderliche Informationen, Antwortvorlagen und Fehlerbehandlung.

### Beispielgespräch

**Kunde:** „Kannst du mir den Preis der blauen kabellosen Kopfhörer sagen?"
**KI:** „Klar! Damit ich sicher das richtige Produkt finde – meinst du die *BlueWave Wireless Headphones*?"
**Kunde:** „Ja, genau die."
*(Die KI ruft `LookupProductDetails` mit `product_id` passend zu BlueWave Wireless Headphones auf)*
**KI:** „Super! Die *BlueWave Wireless Headphones* kosten **89,99 $**. Sie bieten 20 Stunden Akkulaufzeit und kommen mit zwei Jahren Garantie."

### Variante: die Abfrage mit der aktuellen URL des Besuchers kombinieren

Wenn ein AI Employee auf **Web Chat** antwortet, erhält er bei jeder Nachricht die URL der Seite, auf der sich der Besucher gerade befindet. Du kannst diesen Kontext mit einer Abfragefähigkeit kombinieren, damit die KI vage Fragen ("ist das noch verfügbar?", "was kostet das?") beantworten kann, ohne nachfragen zu müssen, welches Produkt der Besucher meint.

Dieses Muster ist besonders leistungsstark für Unternehmen mit strukturierten URLs — E-Commerce-Produktseiten, Fahrzeugbestände, Immobilienanzeigen, Dienstleistungsseiten und so weiter.

**Prompt-Ausschnitt — die Abfragefähigkeit um URL-Auswertung erweitern:**

```markdown
## Using the Current Page URL
The product detail pages follow this URL pattern:
https://www.example.com/products/[slug]/[product_id]

The value at the end of the path is the `product_id`.

## When to use
- If the visitor's current URL matches the product detail pattern AND they ask a vague product question ("is this in stock", "how much", "any other colors"), parse the `product_id` from the URL and call `LookupProductDetails`.
- Confirm the product naturally in the first line of your reply so the visitor knows you understood.
- If the URL changes between turns, the visitor has navigated to a different product. Always use the URL from the most recent message.
- If the visitor explicitly names a different product than the one in the URL, follow what they said and ignore the URL.
- On non-product pages (homepage, /about, /contact), do not assume product context.
```

:::tip
Für die AI Chat Receptionist siehe [Antworten mit der URL des Besuchers seitenbewusst machen](../ai-workforce/ai-chat-receptionist/index.md#make-responses-page-aware-with-the-visitors-url) für den umfassenderen Funktionsüberblick.
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Neu dabei, wie AI Employees funktionieren? Nimm am Kurs <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> in Vendasta Learn teil — Einsteiger, 6 Lektionen.
  </span>
</div>
