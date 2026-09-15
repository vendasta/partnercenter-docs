---
title: Benutzerdefinierte Tools erstellen
sidebar_label: "Tutorial: Benutzerdefinierte Tools erstellen"
sidebar_position: 2
description: Schritt-für-Schritt-Anleitung zum Erstellen benutzerdefinierter Tools mithilfe der API-Dokumentation, einschließlich bewährter Verfahren und Tipps zur Fehlerbehebung
---

import { AISparkleIcon } from '@site/src/components/Icons';

Diese umfassende Anleitung führt Sie durch den gesamten Prozess der Erstellung benutzerdefinierter Tools für Ihre KI-Mitarbeiter. Sie erfahren, wie Sie API-Dokumentation finden, die cURL-Importfunktion verwenden, mit KI-Assistenten arbeiten und Ihre Tools effektiv testen.

:::info Bevor Sie beginnen
Wenn Sie neu bei KI-Mitarbeitern und Fähigkeiten sind, beginnen Sie mit der [KI-Übersicht](../../../ai/), um die übergeordneten Konzepte zu verstehen, bevor Sie sich in dieses Tutorial vertiefen.
:::

## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes haben:
- Zugang zur API-Dokumentation des externen Systems
- Gültige API-Anmeldedaten oder Authentifizierungs-Token
- Ein klares Verständnis des Geschäftsprozesses, den Sie automatisieren möchten
- Grundlegende Vertrautheit mit API-Konzepten (URLs, Methoden, Parameter)

## Überblick über den Prozess

Das Erstellen eines benutzerdefinierten Tools umfasst diese Schlüsselschritte:

1. **Vorbereitung**: Finden und Verstehen der API-Dokumentation
2. **Wichtige Prinzipien anwenden**: Bewährte Verfahren beim Erstellen von Tools befolgen
3. **Import mit cURL**: Die cURL-Importfunktion verwenden, um die Einrichtung zu beschleunigen
4. **Mit KI arbeiten**: KI-Assistenten nutzen, um die Tool-Details auszufüllen
5. **Testen**: Überprüfen, ob Ihr Tool korrekt funktioniert
6. **Fehlerbehebung**: Häufige Probleme lösen

Gehen wir jeden Schritt im Detail durch.

## Schritt 1: Vorbereitung – Finden und Verstehen der API-Dokumentation

Bevor Sie mit dem Erstellen Ihres Tools beginnen, müssen Sie die API-Dokumentation für den Dienst finden und verstehen, den Sie integrieren möchten.

### So finden Sie die API-Dokumentation

Die meisten Dienste stellen die API-Dokumentation an einem dieser Orte bereit:

- **Entwicklerportal**: Suchen Sie nach einem Bereich „Developer“ oder „API“ auf der Website des Dienstes
- **Dokumentationszentrum**: Viele Dienste haben eigene Dokumentationsseiten (z. B. `developers.service.com`)
- **API-Referenz**: Überprüfen Sie die Fußzeile oder Navigation der Hauptwebsite nach Links wie „API“ oder „Developers“
- **GitHub**: Manche Dienste hosten ihre API-Dokumentation auf GitHub-Repositorys

:::tip
Wenn Sie die API-Dokumentation nicht finden können, suchen Sie in Ihrer Suchmaschine nach „[Dienstname] API documentation“ oder „[Dienstname] developer docs“.
:::

### API-Dokumentation effektiv lesen

API-Dokumentation kann überwältigend sein, aber die Konzentration auf diese Schlüsselbereiche hilft:

**1. Authentifizierungsbereich**
- Wie man API-Schlüssel oder Token erhält
- Wo die Authentifizierung eingefügt wird (Header, Abfrageparameter usw.)
- Token-Ablauf und Erneuerungsprozesse

**2. Endpunkte/Ressourcen**
- Liste der verfügbaren API-Endpunkte
- HTTP-Methoden (GET, POST, PUT, DELETE) für jeden Endpunkt
- Basis-URL und Endpunktpfade

**3. Anfragebeispiele**
- Beispielanfragen mit den erforderlichen Parametern
- Beispiel-cURL-Befehle
- Formate des Anfragekörpers (JSON, XML usw.)

**4. Antwortbeispiele**
- Wie erfolgreiche Antworten aussehen
- Formate von Fehlerantworten
- Statuscodes und ihre Bedeutungen

### Die richtigen Endpunkte für Ihre Bedürfnisse identifizieren

Fragen Sie sich beim Durchsehen der API-Dokumentation:

- **Welche Aktion muss ich ausführen?** (Erstellen, Lesen, Aktualisieren, Löschen)
- **Welche Daten muss ich senden?** (Kundendaten, Bestelldetails usw.)
- **Welche Daten benötige ich zurück?** (Bestätigung, Status, Details usw.)

Ordnen Sie Ihre Bedürfnisse dem passenden Endpunkt zu:

| Ihr Bedarf | Suchen Sie nach |
|-----------|----------|
| Kundeninformationen nachschlagen | GET-Endpunkt mit Kunden-ID |
| Eine neue Bestellung erstellen | POST-Endpunkt für Bestellungen |
| Bestellstatus prüfen | GET-Endpunkt, der Bestelldetails zurückgibt |
| Termin aktualisieren | PUT/PATCH-Endpunkt für Termine |

### Authentifizierungsanforderungen verstehen

Die meisten APIs erfordern eine Authentifizierung. Übliche Methoden umfassen:

