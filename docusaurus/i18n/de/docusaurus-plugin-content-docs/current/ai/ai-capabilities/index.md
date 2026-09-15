---
title: Überblick über KI-Fähigkeiten
sidebar_label: KI-Fähigkeiten
description: Erfahren Sie, wie KI-Fähigkeiten als spezialisierte Fertigkeiten funktionieren, die es AI Employees ermöglichen, bestimmte Geschäftsaufgaben zu übernehmen und Kundeninteraktionen zu automatisieren.
tags: [ai-capabilities, capabilities, ai-employees, custom-capabilities, automation]
keywords: [AI capabilities, capabilities, custom capabilities, AI employees, automation, tools, integrations, lead capture, appointment booking]
---

import { GraduationCapIcon } from '@site/src/components/Icons';

KI-Fähigkeiten sind spezialisierte Fertigkeiten, die festlegen, was Ihre AI Employees können und wie sie sich bei der Interaktion mit Kunden verhalten. Betrachten Sie Fähigkeiten als Bausteine, die einen einfachen KI-Assistenten in einen kompetenten Mitarbeiter verwandeln, der bestimmte Geschäftsaufgaben übernehmen kann.

## Was sind KI-Fähigkeiten?

Eine **Fähigkeit** ist eine eigenständige Reihe von Anweisungen, die Sie für einen AI Employee aktivieren oder deaktivieren können. Vereinfacht gesagt besteht eine Fähigkeit aus einem Prompt-Abschnitt sowie optional einem Tool zum Aufrufen einer API.

Jede Fähigkeit enthält Anweisungen, die die KI leiten bei:

- Welche Aktionen in bestimmten Situationen zu ergreifen sind
- Welche Ergebnisse priorisiert werden sollen
- Wie auf verschiedene Arten von Anfragen reagiert werden soll

Mehrere Fähigkeiten können zusammenarbeiten, um AI Employees zu schaffen, die komplexe, mehrstufige Interaktionen bewältigen und dabei die Konsistenz mit Ihren Geschäftsprozessen wahren können. Wenn der AI Employee eine Anfrage bearbeitet, kombiniert er alle Fähigkeiten zu dem Prompt, der sein Verhalten steuert.

### Arten von KI-Fähigkeiten

#### Integrierte Fähigkeiten
Die Vendasta-Plattform bietet vorkonfigurierte Fähigkeiten für gängige Geschäftsfunktionen. Einige Beispiele:

