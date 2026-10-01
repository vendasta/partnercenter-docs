---
title: Comment créer des capacités personnalisées
sidebar_label: Créer des capacités personnalisées
sidebar_position: 3
description: Guide étape par étape pour créer des capacités d'IA personnalisées qui connectent les employés IA à des systèmes externes à l'aide d'outils et d'API.
tags: [ai-capabilities, custom-capabilities, ai-workforce, integrations]
keywords: [custom capabilities, AI capabilities, tools, integrations, API, AI Employees, prompts, testing]
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

Ce guide vous explique comment créer des capacités personnalisées qui connectent vos employés IA à des systèmes et API externes. Les capacités personnalisées permettent des fonctions métier spécialisées comme la vérification des stocks, la prise de rendez-vous et le suivi des commandes.

## Prérequis

Avant de créer des capacités personnalisées, assurez-vous d'avoir :
- Accès à la documentation de l'API du système externe
- Des identifiants ou jetons d'authentification API valides
- Une compréhension claire du processus métier que vous souhaitez automatiser
- Une familiarité de base avec les concepts d'API (URL, méthodes, paramètres)

## Quand utiliser des capacités personnalisées

Créez des capacités personnalisées lorsque vos employés IA doivent :
- Vérifier les stocks et les détails des produits en temps réel
- Planifier des rendez-vous ou des réservations dans des systèmes externes
- Consulter le statut d'une commande depuis votre plateforme de e-commerce
- Générer des devis ou des estimations personnalisés
- Accéder aux informations de compte client (points de fidélité, historique d'achats)
- Effectuer des recherches dans des bases de connaissances internes ou des systèmes de FAQ
- Créer des tickets dans des systèmes de suivi de travaux ou de support
- Automatiser des flux de travail répétitifs propres à votre entreprise

:::tip
Si une action peut être réalisée via une API, elle peut probablement devenir une capacité personnalisée.
:::

## Étape par étape : créer une capacité personnalisée

### Étape 1 : accéder aux paramètres des capacités personnalisées

1. Accédez à <AISparkleIcon /> `AI` → `Workforce` dans votre tableau de bord Business App.
2. Sélectionnez l'employé IA que vous souhaitez améliorer (il peut s'agir d'un employé IA préconfiguré comme Chat Receptionist ou Voice Receptionist, ou d'un employé IA personnalisé que vous avez créé).
3. Cliquez sur `Configure` pour ouvrir la page `Configure` de l'employé IA.
4. Ouvrez `Capabilities` pour afficher et gérer toutes les capacités disponibles.
5. Cliquez sur `+ Add a capability`.
6. Choisissez `+ New capability` pour commencer à en créer une vous-même.

:::tip Les capacités personnalisées fonctionnent avec tous les employés IA
Les capacités personnalisées peuvent être utilisées à la fois avec les employés IA préconfigurés (Chat Receptionist, Voice Receptionist) et avec les employés IA personnalisés que vous créez. Cela signifie que vous pouvez créer une capacité personnalisée une seule fois et l'utiliser avec plusieurs employés IA.
:::

### Créer des employés IA personnalisés

Vous pouvez créer des employés IA entièrement personnalisés avec des capacités spécialisées. Les employés IA personnalisés utilisent le même cadre que les employés IA préconfigurés, ce qui vous donne un contrôle complet sur leur configuration.

**Quand créer des employés IA personnalisés :**
- Vous avez besoin d'un employé IA spécialisé pour une fonction métier précise (par exemple, estimateur de travaux, chef de projet)
- Les employés IA préconfigurés ne correspondent pas exactement à votre cas d'usage
- Vous voulez un contrôle complet sur les flux de conversation et les réponses
- Vous avez besoin de connaissances et de capacités propres à votre secteur

**Étapes de base :**
1. Sur la page `Workforce`, cliquez sur `Create`
2. Configurez le profil de base (nom, avatar, objectif)
3. Configurez les canaux de communication (chat web, SMS, téléphone, etc.)
4. Ajoutez des sources de connaissances (site web, documents, texte personnalisé)
5. Ajoutez à la fois des capacités intégrées et des capacités personnalisées
6. Testez votre employé IA personnalisé avant de le déployer