**API-Schlüssel-Authentifizierung**
- Wird üblicherweise als Header gesendet: `Authorization: Bearer YOUR_API_KEY`
- Oder als Abfrageparameter: `?api_key=YOUR_API_KEY`

**OAuth 2.0**
- Erfordert zunächst das Abrufen eines Zugriffstokens
- Das Token wird dann in Headern gesendet: `Authorization: Bearer ACCESS_TOKEN`

**Basisauthentifizierung**
- Benutzername und Passwort im Header codiert
- Format: `Authorization: Basic base64(username:password)`

**Beispiel für eine Authentifizierungseinrichtung:**
```bash
# API-Schlüssel im Header
curl -X GET "https://api.example.com/customers" \
  -H "Authorization: Bearer YOUR_API_KEY"

# API-Schlüssel im Abfrageparameter
curl -X GET "https://api.example.com/customers?api_key=YOUR_API_KEY"
```

:::warning
Bewahren Sie Ihre API-Schlüssel stets sicher auf. Teilen Sie sie niemals in Screenshots. Verwenden Sie Umgebungsvariablen oder eine sichere Speicherung von Anmeldedaten.
:::

### Tipps zur Navigation in gängigen API-Dokumentationsformaten

Verschiedene Dienste organisieren ihre Dokumentation unterschiedlich:

**REST-API-Dokumentation**
- Üblicherweise nach Ressource organisiert (Users, Orders, Products)
- Endpunkte unter jeder Ressource gruppiert
- Klare Trennung zwischen Anfrage- und Antwortformaten

**OpenAPI/Swagger-Dokumentation**
- Interaktive Dokumentation mit „Try it out“-Funktionen
- Enthält oft automatisch generierte cURL-Befehle
- Kann Beispiele direkt exportieren

**GraphQL-Dokumentation**
- Fokussiert sich auf Queries und Mutations
- Verwendet einen Schema-Explorer, um verfügbare Felder zu verstehen
- Andere Struktur als REST-APIs

## Schritt 2: Wichtige Prinzipien zum Erstellen von Tools

Die Befolgung dieser Prinzipien hilft Ihnen, zuverlässige, effektive Tools zu erstellen:

### KI-Assistenten zur Unterstützung nutzen

KI-Assistenten wie ChatGPT, Claude oder sogar der Vendasta-KI-Support können:

- **Komplexe API-Dokumentation verstehen**
  - Fragen Sie: „Erkläre diesen API-Endpunkt in einfachen Worten“
  - Klärung zu Authentifizierungsmethoden erhalten
  - Parameteranforderungen verstehen

- **Parameterbeschreibungen generieren**
  - Kontext zu Ihrem Anwendungsfall bereitstellen
  - Um spezifische, umsetzbare Beschreibungen bitten
  - Beispiele guter Parameterbeschreibungen erhalten

- **API-Beispiele in cURL umwandeln**
  - Beispiele aus der API-Dokumentation einfügen
  - Die KI bitten, sie in das cURL-Format umzuwandeln
  - Hilfe bei Authentifizierungs-Headern erhalten

**Beispiel-KI-Eingabeaufforderungen:**
```
„Ich erstelle ein Tool, um den Bestand zu prüfen. Der API-Endpunkt ist 
GET /api/v1/products/{productId}/inventory. Hilf mir, eine 
klare Beschreibung für den Parameter productId zu schreiben, die der KI 
mitteilt, wie sie ihn aus Kundennachrichten extrahieren soll.“
```

### Die cURL-Importfunktion in Vendasta verwenden

Die cURL-Importfunktion füllt automatisch aus:
- Die HTTP-Methode (GET, POST usw.)
- Die API-Endpunkt-URL
- Header (einschließlich Authentifizierung)
- Abfrageparameter
- Die Struktur des Anfragekörpers

Dies spart Zeit und reduziert Fehler. Wir behandeln dies im nächsten Abschnitt im Detail.

### Beschreibungen manuell überprüfen und schreiben (der wichtigste Teil)

Während der cURL-Import die technische Einrichtung übernimmt, sind **Parameterbeschreibungen entscheidend** dafür, dass die KI Ihr Tool korrekt verwendet.

**Was automatisch ausgefüllt wird:**
- Parameternamen
- Parametertypen (String, Number usw.)
- Parameterstandorte (Query, Body, Path)

**Was Sie manuell tun müssen:**
- Klare Beschreibungen für jeden Parameter schreiben
- Angeben, woher die KI den Wert beziehen soll (Benutzernachricht, Konversationskontext usw.)
- Validierungsregeln und Formatanforderungen hinzufügen
- Definieren, was zu tun ist, wenn Informationen fehlen

**Beispiel für eine gute Parameterbeschreibung:**
```
Parameter: order_number
Beschreibung: Die Bestellnummer aus der Nachricht des Kunden. 
Bestellnummern haben normalerweise 8-10 Ziffern und können Buchstaben enthalten. 
```

**Beispiel für eine Parameterbeschreibung, die verbessert werden könnte:**
```
Parameter: order_number
Beschreibung: Die Bestellnummer
```

Die erste Beschreibung sagt der KI genau, was der Parameter ist; die zweite bietet nicht genug Orientierung.

## Schritt 3: Die cURL-Importfunktion verwenden

