---
title: KI-Tools  
sidebar_label: KI-Tools 
sidebar_position: 1
description: Tools ermöglichen es KI-Mitarbeitern, mit externen Systemen zu interagieren, Echtzeitinformationen abzurufen und Workflows plattformübergreifend zu automatisieren. Erfahren Sie, wie Tools funktionieren, aus welchen Komponenten sie bestehen und wann Sie benutzerdefinierte Tools erstellen sollten, um die Fähigkeiten Ihrer KI zu erweitern.
keywords:
  - AI Tools
  - Tool Components
  - Custom Tools
  - API Integration
tags:
  - AI Tools
  - Capabilities
  - Integrations
---

import { GraduationCapIcon } from '@site/src/components/Icons';

Tools ermöglichen es Ihren KI-Mitarbeitern, mit externen Systemen zu interagieren, Echtzeitinformationen abzurufen und Workflows plattformübergreifend zu automatisieren. Zu verstehen, wie Tools funktionieren, ist entscheidend, um leistungsstarke KI-Fähigkeiten zu entwickeln, die über einfache Unterhaltungen hinausgehen.

## Was sind Tools?

Ein **Tool** ist eine Funktion oder API, die ein KI-Mitarbeiter verwenden kann. Tools verbinden die KI mit Softwaresystemen für:

- Echtzeit-Datenabruf
- Automatisierte Aktionen plattformübergreifend
- Dynamische Antworten basierend auf externen Informationen

:::note Beispiel
Ein KI-Rezeptionist für einen Handwerksbetrieb verwendet ein Wetter-API-Tool bei der Buchung von „Dachrinnenreinigung diese Woche“, um vor der Bestätigung des Termins zu prüfen, ob die Außenbedingungen geeignet sind.
:::


### APIs und Tools

Tools und APIs arbeiten zusammen, um KI-Mitarbeitern die Interaktion mit Softwaresystemen zu ermöglichen. Während APIs die Rohfunktionalität zur Verbindung von Systemen bereitstellen, bieten Tools die Intelligenzschicht, die der KI mitteilt, wann und wie diese APIs effektiv genutzt werden sollen.

**APIs** bieten Funktionalität; **Tools** weisen die KI an, wie APIs zu verwenden sind, indem sie definieren:
- Wann die API zu verwenden ist
- Wie Anfragen zu formatieren sind
- Die Handhabung der Authentifizierung

## Tool-Komponenten

Jedes Tool besteht aus vier Schlüsselkomponenten, die dem KI-Mitarbeiter mitteilen, wie die API zu verwenden ist. Diese Komponenten erfordern *kein* umfassendes Verständnis von Code, aber Sie müssen die API-Dokumentation konsultieren, um sie korrekt auszufüllen.