**Avantages des employés IA personnalisés :**
- Spécialisés pour des fonctions métier précises
- Flux de conversation et réponses adaptés
- Connaissances et capacités propres à votre secteur
- Contrôle complet sur le comportement et l'apparence
- Peuvent être déployés sur plusieurs canaux (chat web, chat intégré à la plateforme, automatisations)

**Utiliser des capacités personnalisées avec des employés IA personnalisés :**
Les capacités personnalisées fonctionnent parfaitement avec les employés IA personnalisés. Vous pouvez :
- Créer des capacités personnalisées spécialement pour votre employé IA personnalisé
- Réutiliser des capacités personnalisées sur plusieurs employés IA (préconfigurés et personnalisés)
- Créer des flux de travail spécialisés combinant plusieurs capacités personnalisées

Pour des conseils complets sur la création d'employés IA personnalisés, consultez le [guide des employés IA personnalisés](../ai-workforce/custom-ai-employees.md).

### Étape 2 : définir les informations de base de la capacité

1. **Saisissez un nom de capacité** : utilisez un nom clair et descriptif (par exemple, `CheckInventory`, `BookAppointment`).
   - Évitez les espaces dans le nom
   - Utilisez des noms descriptifs qui indiquent l'objectif de la capacité
2. **Ajoutez une description** : rédigez une brève explication de ce que fait cette capacité.
   - Exemple : « Vérifie la disponibilité d'un produit dans le système de stocks en temps réel »

### Étape 3 : créer le prompt de la capacité