Die cURL-Importfunktion ist eine der schnellsten Möglichkeiten, ein neues Tool einzurichten. Sie extrahiert automatisch die API-Konfiguration aus einem cURL-Befehl.

### Was ist ein cURL-Befehl?

cURL (Client URL) ist ein Kommandozeilen-Tool zum Erstellen von HTTP-Anfragen. Es wird häufig zum Testen von APIs verwendet und oft in der API-Dokumentation als Beispielcode bereitgestellt.

**Beispiel-cURL-Befehl:**
```bash
curl -X POST "https://api.example.com/orders" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "12345",
    "quantity": 2,
    "customer_email": "customer@example.com"
  }'
```

Dieser Befehl:
- Sendet eine POST-Anfrage an den Bestell-Endpunkt
- Enthält einen Autorisierungs-Header
- Sendet JSON-Daten im Anfragekörper

### So erhalten Sie mit KI ein cURL aus einer API-URL

Wenn die API-Dokumentation keine cURL-Beispiele bereitstellt, können Sie die KI bitten, eines zu generieren:

**Schritt 1:** Stellen Sie die Details der API-Dokumentation bereit:
```
„Ich benötige einen cURL-Befehl für diesen API-Endpunkt:
- Methode: POST
- URL: https://api.example.com/appointments
- Header: Authorization: Bearer TOKEN, Content-Type: application/json
- Body: { "date": "2024-01-15", "time": "14:00", "customer_id": "123" }“
```

**Schritt 2:** Die KI generiert einen cURL-Befehl:
```bash
curl -X POST "https://api.example.com/appointments" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15",
    "time": "14:00",
    "customer_id": "123"
  }'
```

**Schritt 3:** Kopieren Sie das generierte cURL und verwenden Sie es mit `Generate from cURL` in Vendasta.

### Schritt für Schritt: Ein Tool aus einem cURL in Vendasta generieren

**1. Auf die Tool-Konfiguration zugreifen**
   - Navigieren Sie zu <AISparkleIcon /> `AI` → `Workforce` in Ihrem Business-App-Dashboard
   - Wählen Sie den KI-Mitarbeiter aus, den Sie erweitern möchten
   - Klicken Sie auf `Configure` → `Capabilities`
   - Klicken Sie auf `+ Add a capability`
   - Wählen Sie `+ New capability`

**2. Ein Tool hinzufügen**
   - Klicken Sie in Ihrer Fähigkeit auf `+ New tool`
   - Wählen Sie `Generate from cURL`

**3. Ihren cURL-Befehl einfügen**
   - Kopieren Sie den cURL-Befehl aus der API-Dokumentation oder dem KI-generierten Beispiel
   - Fügen Sie ihn in das Feld `Generate from cURL` ein
   - Ersetzen Sie Platzhalterwerte (wie `YOUR_API_KEY`) durch tatsächliche Werte oder Variablen

**4. Automatisch ausgefüllte Felder überprüfen**
   - Das System extrahiert automatisch:
     - HTTP-Methode (GET, POST usw.)
     - URL/Endpunkt
     - Header
     - Abfrageparameter
     - Body-Parameter und -Struktur

**5. Manuelle Konfiguration abschließen**
   - Füllen Sie das Feld `Name` aus (eindeutiger Name, keine Leerzeichen)
   - Schreiben Sie eine klare `Description`, wann dieses Tool zu verwenden ist
   - Überprüfen und verbessern Sie die Parameterbeschreibungen (kritischer Schritt!)

### Was automatisch ausgefüllt wird und was manuelle Arbeit erfordert

**Automatisch ausgefüllt (aus dem cURL-Import):**
- ✅ HTTP-Methode
- ✅ URL/Endpunkt
- ✅ Header (einschließlich Authentifizierung, falls enthalten)
- ✅ Parameternamen
- ✅ Parametertypen (String, Number, Object usw.)
- ✅ Parameterstandorte (Query, Body, Path)

**Erfordert manuelle Arbeit:**
- ⚠️ **Tool-Name**: Wählen Sie einen beschreibenden Namen (keine Leerzeichen)
- ⚠️ **Tool-Beschreibung**: Erklären Sie, wann die KI dieses Tool verwenden soll
- ⚠️ **Parameterbeschreibungen**: Kritisch! Teilen Sie der KI mit, wie jeder Parameter auszufüllen ist
- ⚠️ **Erforderliche Felder**: Markieren Sie Parameter als erforderlich, wenn die API sie benötigt
- ⚠️ **Feste Werte**: Legen Sie statische Werte für Parameter fest, die sich nicht ändern
- ⚠️ **Enum-Werte**: Definieren Sie die zulässigen Optionen für Parameter vom Typ Enum

**Beispiel dessen, was manuelle Arbeit erfordert:**
```
Automatisch ausgefüllter Parameter:
- Name: product_id
- Typ: String
- Standort: Query

Erforderliche manuelle Verbesserung:
- Beschreibung: „Extrahiere die Produkt-ID aus der Nachricht des Kunden. 
  Produkt-IDs sind normalerweise 5-6-stellige Zahlen. Wenn der Kunde stattdessen 
  einen Produktnamen erwähnt, bitte um Klärung oder suche die Produkt-ID 
  in deiner Wissensdatenbank.“
- Erforderlich: ✓ (Kästchen ankreuzen)
```

### Häufige Probleme und deren Lösung

**Problem: Der cURL-Import schlägt fehl oder zeigt Fehler an**

