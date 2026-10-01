---
title: Présentation des capacités d'IA
sidebar_label: Capacités d'IA
description: Découvrez comment les capacités d'IA fonctionnent comme des compétences spécialisées qui permettent aux employés IA de gérer des tâches métier précises et d'automatiser les interactions clients.
tags: [ai-capabilities, capabilities, ai-employees, custom-capabilities, automation]
keywords: [AI capabilities, capabilities, custom capabilities, AI employees, automation, tools, integrations, lead capture, appointment booking]
---

import { GraduationCapIcon } from '@site/src/components/Icons';

Les capacités d'IA sont des compétences spécialisées qui définissent ce que vos employés IA peuvent faire et comment ils se comportent lorsqu'ils interagissent avec les clients. Considérez les capacités comme des blocs de construction qui transforment un assistant IA basique en un employé qualifié capable de gérer des tâches métier précises.

## Que sont les capacités d'IA ?

Une **capacité** est un ensemble discret d'instructions que vous pouvez activer ou désactiver pour un employé IA. En résumé, une capacité est une section de prompt, accompagnée éventuellement d'un outil permettant d'appeler une API.

Chaque capacité contient des instructions qui guident l'IA sur :

- Quelles actions entreprendre dans des situations précises
- Quels résultats privilégier
- Comment répondre à différents types de demandes

Plusieurs capacités peuvent fonctionner ensemble pour créer des employés IA capables de gérer des interactions complexes en plusieurs étapes tout en restant cohérents avec vos processus métier. Lorsque l'employé IA traite une demande, il combine toutes les capacités dans le prompt qui régit son comportement.

### Types de capacités d'IA

#### Capacités intégrées
La plateforme Vendasta fournit des capacités préconfigurées pour les fonctions métier courantes. En voici quelques exemples :

- **Lead Capture** : collecte et qualifie automatiquement les informations de prospect (nom, e-mail, téléphone, budget).
- **Appointment Booking** : planifie des rendez-vous en utilisant vos systèmes de calendrier connectés.
- **Transfer Call** : transfère en direct les appelants vers d'autres numéros en fonction de l'intention et des règles. Consultez [Transférer les appels vers d'autres numéros](../ai-workforce/ai-voice-receptionist.md#transfer-calls-to-other-numbers-from-your-ai-voice-receptionist).

#### Capacités personnalisées
Pour des flux de travail spécialisés, vous pouvez créer vos propres capacités personnalisées qui :

- Ajoutent simplement de nouvelles instructions à suivre pour l'employé IA (aucun outil nécessaire)
- Se connectent à des systèmes externes via des API (à l'aide d'outils)
- Exécutent une logique métier complexe
- Automatisent des processus propres à votre secteur

## Comment les capacités fonctionnent avec les employés IA

### Attribution des capacités
Chaque employé IA peut avoir plusieurs capacités activées simultanément. L'IA décide intelligemment quelles capacités utiliser en fonction des demandes des clients et du contexte de la conversation.

### Activation contextuelle
Votre employé IA évalue les demandes entrantes et active la capacité la plus appropriée. Par exemple :
- Une question sur les horaires d'ouverture déclenche l'accès à la base de connaissances
- Une demande d'informations sur les prix active les capacités de recherche de produits
- Un intérêt pour des services active la capture de prospects et la prise de rendez-vous

### Comportement adaptatif
Les capacités peuvent être configurées avec des prompts et des paramètres précis qui modifient le comportement de l'IA. Cela permet à la même capacité de fonctionner différemment selon les employés IA ou les contextes métier.

## Architecture des capacités pour les employés IA

### Prompts
Instructions écrites qui indiquent à l'IA quand et comment utiliser une capacité. Les prompts définissent :
- Les conditions de déclenchement de l'activation
- Les informations requises avant de procéder
- Les modèles de réponse et le ton
- Les procédures de gestion des erreurs

### Outils (capacités personnalisées)
Pour les capacités personnalisées, les outils définissent l'implémentation technique :
- Points de terminaison API et authentification
- Paramètres et formats de données
- Flux de travail d'intégration
- Logique de traitement des réponses

:::tip En savoir plus sur les outils
Les outils permettent aux employés IA d'interagir avec des systèmes externes et de récupérer des données en temps réel. Pour comprendre les principes fondamentaux du fonctionnement des outils avec les API, consultez la [Présentation des outils et intégrations](./tools-overview). Pour un guide étape par étape sur la création d'outils personnalisés, consultez [Créer des outils personnalisés](./tools-overview/building-custom-tools).
:::

## Tester et optimiser les capacités

Des capacités efficaces nécessitent des tests et des ajustements itératifs. Utilisez ces stratégies pour vous assurer que vos capacités fonctionnent comme prévu :

### Tester la performance des capacités

**1. Tester les conditions de déclenchement**
- Vérifiez que la capacité s'active quand elle le devrait
- Assurez-vous qu'elle ne s'active pas quand elle ne le devrait pas
- Essayez différentes formulations de demandes pour tester la cohérence

**2. Vérifier la collecte d'informations**
- Confirmez que l'IA demande les informations requises avant d'utiliser des outils
- Testez ce qui se passe lorsque les clients fournissent des données incomplètes
- Assurez-vous que l'IA gère les cas limites avec souplesse

**3. Examiner les explications de l'IA**
- Vérifiez le raisonnement derrière les décisions d'activation des capacités
- Identifiez quand l'IA a choisi une capacité plutôt qu'une autre
- Utilisez les explications pour affiner les conditions de déclenchement et les prompts

### Techniques d'optimisation

**Plus court, c'est mieux**
- Gardez les prompts de capacité concis et ciblés
- Évitez les instructions redondantes ou contradictoires
- Supprimez les détails inutiles qui n'affectent pas le comportement

**Utiliser des exemples**
- Incluez des exemples précis de quand utiliser la capacité
- Montrez des exemples de formats d'informations requis
- Illustrez les modèles de réponse souhaités

**Formater pour la clarté**
- Utilisez des titres markdown pour organiser les sections
- Utilisez des puces pour les listes de conditions ou d'étapes
- Utilisez le gras pour mettre en avant les instructions critiques
- Structurez les prompts pour qu'ils soient faciles à parcourir, pour les humains comme pour l'IA

**Demander de l'aide à l'IA**
- Copiez votre prompt de capacité et demandez à une IA de suggérer des améliorations
- Demandez des exemples de cas limites à gérer
- Obtenez des retours sur la clarté et l'exhaustivité

**Tester et itérer**
- Effectuez un seul changement à la fois
- Testez le scénario précis que vous essayez d'améliorer
- Surveillez les conversations réelles pour vérifier les améliorations
- Soyez prêt à affiner davantage en fonction des résultats

:::tip Suivi des performances
Utilisez la fonctionnalité Explanations dans Conversations pour comprendre :
- Quelles capacités sont utilisées le plus fréquemment
- Où les capacités entrent en conflit les unes avec les autres
- Quand l'IA choisit de ne pas utiliser une capacité, et pourquoi
- Dans quelle mesure vos conditions de déclenchement fonctionnent dans la pratique
:::

---

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Vous découvrez le fonctionnement des employés IA ? Suivez le cours <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> dans Vendasta Learn — Débutant, 6 leçons.
  </span>
</div>