- **Lead-Erfassung**: Automatisches Sammeln und Qualifizieren von Lead-Informationen (Name, E-Mail, Telefon, Budget).
- **Terminbuchung**: Termine über Ihre verbundenen Kalendersysteme planen.
- **Anruf weiterleiten**: Anrufer basierend auf Absicht und Regeln live an andere Nummern weiterleiten. Siehe [Anrufe an andere Nummern weiterleiten](../ai-workforce/ai-voice-receptionist.md#transfer-calls-to-other-numbers-from-your-ai-voice-receptionist).

#### Benutzerdefinierte Fähigkeiten
Für spezialisierte Workflows können Sie eigene benutzerdefinierte Fähigkeiten erstellen, die:

- Einfach neue Anweisungen hinzufügen, denen der AI Employee folgen soll (keine Tools erforderlich)
- Über APIs eine Verbindung zu externen Systemen herstellen (mithilfe von Tools)
- Komplexe Geschäftslogik ausführen
- Einzigartige, branchenspezifische Prozesse automatisieren

## Wie Fähigkeiten mit AI Employees zusammenarbeiten

### Zuweisung von Fähigkeiten
Jeder AI Employee kann mehrere Fähigkeiten gleichzeitig aktiviert haben. Die KI entscheidet intelligent, welche Fähigkeiten basierend auf Kundenanfragen und Gesprächskontext verwendet werden.

### Kontextabhängige Aktivierung
Ihr AI Employee bewertet eingehende Anfragen und aktiviert die am besten geeignete Fähigkeit. Zum Beispiel:
- Eine Frage zu den Öffnungszeiten löst den Zugriff auf die Wissensdatenbank aus
- Eine Anfrage nach Preisinformationen aktiviert Produktsuch-Fähigkeiten
- Interesse an Dienstleistungen aktiviert Lead-Erfassung und Terminbuchung

### Anpassungsfähiges Verhalten
Fähigkeiten können mit spezifischen Prompts und Parametern konfiguriert werden, die das Verhalten der KI verändern. Dadurch kann dieselbe Fähigkeit bei verschiedenen AI Employees oder Geschäftskontexten unterschiedlich funktionieren.

## Architektur von Fähigkeiten für AI Employees

### Prompts
Schriftliche Anweisungen, die der KI mitteilen, wann und wie eine Fähigkeit zu verwenden ist. Prompts definieren:
- Auslösebedingungen für die Aktivierung
- Erforderliche Informationen vor dem Fortfahren
- Antwortvorlagen und Tonalität
- Verfahren zur Fehlerbehandlung

### Tools (benutzerdefinierte Fähigkeiten)
Bei benutzerdefinierten Fähigkeiten definieren Tools die technische Umsetzung:
- API-Endpunkte und Authentifizierung
- Datenparameter und -formate
- Integrations-Workflows
- Logik zur Antwortverarbeitung

:::tip Mehr über Tools erfahren
Tools ermöglichen es AI Employees, mit externen Systemen zu interagieren und Echtzeitinformationen abzurufen. Um die Grundlagen der Funktionsweise von Tools mit APIs zu verstehen, siehe die [Tools & Integrationen Übersicht](./tools-overview). Eine Schritt-für-Schritt-Anleitung zum Erstellen benutzerdefinierter Tools finden Sie unter [Benutzerdefinierte Tools erstellen](./tools-overview/building-custom-tools).
:::

## Fähigkeiten testen und optimieren

Effektive Fähigkeiten erfordern iteratives Testen und Verfeinern. Nutzen Sie diese Strategien, um sicherzustellen, dass Ihre Fähigkeiten wie erwartet funktionieren:

### Leistung von Fähigkeiten testen

**1. Auslösebedingungen testen**
- Überprüfen Sie, ob die Fähigkeit aktiviert wird, wenn sie sollte
- Stellen Sie sicher, dass sie sich nicht aktiviert, wenn sie es nicht sollte
- Testen Sie verschiedene Formulierungen von Anfragen, um die Konsistenz zu prüfen

**2. Informationssammlung überprüfen**
- Bestätigen Sie, dass die KI vor der Nutzung von Tools nach erforderlichen Informationen fragt
- Testen Sie, was passiert, wenn Kunden unvollständige Daten angeben
- Stellen Sie sicher, dass die KI Grenzfälle souverän behandelt

**3. KI-Erklärungen überprüfen**
- Prüfen Sie die Begründung hinter Entscheidungen zur Aktivierung von Fähigkeiten
- Identifizieren Sie, wann die KI eine Fähigkeit einer anderen vorgezogen hat
- Nutzen Sie die Erklärungen, um Auslösebedingungen und Prompts zu verfeinern

### Optimierungstechniken

**Kürzer ist besser**
- Halten Sie Prompts für Fähigkeiten prägnant und fokussiert
- Vermeiden Sie redundante oder widersprüchliche Anweisungen
- Entfernen Sie unnötige Details, die das Verhalten nicht beeinflussen

**Beispiele verwenden**
- Fügen Sie konkrete Beispiele hinzu, wann die Fähigkeit zu verwenden ist
- Zeigen Sie Beispiele für erforderliche Informationsformate
- Demonstrieren Sie gewünschte Antwortmuster

**Für Klarheit formatieren**
- Verwenden Sie Markdown-Überschriften, um Abschnitte zu gliedern
- Verwenden Sie Aufzählungspunkte für Listen von Bedingungen oder Schritten
- Verwenden Sie Fettdruck, um wichtige Anweisungen hervorzuheben
- Strukturieren Sie Prompts so, dass sie für Menschen und KI gleichermaßen leicht überschaubar sind

**Um KI-Unterstützung bitten**
- Kopieren Sie Ihren Fähigkeits-Prompt und bitten Sie eine KI um Verbesserungsvorschläge
- Fordern Sie Beispiele für Grenzfälle an, die Sie behandeln sollten
- Holen Sie Feedback zu Klarheit und Vollständigkeit ein

**Testen und iterieren**
- Nehmen Sie jeweils nur eine Änderung vor
- Testen Sie das spezifische Szenario, das Sie verbessern möchten
- Überwachen Sie reale Gespräche, um Verbesserungen zu bestätigen
- Seien Sie bereit, basierend auf den Ergebnissen weiter zu verfeinern

:::tip Leistungsüberwachung
Nutzen Sie die Funktion "Erklärungen" in Conversations, um Folgendes zu verstehen:
- Welche Fähigkeiten am häufigsten verwendet werden
- Wo Fähigkeiten miteinander in Konflikt geraten
- Wann die KI sich entscheidet, eine Fähigkeit nicht zu verwenden, und warum
- Wie gut Ihre Auslösebedingungen in der Praxis funktionieren
:::

---

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Neu bei der Funktionsweise von AI Employees? Absolvieren Sie den Kurs <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>KI-Grundlagen</a> in Vendasta Learn – Einsteiger, 6 Lektionen.
  </span>
</div>