**Lösungen:**
- Überprüfen Sie, ob der cURL-Befehl vollständig und korrekt formatiert ist
- Prüfen Sie, ob alle Anführungszeichen korrekt geschlossen sind
- Stellen Sie sicher, dass Escape-Zeichen korrekt sind (`\'` für einfache Anführungszeichen in JSON)
- Versuchen Sie, ein neues cURL mit KI oder API-Testtools zu generieren

**Problem: Header werden nicht korrekt importiert**

**Lösungen:**
- Fügen Sie fehlende Header nach dem Import manuell hinzu
- Überprüfen Sie, ob das Header-Format den API-Anforderungen entspricht
- Prüfen Sie auf Tippfehler in Header-Namen

**Problem: Body-Parameter sind nicht korrekt strukturiert**

**Lösungen:**
- Überprüfen Sie die JSON-Struktur im cURL-Befehl
- Passen Sie verschachtelte Objekte oder Arrays bei Bedarf manuell an
- Überprüfen Sie, ob die Parametertypen den API-Erwartungen entsprechen

## Schritt 4: Mit KI arbeiten, um Tools auszufüllen

KI-Assistenten können die Tool-Erstellung erheblich beschleunigen, indem sie Ihnen helfen, effektive Parameterbeschreibungen zu schreiben und komplexe API-Anforderungen zu verstehen.

### Screenshots als Kontext für die KI verwenden

Screenshots sind nützliche Hilfsmittel, um KI-Unterstützung zu erhalten:

**1. Screenshots der API-Dokumentation erfassen**
   - Machen Sie Screenshots der Endpunkt-Dokumentation
   - Fügen Sie Parametertabellen und Beispiele ein
   - Erfassen Sie Anweisungen zur Authentifizierungseinrichtung

**2. Der KI Kontext bereitstellen**
   - Laden Sie Screenshots zusammen mit Ihren Fragen hoch
   - Erklären Sie, was Sie erstellen möchten
   - Stellen Sie spezifische Fragen zur Dokumentation

**Beispiel-Eingabeaufforderung mit Screenshot:**
```
„Ich erstelle ein Tool zur Bestandsprüfung. Hier ist die API-Dokumentation 
für den Endpunkt. Hilf mir, Parameterbeschreibungen zu schreiben, die der 
KI mitteilen, wie sie Produkt-IDs aus Kundennachrichten extrahiert und Fälle 
behandelt, in denen das Produkt nicht gefunden wird.“
[Screenshot der API-Dokumentation anhängen]
```

### Die KI bitten, beim Schreiben von Parameterbeschreibungen zu helfen

Gute Parameterbeschreibungen sind entscheidend dafür, dass die KI Ihr Tool korrekt verwendet. Die KI kann Ihnen helfen, effektive Beschreibungen zu schreiben.

**Kontext bereitstellen:**
- Was der Parameter darstellt
- Woher der Wert stammt (Benutzernachricht, Konversationskontext)
- Formatanforderungen (z. B. „8-10-stellige Zahl“)
- Was zu tun ist, wenn der Wert fehlt

**Beispiel-Eingabeaufforderung:**
```
„Hilf mir, eine Parameterbeschreibung für 'appointment_date' zu schreiben. 
Die KI muss Daten aus Kundennachrichten wie 'nächsten Dienstag' 
oder '15. Januar' extrahieren. Wenn der Kunde kein Datum angibt, sollte die KI 
um Klärung bitten. Daten sollten als JJJJ-MM-TT formatiert werden.“
```

**KI-generierte Beschreibung:**
```
Extrahiere das gewünschte Termindatum aus der Nachricht des Kunden. Das Datum kann in 
verschiedenen Formaten angegeben werden (z. B. „nächsten Dienstag“, „15. Januar“, „2024-01-15“). 
Wandle relative Daten (wie „nächsten Dienstag“) in konkrete Daten um. Wenn der Kunde 
kein Datum angibt, frage: „Welches Datum würde Ihnen am besten passen?“ Formatiere das 
endgültige Datum als JJJJ-MM-TT, bevor es an die API gesendet wird.
```

### Iterative Verfeinerung von Beschreibungen

Erwarten Sie beim ersten Versuch keine perfekten Beschreibungen. Verfeinern Sie sie basierend auf:

**1. Testergebnissen**
   - Überprüfen Sie, wie die KI das Tool in Konversationen verwendet
   - Prüfen Sie die Explanation-Funktion, um Parameterwerte zu sehen
   - Identifizieren Sie, wo Beschreibungen mehr Klarheit benötigen

**2. Randfällen**
   - Bitten Sie die KI, Randfälle vorzuschlagen, die Sie möglicherweise übersehen haben
   - Aktualisieren Sie Beschreibungen, um ungewöhnliche Szenarien zu behandeln
   - Fügen Sie Ausweichanweisungen für fehlende Informationen hinzu

**3. Nutzung in der Praxis**
   - Überwachen Sie tatsächliche Kundengespräche
   - Beachten Sie, wenn das Tool nicht korrekt ausgelöst wird
   - Verfeinern Sie Beschreibungen basierend auf häufigen Missverständnissen