1. Dans le champ **Prompt**, définissez quand et comment l'IA doit utiliser cette capacité.
2. Vous pouvez commencer par un texte provisoire (« TBD ») et l'affiner après avoir configuré les outils.
3. Pour des conseils détaillés, consultez [Rédiger des prompts de capacité efficaces](#rédiger-des-prompts-de-capacité-efficaces).

:::tip
Considérez le prompt comme des instructions données à un nouvel employé que vous embauchez. Soyez précis sur le moment où il doit utiliser cette compétence et sur la façon de gérer les différents scénarios.
:::

### Étape 4 : configurer les outils

1. Cliquez sur `+ New tool` pour définir l'implémentation technique.
2. Choisissez comment configurer l'outil :
   - `Generate from cURL` : créer l'outil à partir d'un appel API fonctionnel
   - Configuration manuelle : remplissez vous-même les champs de l'appel API
3. Remplissez les champs requis de l'outil (voir [Référence de configuration des outils](#référence-de-configuration-des-outils)).
4. Ajoutez plusieurs outils si votre capacité nécessite plusieurs appels API.

:::tip Guide détaillé de création d'outils
Pour des instructions complètes, étape par étape, sur la recherche de documentation d'API, l'utilisation de l'import cURL, le travail avec des assistants IA et le test des outils, consultez [Créer des outils personnalisés](./tools-overview/building-custom-tools).
:::

### Étape 5 : tester et affiner

1. Cliquez sur **Save** pour enregistrer la configuration de votre capacité.
2. Testez la capacité en discutant avec votre employé IA.
3. Essayez différentes formulations censées déclencher la capacité.
4. Surveillez les réponses de l'IA et affinez le prompt si nécessaire.

### Étape 6 : déployer et surveiller

1. Une fois satisfait des tests, activez la capacité pour les interactions en direct.
2. Surveillez les journaux de conversation pour voir comment la capacité se comporte.
3. Faites évoluer les prompts et les configurations d'outils en fonction de l'usage réel.

## Référence de configuration des outils

#### Générer à partir de cURL
cURL est un outil que les développeurs utilisent pour tester des API en saisissant des commandes. De nombreuses documentations d'API présentent des exemples de commandes cURL. Coller ici une commande cURL fonctionnelle remplit automatiquement la configuration de l'outil, ce qui fait gagner du temps et évite les erreurs.

#### Nom
Il s'agit d'un nom unique pour votre outil au sein de la configuration de votre IA. Choisissez quelque chose de simple et descriptif, comme `CheckInventory` ou `BookAppointment`. Vous ne pouvez pas utiliser d'espaces.

#### Description
Rédigez une phrase courte et claire qui explique ce que fait cet outil. Cela aide votre employé IA à comprendre ce que fait l'outil et vous aide, vous et votre équipe, à vous souvenir de son objectif plus tard.
*Exemple :* « Vérifie si un produit est en stock. »

#### Méthode et URL
- **Méthode :** c'est l'action que votre IA demandera à l'API d'effectuer :
  - **GET** signifie « donne-moi des informations ».
  - **POST** signifie « crée ou met à jour quelque chose ».
  - **PUT/PATCH** signifie « modifie quelque chose ».
  - **DELETE** signifie « supprime quelque chose ».
- **URL :** il s'agit de l'adresse web que votre IA contactera pour effectuer l'action. Pensez-y comme au numéro de téléphone que l'IA compose.
*Exemple :* `GET https://api.yourbusiness.com/products`

#### Paramètres
Les paramètres sont des détails supplémentaires que votre IA envoie afin que l'API sache exactement ce que vous voulez. Ils existent sous différentes formes :
- **Paramètres de requête (query) :** ajoutés à la fin d'une URL, comme une question. Exemple : `?product_id=123` signifie « donne-moi des informations sur le produit 123 ».
- **Paramètres de chemin (path) :** font partie du chemin de l'URL, comme une adresse. Exemple : `/products/123` signifie « recherche le produit 123 ».
- **Paramètres de corps (body) :** envoyés à l'intérieur de la requête, généralement pour ajouter ou mettre à jour des informations (comme les détails d'un client).
Chaque paramètre a un nom (comme `product_id`), une description (ce qu'il signifie), un emplacement (query, path ou body) et un type de données (texte, nombre, etc.).

#### En-têtes
Les en-têtes sont des informations supplémentaires envoyées avec la requête API, souvent à des fins de sécurité. Par exemple :
- `Authorization: Bearer YOUR_API_KEY` (permet à l'IA d'accéder aux données)
- `Content-Type: application/json` (indique à l'IA quel type de données est envoyé)

#### Aucun traitement externe nécessaire
Cochez cette case si votre outil n'appelle pas réellement une API externe mais fonctionne en interne, par exemple pour formater des dates ou du texte au sein de l'IA. Cela évite des appels réseau inutiles.

## Rédiger des prompts de capacité efficaces

Un prompt de capacité bien rédigé comporte quatre parties clés. Pensez-y comme à des instructions de formation pour un nouvel employé :

### 1. Quand utiliser cette capacité
Précisez clairement les conditions de déclenchement :
```
ONLY call CheckCustomerOrderStatus when the user asks about their order status, 
tracking, or delivery. Do NOT use this for general product questions.
```

### 2. Quelles informations vous faut-il en premier
Listez les informations requises avant que l'IA puisse agir :
```
You MUST have the order_number before calling this tool.
If the customer doesn't provide it, ask: "Could you share your order number? 
You can find it in your confirmation email."
```

### 3. Comment utiliser la réponse
Guidez l'IA sur la présentation des résultats aux clients :
```
If successful: "I found your order! It's currently [status] and expected to 
arrive on [date]."

If the order is delayed: Apologize and provide the new estimated delivery date.
```

### 4. Comment gérer les erreurs
Expliquez quoi faire lorsque les choses tournent mal :
```
If the API returns no results: "I couldn't find an order with that number. 
Could you double-check it? Order numbers are typically 8-10 digits."

If the API fails: "I'm having trouble accessing order information right now. 
Would you like me to take your contact info so we can follow up?"
```

### Conseils de mise en forme pour de meilleurs résultats

Utilisez la mise en forme markdown pour rendre vos prompts clairs, tant pour les humains que pour l'IA :

- **Utilisez des titres** (`#`, `##`) pour organiser les différentes sections
- **Utilisez des puces** pour lister plusieurs éléments ou étapes
- **Utilisez le gras** pour mettre en avant les instructions ou noms de champs critiques
- **Utilisez la mise en forme de code** pour des exemples précis ou des noms de champs d'API

**Exemple avec une bonne mise en forme :**
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

Cette structure est plus facile à parcourir et aide l'IA à comprendre exactement quoi faire.

## Gérer les capacités personnalisées

- **Mise à jour :** toute modification enregistrée est appliquée la prochaine fois que l'IA envisage d'utiliser la capacité pendant une conversation.
- **Désactivation :** la suppression d'outils n'est pas encore prise en charge ; pour désactiver un outil, retirez-le de l'employé IA.

## Tester et dépanner les capacités personnalisées

### Étapes de test de base

1. Discutez avec votre employé IA et essayez différentes formulations pour déclencher la capacité.
2. Vérifiez que l'IA demande les informations requises et appelle l'outil approprié.
3. Dans *Conversations*, cliquez sur **Explanation** sous un message pour voir le raisonnement de l'IA et l'appel API brut.
4. Si l'appel API échoue, testez-le séparément avec des outils comme Postman, ajustez-le si nécessaire, puis réimportez la commande cURL.

### Techniques de test avancées

**Tester avec des conversations nouvelles**
- Utilisez des fenêtres de navigation privée pour des sessions de test propres
- Ou effacez les cookies entre les tests pour éviter tout report de contexte
- Cela aide à vérifier que votre capacité fonctionne de manière cohérente pour les nouveaux visiteurs

**Tester plusieurs formulations**
- Essayez différentes façons dont les clients pourraient demander la même chose
- Testez avec des demandes incomplètes pour voir comment l'IA recueille les informations manquantes
- Vérifiez que la capacité ne se déclenche pas quand elle ne le devrait pas

**Examiner systématiquement les explications de l'IA**
- Vérifiez si l'IA a envisagé votre capacité et pourquoi elle l'a utilisée ou non
- Examinez les paramètres exacts de l'appel API pour vérifier la correspondance des données
- Regardez la réponse de l'API et comment l'IA l'a interprétée
- Comparez plusieurs conversations pour identifier des tendances dans le comportement

### Bonnes pratiques d'itération

Lorsque vous affinez des capacités personnalisées, suivez cette approche systématique :

**Étape 1 : commencer simplement**
- Créez un prompt de capacité minimal avec seulement l'essentiel
- Vérifiez que la fonctionnalité de base fonctionne
- Ajoutez de la complexité progressivement

**Étape 2 : identifier les problèmes précis**
- Documentez exactement ce qui n'a pas fonctionné (avec des exemples)
- Notez ce que le client a saisi et la réponse de l'IA
- Examinez l'explication pour comprendre le processus de décision de l'IA

**Étape 3 : effectuer un seul changement à la fois**
- Ajustez uniquement un aspect (formulation du prompt, paramètre d'outil ou modèle de réponse)
- Enregistrez et testez immédiatement
- Si cela ne fonctionne pas, annulez et essayez une approche différente

**Étape 4 : tester le changement**
- Utilisez la même saisie client qui avait échoué précédemment
- Vérifiez que le problème est résolu
- Testez des cas limites pour vous assurer qu'il n'y a pas d'effets secondaires inattendus

**Étape 5 : documenter vos changements**
- Notez ce que vous avez changé et pourquoi
- Enregistrez les changements qui ont amélioré la performance
- Constituez une référence pour les futures capacités

:::tip Quand ajuster quoi
- **Problèmes de prompt** : l'IA ne sait pas quand utiliser la capacité ni comment gérer les réponses
- **Problèmes de configuration d'outil** : les appels API échouent, de mauvais paramètres sont envoyés, ou l'authentification échoue
- **Problèmes de connaissances** : l'IA a besoin d'un contexte qu'elle n'a pas (à ajouter à la base de connaissances, pas à la capacité)
- **Problèmes d'objectif** : le comportement global de l'IA entre en conflit avec la capacité (ajustez l'objectif de l'employé IA)

Commencez par la correction la plus précise (configuration de l'outil) avant d'ajuster des éléments plus larges (prompts ou objectif).
:::

### Suivi des performances

Après avoir déployé des capacités personnalisées, surveillez leurs performances :

**Suivre les taux de réussite**
- Examinez les conversations où la capacité a été utilisée
- Identifiez les schémas d'échec courants
- Recherchez les scénarios que vous n'avez pas testés

**Surveiller les performances de l'API**
- Vérifiez les temps de réponse de l'API dans les explications
- Surveillez les limites de débit de l'API ou les problèmes de délai d'attente
- Suivez les taux d'erreur et les types d'erreurs courants

**Indicateurs d'expérience client**
- Notez quand les clients expriment de la frustration ou de la confusion
- Recherchez les questions de clarification répétées
- Vérifiez si les clients atteignent leurs objectifs

**Signaux d'optimisation**
- L'IA demande fréquemment les mêmes informations manquantes (à ajouter au prompt)
- La capacité se déclenche de manière incorrecte (affinez les conditions de déclenchement)
- Les clients reformulent leurs demandes plusieurs fois (améliorez la clarté du prompt)
- Les appels API échouent fréquemment (vérifiez la configuration de l'outil ou la stabilité de l'API)

## Exemple de capacité personnalisée : recherche d'informations produit

### Exemple de configuration d'outil

| Champ       | Valeur                                              |
|-------------|----------------------------------------------------|
| **ID**      | `LookupProductDetails`                              |
| **Description** | Récupère les détails d'un produit depuis la base de données produits |
| **Method**  | `GET`                                              |
| **URL**     | `https://api.yourdatabase.com/products`            |

### Paramètres

- `product_id` (string, *query*) – l'identifiant unique du produit

### En-têtes

- `X-API-Key: YOUR_SECURE_API_KEY`

### Extrait de prompt (annoté)

```markdown
# Product Lookup Assistant

## When to use
- ONLY call `LookupProductDetails` when the user asks about a product's 
  price, description, or features.
- Do NOT call this unless the user has provided a specific product name **or** ID.
```
👉 **Pourquoi ça fonctionne :** des limites claires empêchent l'IA d'appeler l'outil inutilement, ce qui économise des appels API et améliore la vitesse de réponse.

```markdown
## Information needed
- Before calling the tool, you MUST identify `product_id`.
- If the user only gives a name, ask for the ID.
```
👉 **Pourquoi ça fonctionne :** des exigences explicites garantissent que l'IA recueille les informations nécessaires avant de tenter l'appel API.

```markdown
## Tool parameters
- Set `product_id` to the user-provided ID.
```
👉 **Pourquoi ça fonctionne :** une correspondance simple et directe entre les données de conversation et les paramètres de l'API.

```markdown
## How to respond
- If successful: "I found **[Product Name]**. The price is **$[Price]**. 
  Description: **[Description]**."
- If not found: Apologize and suggest the user double-check the ID or browse 
  products online.
```
👉 **Pourquoi ça fonctionne :** fournir des modèles de réponse exacts (avec une mise en gras pour les variables) garantit une communication client cohérente et professionnelle.

#### Comparaison avant/après

**❌ Prompt vague :**
```
Look up products when customers ask about them.
```
**Problèmes :** Quand doit-il effectuer la recherche ? Quelles informations sont nécessaires ? Comment doit-il répondre ?

**✅ Prompt détaillé (ci-dessus) :**
Conditions de déclenchement claires, informations requises, modèles de réponse et gestion des erreurs.

### Exemple de conversation

**Client :** « Pouvez-vous me dire le prix des écouteurs sans fil bleus ? »
**IA :** « Bien sûr ! Pour être sûr d'avoir le bon produit, pouvez-vous confirmer si vous parlez des *écouteurs sans fil BlueWave* ? »
**Client :** « Oui, c'est ça. »
*(L'IA appelle `LookupProductDetails` avec `product_id` correspondant aux écouteurs sans fil BlueWave)*
**IA :** « Parfait ! Les *écouteurs sans fil BlueWave* sont au prix de **89,99 $**. Ils offrent 20 heures d'autonomie de batterie et sont fournis avec une garantie de deux ans. »

### Variante : associer la recherche à l'URL actuelle du visiteur

Lorsqu'un employé IA répond sur **Web Chat**, il reçoit l'URL de la page sur laquelle se trouve le visiteur avec chaque message. Vous pouvez combiner ce contexte avec une capacité de recherche pour que l'IA réponde à des questions vagues (« est-ce encore disponible ? », « quel est le prix ? ») sans avoir besoin de demander de quel article le visiteur parle.

Ce modèle est particulièrement puissant pour les entreprises disposant d'URL structurées : pages de produits e-commerce, inventaire de véhicules, annonces immobilières, pages de services, et ainsi de suite.

**Extrait de prompt — étendre la capacité de recherche avec l'analyse d'URL :**

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
Pour l'AI Chat Receptionist, consultez [Rendre les réponses sensibles à la page grâce à l'URL du visiteur](../ai-workforce/ai-chat-receptionist/index.md#make-responses-page-aware-with-the-visitors-url) pour une présentation plus large de cette fonctionnalité.
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Vous découvrez le fonctionnement des employés IA ? Suivez le cours <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> dans Vendasta Learn — Débutant, 6 leçons.
  </span>
</div>