<img src={require('./img/main-tool-components.png').default} alt="The four main tool components" style={{width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Beschreibung

Die Beschreibung ist ein kurzer Satz, der der KI mitteilt, wann das Tool zu verwenden ist und was es bewirkt. Indem Sie spezifisch über Auslöser und Geschäftsergebnisse sind, helfen Sie der KI zu verstehen, wann das Tool zu verwenden ist und was in der Antwort zu erwarten ist.

:::note Beispiel
„Vor der Buchung von Außenterminen verwenden, um die Wetterbedingungen aus Sicherheitsgründen zu prüfen.“
:::

<img src={require('./img/tool-description-example.png').default} alt="Tool description example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Methode und URL

Der spezifische API-Endpunkt (Webadresse) und die HTTP-Methode, die der API mitteilen, welche Aktion auszuführen ist. 

<img src={require('./img/tool-method-url-example.png').default} alt="Tool method and URL example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

| Methode | Standardzweck | Beispiel-Anwendungsfall |
|--------|----------------|------------------|
| **GET** | Ressourcen abrufen | Kundeninformationen nachschlagen |
| **POST** | Neue Ressourcen erstellen | Einen neuen Kunden erstellen |
| **PUT/PATCH** | Vorhandene Ressourcen aktualisieren | Kundeninformationen aktualisieren |
| **DELETE** | Ressourcen entfernen | Einen Kunden löschen |

:::info
Die von Ihnen verwendete Methode und URL werden vom Ersteller der API festgelegt. Die Kenntnis der gängigen Methoden und ihrer Zwecke hilft Ihnen zwar zu verstehen, wie ein Tool eingerichtet wird und ob es korrekt konfiguriert ist, aber Sie müssen die API-Dokumentation für die spezifische zu verwendende Methode und URL konsultieren.
:::

### Header

Header liefern wesentliche Metadaten für API-Anfragen, einschließlich Authentifizierung und Informationen zum Inhaltstyp. Sie werden bei jedem API-Aufruf gesendet und gewährleisten eine sichere, korrekt formatierte Kommunikation.

**Zu den gängigen Headern gehören:**
- `Authorization: Bearer YOUR_API_KEY` – Belegt Ihre Identität und Berechtigungen
- `Content-Type: application/json` – Gibt das Format der gesendeten Daten an

<img src={require('./img/tool-header-example.png').default} alt="Tool headers example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Parameter

Parameter definieren die spezifischen Daten, die an die API gesendet werden. Es gibt eine Reihe von Feldern, die Sie ausfüllen müssen, um einen Parameter zu konfigurieren, damit die KI ihn korrekt verwenden kann, aber viele davon erfordern kein umfassendes Verständnis von Code.

<img src={require('./img/tool-parameter-example.png').default} alt="Tool parameters example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

#### Parameterstandort

Tools unterstützen das Senden von Daten an die API an zwei Stellen: **Body** und **Query**. Wählen Sie den Standort, der der Dokumentation der API entspricht. 

| Standort | Bedeutung | Typische Verwendung | Beispiel |
|----------|----------------|-------------|---------|
| **Body** | Im Anfrage-Payload enthalten | Die meisten POST-/PUT-/PATCH-Anfragen | JSON-Body wie `{ "email": "user@example.com" }` |
| **Query** | An die URL als Abfragestring angehängt | Filterung, Paginierung, Suche | `/contacts?limit=25&sort=createdAt` |

#### Parametertyp 

Der Parametertyp ist der erwartete Datentyp für den Parameter. Dies hilft sicherzustellen, dass der an die API gesendete Wert im richtigen Format vorliegt und die KI ihn korrekt ausfüllen kann. Tools unterstützen die wichtigsten grundlegenden Datentypen in modernen REST- oder JSON-basierten APIs, wie in der folgenden Tabelle zu sehen.

| Typ | Was die API erwartet | Beispielwert | Hinweise |
|------|----------------------|---------------|-------|
| **String** | Text | `"hello world"` | |
| **Number** | Dezimal-/Gleitkommazahl | `12.5` | Für Preise, Messungen |
| **Integer** | Ganze Zahl | `42` | Für Zählungen, IDs bei numerischen Werten |
| **Boolean** | Wahr/Falsch | `true` | Feature-Flags, Umschalter |
| **Enum** | Eine der zulässigen Zeichenfolgen | `"open"` | Definieren Sie die zulässigen Optionen |
| **Object** | Schlüssel/Wert-Struktur | `{ "id": "123", "name": "Acme" }` | Fügen Sie Felder unterhalb des Parameters hinzu |
| **Array** | Geordnete Liste | `["a", "b"]` oder `[{...},{...}]` | Wählen Sie den Elementtyp (String, Object usw.) |

:::note Ausfüllen von Object- und Array-Parametern
Bei Objekten und Arrays werden Sie aufgefordert, die innere Struktur zu definieren, damit die KI jedes Feld korrekt ausfüllen kann. Felder innerhalb des Objekts oder Arrays werden ähnlich ausgefüllt wie ein regulärer Parameter.

<img src={require('./img/tool-nested-object-fields.png').default} alt="Object and array parameter example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
:::

#### Kontrollkästchen „Erforderlich“ für Parameter

Das Kontrollkästchen `Required` gibt an, ob der Parameter erforderlich ist, damit die API korrekt funktioniert. Wenn der Parameter **erforderlich ist**, verwendet die KI dieses Tool immer mit einem ausgefüllten Wert. 

Einige APIs erfordern, dass bestimmte Parameter ausgefüllt werden, damit sie korrekt funktionieren. Prüfen Sie stets die API-Dokumentation, um zu bestätigen, ob ein Parameter erforderlich ist, damit Sie ihn korrekt konfigurieren können.


:::tip Parameter für konsistentes Verhalten erforderlich machen
Auch wenn ein Parameter für die korrekte Funktion der API **nicht** erforderlich sein mag, können Sie ihn für ein konsistentes Verhalten in Ihrem KI-Mitarbeiter als erforderlich festlegen. 
:::

:::info Erforderliche Parameter in Objekten und Arrays
Auch wenn Objekte und Arrays von der API möglicherweise nicht benötigt werden, können sie selbst, wenn sie vorhanden sind, erforderliche Felder haben. Zum Beispiel muss eine Bestellung möglicherweise keinen Kunden enthalten, aber das Kundenobjekt selbst könnte Felder wie einen Namen oder eine E-Mail-Adresse erfordern.

Dieses Verhalten wird unterstützt, indem „Object“ oder „Array“ als nicht erforderlich markiert bleibt, die erforderlichen Felder selbst jedoch als erforderlich markiert werden.

<img src={require('./img/tool-object-requirements.png').default} alt="Object and array parameter example showing required fields" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
:::


#### Parameterbeschreibung

Die Parameterbeschreibung teilt der KI mit, was der Parameter ist und wie er auszufüllen ist. Dies kann Folgendes umfassen:
- woher der Wert stammt (Benutzernachricht, Konversationskontext usw.)
- Validierungsregeln und Formatanforderungen (z. B. „muss eine gültige E-Mail-Adresse sein“, „muss eine Zahl zwischen 1 und 100 sein“ usw.)
- Ausweichanweisungen für fehlende Informationen

Ein Beispiel für eine detaillierte Parameterbeschreibung könnte sein:
``` 
„Das vom Benutzer angeforderte Termindatum. Es sollte im Format JJJJ-MM-TT vorliegen. Möglicherweise müssen Sie den Benutzer nach dem Datum fragen, wenn es nicht angegeben wird.“
```
<img src={require('./img/tool-parameter-description-example.png').default} alt="Parameter description example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

#### Kontrollkästchen „Von KI festgelegt“ für Parameter

Während Sie oft möchten, dass die KI den Parameterwert dynamisch basierend auf dem Konversationskontext ausfüllt, gibt es Zeiten, in denen Sie einen festen Wert festlegen möchten. Sie können dies tun, indem Sie das Kontrollkästchen `Set by AI` deaktivieren.

Wenn `Set by AI` deaktiviert ist, müssen Sie das Feld `Value` mit dem gewünschten festen Wert ausfüllen.

<img src={require('./img/tool-set-by-ai-example.png').default} alt="Parameter set by AI checkbox example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

| Typ | Beschreibung | Beispiel |
|------|--------------|----------|
| Set by AI | Dynamische Werte, die vom Benutzer oder Konversationskontext stammen | „Das vom Benutzer angeforderte Termindatum. Es sollte im Format JJJJ-MM-TT vorliegen. Möglicherweise müssen Sie den Benutzer nach dem Datum fragen, wenn es nicht angegeben wird.“ |
| Fixed value | Von der API benötigte Konstanten, Feature-Schalter oder Standardmodi | `"2025-01-01"` |

## Wann benutzerdefinierte Tools erstellt werden sollten

Erstellen Sie benutzerdefinierte Tools, wenn KI-Mitarbeiter Folgendes benötigen:
- Echtzeit-Bestand oder Produktverfügbarkeit prüfen
- Termine in externen Kalendern planen
- Bestellstatus von E-Commerce-Plattformen nachschlagen
- Auf Kundenkontoinformationen zugreifen
- Sich in spezialisierte Geschäftssysteme integrieren
- Für Ihre Branche spezifische Workflows automatisieren

:::tip Bereit zum Erstellen?
Nachdem Sie nun verstehen, was Tools sind und wie sie funktionieren, folgen Sie unserem Schritt-für-Schritt-Tutorial, um Ihr erstes benutzerdefiniertes Tool zu erstellen: [Benutzerdefinierte Tools erstellen](./building-custom-tools)
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Neu bei der Einstellung und dem Betrieb eines KI-Mitarbeiters? Nehmen Sie am Kurs <a href="/learn/ai-workforce" style={{color: '#3C9A63', fontWeight: 600}}>Stellen Sie Ihren ersten KI-Mitarbeiter ein</a> in Vendasta Learn teil — Anfänger bis Fortgeschritten, 7 Lektionen.
  </span>
</div>