**Beispiel für einen Verfeinerungsprozess:**
```
Ursprüngliche Beschreibung:
„Hole die E-Mail-Adresse des Kunden.“

Nach dem Testen, verfeinerte Beschreibung:
„Extrahiere die E-Mail-Adresse des Kunden aus seiner Nachricht. E-Mail-Adressen 
müssen ein gültiges Format haben (benutzer@domain.com). Wenn der Kunde keine 
E-Mail angibt, frage: 'Könnten Sie uns Ihre E-Mail-Adresse mitteilen, damit wir Ihnen eine 
Bestätigung senden können?'“
```

### Sicherstellen, dass die KI spezifische Variablenoptionen einbezieht (keine generische Anleitung)

KI-Assistenten geben manchmal generische Ratschläge. Bestehen Sie auf spezifische, umsetzbare Beschreibungen.

**Generisch (nicht hilfreich):**
```
„Hole die Produkt-ID vom Benutzer.“
```

**Spezifisch (hilfreich):**
```
„Extrahiere die Produkt-ID aus der Nachricht des Kunden. Produkt-IDs sind 5-6-stellige 
Zahlen, die mit 'PRD' beginnen. Wenn der Kunde einen Produktnamen erwähnt 
(z. B. 'Blaues Widget'), frage zuerst: 'An welchem Produkt sind Sie interessiert?' 
und biete Optionen an, oder suche die Produkt-ID in deiner Wissensdatenbank. 
Rate niemals Produkt-IDs.“
```

**Tipps, um spezifische Beschreibungen zu erhalten:**
- Stellen Sie Beispiele für Kundennachrichten bereit
- Geben Sie genaue Formate und Validierungsregeln an
- Fügen Sie Anweisungen für fehlende Informationen hinzu
- Erwähnen Sie Randfälle und wie sie zu behandeln sind

### Bewährte Verfahren für die KI-gestützte Tool-Erstellung

**1. Mit klarem Kontext beginnen**
   - Erklären Sie Ihren Geschäftsanwendungsfall
   - Stellen Sie relevante API-Dokumentation bereit
   - Teilen Sie Beispiele für Kundeninteraktionen

**2. Spezifische Fragen stellen**
   - „Wie soll die KI die Bestellnummer extrahieren?“
   - „Was soll die KI tun, wenn das Datum fehlt?“
   - „Welches Format sollen Telefonnummern verwenden?“

**3. KI-Vorschläge überprüfen und anpassen**
   - Verwenden Sie KI-generierte Beschreibungen nicht wörtlich
   - Passen Sie sie an Ihre spezifischen Bedürfnisse an
   - Fügen Sie geschäftsspezifischen Kontext hinzu

**4. Testen und iterieren**
   - Verwenden Sie KI-Vorschläge als Ausgangspunkte
   - Testen Sie mit echten Konversationen
   - Verfeinern Sie basierend auf den Ergebnissen

## Schritt 5: Ihre Tools testen

Gründliches Testen stellt sicher, dass Ihre Tools korrekt funktionieren und eine gute Kundenerfahrung bieten.

### So testen Sie Tools in Konversationen

**1. Eine Testkonversation starten**
   - Navigieren Sie zur Chat-Oberfläche Ihres KI-Mitarbeiters
   - Verwenden Sie eine neue Browsersitzung (Inkognitomodus), um Kontextübertragung zu vermeiden
   - Probieren Sie verschiedene Formulierungen aus, die Ihr Tool auslösen sollten

**2. Verschiedene Szenarien testen**
   - **Idealfall**: Der Kunde gibt alle erforderlichen Informationen an
   - **Fehlende Informationen**: Der Kunde gibt die erforderlichen Parameter nicht an
   - **Falsches Format**: Der Kunde gibt Informationen in einem unerwarteten Format an
   - **Randfälle**: Ungewöhnliche Anfragen oder Fehlerbedingungen

**Beispiel-Testszenarien:**
```
Test 1: „Prüfe den Status von Bestellung 12345“
Erwartet: Tool wird ausgelöst, ruft den Bestellstatus ab

Test 2: „Was ist der Status meiner Bestellung?“
Erwartet: Die KI fragt vor der Verwendung des Tools nach der Bestellnummer

Test 3: „Prüfe Bestellung abc123xyz“
Erwartet: Die KI behandelt ein ungültiges Bestellnummernformat elegant
```

### Korrekte Parameterbefüllung überprüfen

**1. Die Explanation-Funktion verwenden**
   - Klicken Sie in Conversations unter einer Nachricht auf `Explanation`
   - Überprüfen Sie die Argumentation der KI für die Tool-Verwendung
   - Prüfen Sie die tatsächlich an die API gesendeten Parameterwerte

**2. Parameterwerte überprüfen**
   - Überprüfen Sie, ob Parameter korrekt aus Kundennachrichten extrahiert werden
   - Stellen Sie sicher, dass Datentypen den API-Anforderungen entsprechen
   - Überprüfen Sie, ob erforderliche Parameter vorhanden sind

**3. Mit API-Erwartungen vergleichen**
   - Überprüfen Sie die tatsächlichen Parameter des API-Aufrufs
   - Vergleichen Sie mit den Anforderungen der API-Dokumentation
   - Stellen Sie sicher, dass Header und Authentifizierung korrekt sind

### Häufige Probleme debuggen

**Problem: Tool wird nicht ausgelöst**

**Debugging-Schritte:**
1. Überprüfen Sie die Tool-Beschreibung – ist sie spezifisch genug?
2. Überprüfen Sie, ob die Fähigkeit für Ihren KI-Mitarbeiter aktiviert ist
3. Überprüfen Sie die Explanation, um zu sehen, ob die KI das Tool in Betracht gezogen hat
4. Testen Sie mit verschiedenen Formulierungen

**Problem: Falsche Parameterwerte**

**Debugging-Schritte:**
1. Überprüfen Sie Parameterbeschreibungen auf Klarheit
2. Prüfen Sie die Explanation, um zu sehen, wie die KI Werte extrahiert hat
3. Testen Sie mit bekannten Werten, um das Problem zu isolieren
4. Verfeinern Sie Parameterbeschreibungen basierend auf den Ergebnissen

**Problem: API-Aufruf schlägt fehl**

**Debugging-Schritte:**
1. Überprüfen Sie die Explanation, um den genauen API-Aufruf zu sehen
2. Testen Sie den API-Aufruf unabhängig (Postman, cURL)
3. Überprüfen Sie, ob Authentifizierungs-Header korrekt sind
4. Prüfen Sie auf API-Ratenlimits oder -Fehler

### Iteration und Verbesserung

**1. Probleme dokumentieren**
   - Notieren Sie, was nicht funktioniert
   - Erfassen Sie Kundennachrichten, die Probleme verursachen
   - Notieren Sie API-Fehler und deren Ursachen

**2. Inkrementelle Änderungen vornehmen**
   - Ändern Sie jeweils nur eine Sache
   - Testen Sie jede Änderung, bevor Sie eine weitere vornehmen
   - Machen Sie Änderungen rückgängig, die nicht helfen

**3. Tatsächliche Nutzung überwachen**
   - Überprüfen Sie Konversationen, in denen das Tool verwendet wurde
   - Suchen Sie nach Mustern bei Fehlschlägen
   - Identifizieren Sie häufige Missverständnisse

**4. Kontinuierliche Verfeinerung**
   - Aktualisieren Sie Parameterbeschreibungen basierend auf tatsächlicher Nutzung
   - Passen Sie Tool-Beschreibungen an, um die Auslösung zu verbessern
   - Verfeinern Sie die Fehlerbehandlung basierend auf Kundenfeedback

## Schritt 6: Fehlerbehebung

Auch bei sorgfältiger Planung können Probleme auftreten. So lösen Sie häufige Probleme.

### Häufige Probleme und Lösungen

#### Tool wird nie ausgelöst

**Symptome:**
- Die KI verwendet das Tool nicht, wenn sie sollte
- Kundenanfragen bleiben unbearbeitet

**Mögliche Ursachen und Lösungen:**

**1. Beschreibung zu vage**
   - **Lösung:** Machen Sie die Tool-Beschreibung spezifischer, wann sie zu verwenden ist
   - **Beispiel:** Statt „Bestellungen prüfen“ verwenden Sie „VERWENDE DIESES TOOL NUR, wenn der Kunde nach Bestellstatus, Sendungsverfolgung oder Lieferbestätigung fragt“

**2. Fähigkeit nicht aktiviert**
   - **Lösung:** Überprüfen Sie, ob die Fähigkeit Ihrem KI-Mitarbeiter zugewiesen ist
   - Prüfen Sie: Tab `Workforce` → `Configure` → `Capabilities`

**3. Widersprüchliche Fähigkeiten**
   - **Lösung:** Überprüfen Sie andere Fähigkeiten, die dieselbe Anfrage bearbeiten könnten
   - Verfeinern Sie die Auslösebedingungen, um spezifischer zu sein

**4. Fehlender Kontext**
   - **Lösung:** Stellen Sie sicher, dass erforderliche Informationen in der Konversation verfügbar sind
   - Überprüfen Sie, ob die KI Zugriff auf die notwendigen Daten hat

#### API-Authentifizierung schlägt fehl

**Symptome:**
- Die API gibt 401 (Unauthorized) oder 403 (Forbidden) Fehler zurück
- Tool-Aufrufe schlagen mit Authentifizierungsfehlern fehl

**Mögliche Ursachen und Lösungen:**

**1. Ungültiger API-Schlüssel**
   - **Lösung:** Überprüfen Sie, ob Ihr API-Schlüssel korrekt und aktiv ist
   - Prüfen Sie, ob der Schlüssel abgelaufen oder widerrufen wurde
   - Generieren Sie bei Bedarf einen neuen Schlüssel

**2. Falsches Header-Format**
   - **Lösung:** Überprüfen Sie, ob das Format des Authentifizierungs-Headers den API-Anforderungen entspricht
   - Übliche Formate:
     - `Authorization: Bearer YOUR_TOKEN`
     - `Authorization: Basic base64(username:password)`
     - `X-API-Key: YOUR_API_KEY`

**3. Fehlende Authentifizierung**
   - **Lösung:** Stellen Sie sicher, dass Authentifizierungs-Header in der Tool-Konfiguration enthalten sind
   - Überprüfen Sie, ob Header als feste Werte und nicht dynamisch festgelegt sind

**4. API-Schlüssel am falschen Ort**
   - **Lösung:** Überprüfen Sie, ob die API den Schlüssel erwartet in:
     - Headern (am häufigsten)
     - Abfrageparametern (`?api_key=...`)
     - Anfragekörper

#### Probleme bei der Parameterzuordnung

**Symptome:**
- Falsche Werte an die API gesendet
- Fehlende oder falsche Parameter
- API gibt Fehler zu ungültigen Parametern zurück

**Mögliche Ursachen und Lösungen:**

**1. Unklare Parameterbeschreibungen**
   - **Lösung:** Schreiben Sie spezifischere Beschreibungen
   - Fügen Sie Formatanforderungen und Beispiele hinzu
   - Geben Sie an, woher der Wert bezogen werden soll

**2. Parametertyp-Diskrepanz**
   - **Lösung:** Überprüfen Sie, ob Parametertypen den API-Anforderungen entsprechen
   - Prüfen Sie, ob die API String vs. Number erwartet
   - Stellen Sie sicher, dass Arrays/Objekte korrekt strukturiert sind

**3. Fehlende erforderliche Parameter**
   - **Lösung:** Markieren Sie erforderliche Parameter in der Tool-Konfiguration
   - Aktualisieren Sie Beschreibungen, um sicherzustellen, dass die KI erforderliche Informationen sammelt
   - Fügen Sie Validierung in Parameterbeschreibungen hinzu

**4. Falscher Parameterstandort**
   - **Lösung:** Überprüfen Sie, ob Parameter am richtigen Ort sind:
     - Abfrageparameter für GET-Anfragen
     - Body-Parameter für POST-/PUT-Anfragen
     - Pfadparameter in der URL

#### Tool wird fälschlicherweise ausgelöst

**Symptome:**
- Tool aktiviert sich, wenn es nicht sollte
- Fehlalarme in Kundengesprächen

**Mögliche Ursachen und Lösungen:**

**1. Beschreibung zu weit gefasst**
   - **Lösung:** Fügen Sie spezifischere Auslösebedingungen hinzu
   - Verwenden Sie „NUR“ und „NICHT“, um Grenzen zu setzen
   - **Beispiel:** „NUR verwenden, wenn der Kunde nach dem Bestellstatus fragt. NICHT für Produktfragen oder allgemeine Anfragen verwenden.“

**2. Überlappende Fähigkeiten**
   - **Lösung:** Überprüfen und verfeinern Sie die Fähigkeitsbeschreibungen
   - Machen Sie die Auslösebedingungen deutlicher
   - Priorisieren Sie, welche Fähigkeit bestimmte Anfragen bearbeiten soll

### Hilfe und Ressourcen erhalten

**1. Dokumentation überprüfen**
   - Sehen Sie sich diese Anleitung und verwandte Dokumentation an
   - Überprüfen Sie die API-Dokumentation des Dienstes, den Sie integrieren
   - Konsultieren Sie [Tools-Übersicht](./index.md) für ein konzeptionelles Verständnis

**2. KI-Assistenten verwenden**
   - Bitten Sie die KI, bei der Fehlerbehebung spezifischer Probleme zu helfen
   - Teilen Sie Fehlermeldungen und API-Antworten
   - Erhalten Sie Vorschläge für Parameterbeschreibungen

**3. Unabhängig testen**
   - Verwenden Sie Postman oder Insomnia, um API-Aufrufe direkt zu testen
   - Überprüfen Sie, ob die API außerhalb von Vendasta funktioniert
   - Isolieren Sie, ob die Probleme beim Tool oder bei der API liegen

**4. Explanation-Funktion überprüfen**
   - Überprüfen Sie die Argumentation der KI für die Tool-Nutzung
   - Untersuchen Sie tatsächliche API-Aufrufe und -Antworten
   - Identifizieren Sie Muster bei Fehlschlägen

**5. Community-Ressourcen**
   - Stack Overflow für API-spezifische Fragen
   - Dienstspezifische Entwicklerforen
   - Vendasta-Support-Kanäle

## Zusammenfassung der bewährten Verfahren

Befolgen Sie diese Prinzipien während des gesamten Tool-Erstellungsprozesses:

**1. Immer Quelldokumentation verwenden**
   - Raten Sie nicht bei API-Endpunkten oder -Parametern
   - Beziehen Sie sich auf die offizielle API-Dokumentation
   - Überprüfen Sie die Anforderungen vor dem Erstellen

**2. Klare, spezifische Beschreibungen schreiben**
   - Parameterbeschreibungen sind der wichtigste Teil
   - Teilen Sie der KI genau mit, was zu tun ist, nicht nur, was der Parameter ist
   - Fügen Sie Formatanforderungen und Ausweichanweisungen hinzu

**3. Gründlich testen**
   - Testen Sie mit verschiedenen Formulierungen und Szenarien
   - Verwenden Sie neue Browsersitzungen, um Kontextprobleme zu vermeiden
   - Überprüfen Sie Erklärungen, um das Verhalten der KI zu verstehen

**4. Basierend auf tatsächlicher Nutzung iterieren**
   - Überwachen Sie tatsächliche Kundengespräche
   - Verfeinern Sie Beschreibungen basierend auf Fehlschlägen
   - Nehmen Sie inkrementelle Verbesserungen vor

**5. KI-Unterstützung strategisch nutzen**
   - Verwenden Sie KI, um komplexe Dokumentation zu verstehen
   - Erhalten Sie Hilfe beim Schreiben von Parameterbeschreibungen
   - Delegieren Sie keine geschäftlichen Logikentscheidungen

## Häufig gestellte Fragen (FAQ)

<details>
<summary>Muss ich Entwickler sein, um benutzerdefinierte Tools zu erstellen?</summary>

Nein, Sie müssen kein Entwickler sein. Obwohl grundlegende Vertrautheit mit API-Konzepten hilft, machen es die cURL-Importfunktion und KI-Assistenten möglich, Tools ohne tiefgreifende technische Kenntnisse zu erstellen. Die wichtigste Fähigkeit ist es, klare Parameterbeschreibungen zu schreiben, die der KI mitteilen, wie das Tool zu verwenden ist.

</details>

<details>
<summary>Was, wenn ich keine API-Dokumentation für den Dienst finden kann, den ich integrieren möchte?</summary>

Wenn Sie keine offizielle API-Dokumentation finden können, versuchen Sie:
- Nach „[Dienstname] API documentation“ oder „[Dienstname] developer docs“ zu suchen
- Das Support-Team des Dienstes für API-Zugang zu kontaktieren
- Zu prüfen, ob es ein Entwicklerportal oder Community-Forum gibt

Wenn keine API existiert, müssen Sie möglicherweise eine andere Integrationsmethode verwenden oder den Dienstanbieter kontaktieren.

</details>

<details>
<summary>Kann ich dasselbe Tool für mehrere Fähigkeiten verwenden?</summary>

Ja, Sie können dasselbe Tool über mehrere Fähigkeiten hinweg verwenden. Jede Fähigkeit sollte jedoch ihre eigene Eingabeaufforderung haben, die definiert, wann und wie das Tool in diesem spezifischen Kontext zu verwenden ist. Dies ermöglicht es, dass derselbe API-Endpunkt unterschiedlichen Geschäftszwecken dient.

</details>

<details>
<summary>Was passiert, wenn mein API-Schlüssel abläuft oder sich ändert?</summary>

Wenn Ihr API-Schlüssel abläuft oder sich ändert, müssen Sie den Authentifizierungs-Header in Ihrer Tool-Konfiguration aktualisieren. Gehen Sie zu den Tool-Einstellungen, suchen Sie den Authorization-Header und aktualisieren Sie ihn mit dem neuen Schlüssel. Das Tool funktioniert dann mit den neuen Anmeldedaten.

</details>

<details>
<summary>Woher weiß ich, ob meine Parameterbeschreibungen gut genug sind?</summary>

Testen Sie Ihr Tool mit verschiedenen Kundenformulierungen. Wenn die KI:
- Parameter korrekt aus Kundennachrichten extrahiert
- Nach fehlenden erforderlichen Informationen fragt
- Das Tool bei Bedarf verwendet
- Randfälle elegant behandelt

Dann funktionieren Ihre Beschreibungen gut. Überprüfen Sie die Explanation-Funktion, um zu sehen, wie die KI Ihre Beschreibungen interpretiert.

</details>

<details>
<summary>Kann ich Tools erstellen, die mehrere API-Endpunkte verwenden?</summary>

Ja, Sie können mehrere Tools zu einer einzigen Fähigkeit hinzufügen. Jedes Tool kann einen anderen API-Endpunkt aufrufen. Die KI verwendet das passende Tool basierend auf der Kundenanfrage und den von Ihnen geschriebenen Tool-Beschreibungen.

</details>

<details>
<summary>Was soll ich tun, wenn der cURL-Import nicht funktioniert?</summary>

Wenn der cURL-Import fehlschlägt:
- Überprüfen Sie, ob der cURL-Befehl vollständig und korrekt formatiert ist
- Prüfen Sie, ob alle Anführungszeichen korrekt geschlossen sind
- Versuchen Sie, ein neues cURL mit KI oder API-Testtools wie Postman zu generieren
- Konfigurieren Sie das Tool manuell, wenn der Import weiterhin fehlschlägt

Die manuelle Konfigurationsoption gibt Ihnen die volle Kontrolle über alle Tool-Einstellungen.

</details>

<details>
<summary>Wie oft sollte ich meine Tools testen und verfeinern?</summary>

Testen Sie sofort nach der Erstellung eines Tools und überwachen Sie dann die tatsächliche Nutzung. Verfeinern Sie Tools basierend auf:
- Fehlgeschlagenen API-Aufrufen oder Fehlern
- Kundenverwirrung oder wiederholten Fragen
- Tools, die nicht auslösen, wenn sie sollten (oder falsch auslösen)
- Änderungen an der API oder dem Dienst, den Sie integrieren

Regelmäßige Überwachung hilft, Probleme zu erkennen, bevor sie zu viele Kundeninteraktionen beeinträchtigen.

</details>

<details>
<summary>Kann ich von mir erstellte Tools mit anderen KI-Mitarbeitern teilen?</summary>

Ja, benutzerdefinierte Fähigkeiten (einschließlich ihrer Tools) können mehreren KI-Mitarbeitern zugewiesen werden. Dies ermöglicht es Ihnen, erfolgreiche Tool-Konfigurationen über verschiedene KI-Mitarbeiter hinweg wiederzuverwenden, ohne sie neu zu erstellen.

</details>

<details>
<summary>Was ist der Unterschied zwischen einem Tool und einer Fähigkeit?</summary>

Ein **Tool** ist die technische API-Implementierung (das „Wie“) – es definiert den API-Endpunkt, die Authentifizierung und die Parameter. Eine **Fähigkeit** ist die Geschäftslogik (das „Wann“ und „Warum“) – sie enthält die Eingabeaufforderung, die der KI mitteilt, wann das Tool zu verwenden ist und wie Antworten zu behandeln sind. Sie benötigen beides: Tools für die API-Verbindung und Fähigkeiten für das KI-Verhalten.

</details>
