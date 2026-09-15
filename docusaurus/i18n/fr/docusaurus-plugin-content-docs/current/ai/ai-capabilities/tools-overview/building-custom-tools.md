---
title: Créer des outils personnalisés
sidebar_label: "Tutoriel : créer des outils personnalisés"
sidebar_position: 2
description: Guide étape par étape pour créer des outils personnalisés à l'aide de la documentation API, incluant les meilleures pratiques et des conseils de dépannage
---

import { AISparkleIcon } from '@site/src/components/Icons';

Ce guide complet vous accompagne tout au long du processus de création d'outils personnalisés pour vos employés IA. Vous apprendrez à trouver la documentation API, à utiliser la fonctionnalité d'importation cURL, à travailler avec des assistants IA et à tester vos outils efficacement.

:::info Avant de commencer
Si vous êtes nouveau avec les employés IA et les capacités, commencez par la [Vue d'ensemble de l'IA](../../../ai/) pour comprendre les concepts généraux avant de vous lancer dans ce tutoriel.
:::

## Prérequis

Avant de commencer, assurez-vous d'avoir :
- Accès à la documentation API du système externe
- Des identifiants API valides ou des jetons d'authentification
- Une compréhension claire du processus commercial que vous voulez automatiser
- Une familiarité de base avec les concepts d'API (URL, méthodes, paramètres)

## Aperçu du processus

Créer un outil personnalisé implique ces étapes clés :

1. **Préparation** : Trouver et comprendre la documentation API
2. **Utiliser les principes clés** : Suivre les meilleures pratiques pour créer des outils
3. **Importation avec cURL** : Utiliser la fonctionnalité d'importation cURL pour accélérer la configuration
4. **Travailler avec l'IA** : Tirer parti des assistants IA pour remplir les détails de l'outil
5. **Test** : Vérifier que votre outil fonctionne correctement
6. **Dépannage** : Résoudre les problèmes courants

Passons en revue chaque étape en détail.

## Étape 1 : préparation - trouver et comprendre la documentation API

Avant de commencer à créer votre outil, vous devez localiser et comprendre la documentation API du service que vous voulez intégrer.

### Comment localiser la documentation API

La plupart des services fournissent une documentation API à l'un de ces emplacements :

- **Portail développeur** : Cherchez une section « Developer » ou « API » sur le site web du service
- **Centre de documentation** : De nombreux services ont des sites de documentation dédiés (par exemple, `developers.service.com`)
- **Référence API** : Vérifiez le pied de page ou la navigation du site principal pour des liens « API » ou « Developers »
- **GitHub** : Certains services hébergent leur documentation API sur des dépôts GitHub

:::tip
Si vous ne trouvez pas la documentation API, cherchez « [Nom du service] API documentation » ou « [Nom du service] developer docs » dans votre moteur de recherche.
:::

### Lire efficacement la documentation API

La documentation API peut être accablante, mais se concentrer sur ces sections clés vous aidera :

**1. Section d'authentification**
- Comment obtenir des clés ou jetons API
- Où inclure l'authentification (en-têtes, paramètres de requête, etc.)
- Expiration des jetons et processus de renouvellement

**2. Points de terminaison/ressources**
- Liste des points de terminaison API disponibles
- Méthodes HTTP (GET, POST, PUT, DELETE) pour chaque point de terminaison
- URL de base et chemins des points de terminaison

**3. Exemples de requêtes**
- Exemples de requêtes montrant les paramètres requis
- Exemples de commandes cURL
- Formats du corps de la requête (JSON, XML, etc.)

**4. Exemples de réponses**
- À quoi ressemblent les réponses réussies
- Formats des réponses d'erreur
- Codes de statut et leur signification

### Identifier les bons points de terminaison pour vos besoins

Lors de l'examen de la documentation API, posez-vous ces questions :

- **Quelle action dois-je effectuer?** (Créer, lire, mettre à jour, supprimer)
- **Quelles données dois-je envoyer?** (Infos client, détails de commande, etc.)
- **Quelles données dois-je recevoir?** (Confirmation, statut, détails, etc.)

Associez vos besoins au point de terminaison approprié :

| Votre besoin | Cherchez |
|-----------|----------|
| Consulter les informations client | Point de terminaison GET avec ID client |
| Créer une nouvelle commande | Point de terminaison POST pour les commandes |
| Vérifier le statut d'une commande | Point de terminaison GET qui retourne les détails de la commande |
| Mettre à jour l'heure d'un rendez-vous | Point de terminaison PUT/PATCH pour les rendez-vous |

### Comprendre les exigences d'authentification

La plupart des API nécessitent une authentification. Les méthodes courantes incluent :

**Authentification par clé API**
- Généralement envoyée comme en-tête : `Authorization: Bearer YOUR_API_KEY`
- Ou comme paramètre de requête : `?api_key=YOUR_API_KEY`

**OAuth 2.0**
- Nécessite d'obtenir d'abord un jeton d'accès
- Le jeton est ensuite envoyé dans les en-têtes : `Authorization: Bearer ACCESS_TOKEN`

**Authentification de base**
- Nom d'utilisateur et mot de passe encodés dans l'en-tête
- Format : `Authorization: Basic base64(username:password)`

**Exemple de configuration d'authentification :**
```bash
# Clé API dans l'en-tête
curl -X GET "https://api.example.com/customers" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Clé API dans le paramètre de requête
curl -X GET "https://api.example.com/customers?api_key=YOUR_API_KEY"
```

:::warning
Gardez toujours vos clés API sécurisées. Ne les partagez jamais dans des captures d'écran. Utilisez des variables d'environnement ou un stockage sécurisé des identifiants.
:::

### Conseils pour naviguer dans les formats courants de documentation API

Différents services organisent leur documentation différemment :

**Documentation d'API REST**
- Généralement organisée par ressource (Users, Orders, Products)
- Points de terminaison regroupés sous chaque ressource
- Séparation claire entre les formats de requête et de réponse

**Documentation OpenAPI/Swagger**
- Documentation interactive avec fonctionnalités « Try it out »
- Inclut souvent des commandes cURL générées automatiquement
- Peut exporter des exemples directement

**Documentation GraphQL**
- Se concentre sur les requêtes et mutations
- Utilise un explorateur de schéma pour comprendre les champs disponibles
- Structure différente des API REST

## Étape 2 : principes clés pour créer des outils

Suivre ces principes vous aidera à créer des outils fiables et efficaces :

### Tirer parti des assistants IA pour vous aider

Les assistants IA comme ChatGPT, Claude, ou même le support IA de Vendasta peuvent vous aider à :

- **Comprendre une documentation API complexe**
  - Demandez : « Explique ce point de terminaison API en termes simples »
  - Obtenez des clarifications sur les méthodes d'authentification
  - Comprenez les exigences des paramètres

- **Générer des descriptions de paramètres**
  - Fournissez du contexte sur votre cas d'utilisation
  - Demandez des descriptions spécifiques et exploitables
  - Obtenez des exemples de bonnes descriptions de paramètres

- **Convertir des exemples API en cURL**
  - Collez des exemples de la documentation API
  - Demandez à l'IA de convertir au format cURL
  - Obtenez de l'aide avec les en-têtes d'authentification

**Exemples d'invites IA :**
```
« Je crée un outil pour vérifier l'inventaire. Le point de terminaison API est 
GET /api/v1/products/{productId}/inventory. Aide-moi à écrire une 
description claire pour le paramètre productId qui indique à l'IA 
comment l'extraire des messages des clients. »
```

### Utiliser la fonctionnalité d'importation cURL dans Vendasta

La fonctionnalité d'importation cURL remplit automatiquement :
- La méthode HTTP (GET, POST, etc.)
- L'URL du point de terminaison API
- Les en-têtes (y compris l'authentification)
- Les paramètres de requête
- La structure du corps de la requête

Cela permet d'économiser du temps et de réduire les erreurs. Nous couvrirons cela en détail dans la section suivante.

### Réviser et rédiger manuellement les descriptions (la partie la plus importante)

Bien que l'importation cURL gère la configuration technique, **les descriptions de paramètres sont essentielles** pour que l'IA utilise votre outil correctement.

**Ce qui est rempli automatiquement :**
- Noms des paramètres
- Types de paramètres (String, Number, etc.)
- Emplacements des paramètres (Query, Body, Path)

**Ce que vous devez faire manuellement :**
- Rédiger des descriptions claires pour chaque paramètre
- Préciser d'où l'IA doit obtenir la valeur (message de l'utilisateur, contexte de la conversation, etc.)
- Ajouter des règles de validation et des exigences de format
- Définir quoi faire si l'information est manquante

**Exemple d'une bonne description de paramètre :**
```
Paramètre : order_number
Description : Le numéro de commande extrait du message du client. 
Les numéros de commande comptent généralement 8 à 10 chiffres et peuvent inclure des lettres. 
```

**Exemple d'une description de paramètre qui pourrait être améliorée :**
```
Paramètre : order_number
Description : Le numéro de commande
```

La première description indique exactement à l'IA ce qu'est le paramètre; la seconde ne fournit pas assez de contexte.

## Étape 3 : utiliser la fonctionnalité d'importation cURL

La fonctionnalité d'importation cURL est l'un des moyens les plus rapides de configurer un nouvel outil. Elle extrait automatiquement la configuration API à partir d'une commande cURL.

### Qu'est-ce qu'une commande cURL?

cURL (Client URL) est un outil en ligne de commande pour effectuer des requêtes HTTP. Il est couramment utilisé pour tester les API et est souvent fourni dans la documentation API comme exemple de code.

**Exemple de commande cURL :**
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

Cette commande :
- Effectue une requête POST vers le point de terminaison des commandes
- Inclut un en-tête d'autorisation
- Envoie des données JSON dans le corps de la requête

### Comment obtenir une commande cURL à partir d'une URL API avec l'IA

Si la documentation API ne fournit pas d'exemples cURL, vous pouvez demander à l'IA d'en générer une :

**Étape 1 :** Fournissez les détails de la documentation API :
```
« J'ai besoin d'une commande cURL pour ce point de terminaison API :
- Méthode : POST
- URL : https://api.example.com/appointments
- En-têtes : Authorization: Bearer TOKEN, Content-Type: application/json
- Corps : { "date": "2024-01-15", "time": "14:00", "customer_id": "123" }"
```

**Étape 2 :** L'IA générera une commande cURL :
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

**Étape 3 :** Copiez la commande cURL générée et utilisez-la avec `Generate from cURL` dans Vendasta.

### Étape par étape : générer un outil à partir d'une commande cURL dans Vendasta

**1. Accéder à la configuration de l'outil**
   - Naviguez vers <AISparkleIcon /> `AI` → `Workforce` dans votre tableau de bord Business App
   - Sélectionnez l'employé IA que vous voulez améliorer
   - Cliquez sur `Configure` → `Capabilities`
   - Cliquez sur `+ Add a capability`
   - Choisissez `+ New capability`

**2. Ajouter un outil**
   - Cliquez sur `+ New tool` dans votre capacité
   - Sélectionnez `Generate from cURL`

**3. Coller votre commande cURL**
   - Copiez la commande cURL depuis la documentation API ou l'exemple généré par l'IA
   - Collez-la dans le champ `Generate from cURL`
   - Remplacez les valeurs d'espace réservé (comme `YOUR_API_KEY`) par des valeurs réelles ou des variables

**4. Réviser les champs remplis automatiquement**
   - Le système extrait automatiquement :
     - La méthode HTTP (GET, POST, etc.)
     - L'URL/point de terminaison
     - Les en-têtes
     - Les paramètres de requête
     - Les paramètres et la structure du corps

**5. Compléter la configuration manuelle**
   - Remplissez le champ `Name` (nom unique, sans espaces)
   - Rédigez une `Description` claire indiquant quand utiliser cet outil
   - Révisez et améliorez les descriptions de paramètres (étape critique!)

### Ce qui est rempli automatiquement et ce qui nécessite un travail manuel

**Rempli automatiquement (à partir de l'importation cURL) :**
- ✅ Méthode HTTP
- ✅ URL/point de terminaison
- ✅ En-têtes (y compris l'authentification si incluse)
- ✅ Noms des paramètres
- ✅ Types de paramètres (String, Number, Object, etc.)
- ✅ Emplacements des paramètres (Query, Body, Path)

**Nécessite un travail manuel :**
- ⚠️ **Nom de l'outil** : Choisissez un nom descriptif (sans espaces)
- ⚠️ **Description de l'outil** : Expliquez quand l'IA doit utiliser cet outil
- ⚠️ **Descriptions des paramètres** : Critique! Indiquez à l'IA comment remplir chaque paramètre
- ⚠️ **Champs requis** : Marquez les paramètres comme requis si l'API en a besoin
- ⚠️ **Valeurs fixes** : Définissez des valeurs statiques pour les paramètres qui ne changent pas
- ⚠️ **Valeurs Enum** : Définissez les options autorisées pour les paramètres de type Enum

**Exemple de ce qui nécessite un travail manuel :**
```
Paramètre rempli automatiquement :
- Nom : product_id
- Type : String
- Emplacement : Query

Amélioration manuelle nécessaire :
- Description : « Extraire l'ID du produit du message du client. 
  Les ID de produit comptent généralement 5 à 6 chiffres. Si le client mentionne 
  un nom de produit à la place, demandez une clarification ou recherchez l'ID 
  du produit dans votre base de connaissances. »
- Requis : ✓ (cochez cette case)
```

### Problèmes courants et comment les résoudre

**Problème : l'importation cURL échoue ou affiche des erreurs**

**Solutions :**
- Vérifiez que la commande cURL est complète et correctement formatée
- Vérifiez que tous les guillemets sont correctement fermés
- Assurez-vous que les caractères d'échappement sont corrects (`\'` pour les guillemets simples en JSON)
- Essayez de générer une nouvelle commande cURL avec l'IA ou des outils de test API

**Problème : les en-têtes ne sont pas importés correctement**

**Solutions :**
- Ajoutez manuellement les en-têtes manquants après l'importation
- Vérifiez que le format des en-têtes correspond aux exigences de l'API
- Vérifiez les fautes de frappe dans les noms d'en-têtes

**Problème : les paramètres du corps ne sont pas structurés correctement**

**Solutions :**
- Vérifiez la structure JSON dans la commande cURL
- Ajustez manuellement les objets ou tableaux imbriqués si nécessaire
- Vérifiez que les types de paramètres correspondent aux attentes de l'API

## Étape 4 : travailler avec l'IA pour remplir les outils

Les assistants IA peuvent considérablement accélérer la création d'outils en vous aidant à rédiger des descriptions de paramètres efficaces et à comprendre des exigences API complexes.

### Utiliser des captures d'écran comme contexte pour l'IA

Les captures d'écran sont des outils utiles pour obtenir l'assistance de l'IA :

**1. Capturer des captures d'écran de la documentation API**
   - Prenez des captures d'écran de la documentation des points de terminaison
   - Incluez les tableaux de paramètres et les exemples
   - Capturez les instructions de configuration de l'authentification

**2. Fournir du contexte à l'IA**
   - Téléversez des captures d'écran avec vos questions
   - Expliquez ce que vous essayez de créer
   - Posez des questions spécifiques sur la documentation

**Exemple d'invite avec capture d'écran :**
```
« Je crée un outil pour vérifier l'inventaire. Voici la documentation API 
pour le point de terminaison. Aide-moi à rédiger des descriptions de paramètres qui indiquent à 
l'IA comment extraire les ID de produit des messages des clients et gérer les cas 
où le produit n'est pas trouvé. »
[Joindre une capture d'écran de la documentation API]
```

### Demander à l'IA d'aider à rédiger des descriptions de paramètres

De bonnes descriptions de paramètres sont essentielles pour que l'IA utilise votre outil correctement. L'IA peut vous aider à rédiger des descriptions efficaces.

**Fournir du contexte :**
- Ce que représente le paramètre
- D'où provient la valeur (message de l'utilisateur, contexte de la conversation)
- Exigences de format (par exemple, « nombre à 8-10 chiffres »)
- Quoi faire si la valeur est manquante

**Exemple d'invite :**
```
« Aide-moi à rédiger une description de paramètre pour 'appointment_date'. 
L'IA doit extraire les dates des messages des clients comme 'mardi prochain' 
ou '15 janvier'. Si le client ne fournit pas de date, l'IA doit 
demander une clarification. Les dates doivent être formatées comme AAAA-MM-JJ. »
```

**Description générée par l'IA :**
```
Extraire la date du rendez-vous du message du client. La date peut être 
exprimée sous différents formats (par exemple, 'mardi prochain', '15 janvier', '2024-01-15'). 
Convertir les dates relatives (comme 'mardi prochain') en dates spécifiques. Si le client 
ne fournit pas de date, demandez : « Quelle date vous conviendrait le mieux? » Formatez la 
date finale comme AAAA-MM-JJ avant de l'envoyer à l'API.
```

### Amélioration itérative des descriptions

Ne vous attendez pas à des descriptions parfaites du premier coup. Améliorez-les en fonction de :

**1. Résultats des tests**
   - Passez en revue comment l'IA utilise l'outil dans les conversations
   - Vérifiez la fonctionnalité Explanation pour voir les valeurs des paramètres
   - Identifiez où les descriptions ont besoin de plus de clarté

**2. Cas particuliers**
   - Demandez à l'IA de suggérer des cas particuliers que vous auriez pu manquer
   - Mettez à jour les descriptions pour gérer les scénarios inhabituels
   - Ajoutez des instructions de secours pour les informations manquantes

**3. Utilisation réelle**
   - Surveillez les vraies conversations avec les clients
   - Notez quand l'outil ne se déclenche pas correctement
   - Affinez les descriptions en fonction des malentendus courants

**Exemple de processus d'amélioration :**
```
Description initiale :
« Obtenir l'adresse e-mail du client. »

Après les tests, description affinée :
« Extraire l'adresse e-mail du client depuis son message. Les adresses e-mail 
doivent être dans un format valide (utilisateur@domaine.com). Si le client ne 
fournit pas d'e-mail, demandez : 'Pourriez-vous partager votre adresse e-mail pour que nous puissions vous envoyer 
une confirmation?' »
```

### S'assurer que l'IA inclut des options de variables spécifiques (pas de conseils génériques)

Les assistants IA fournissent parfois des conseils génériques. Insistez pour obtenir des descriptions spécifiques et exploitables.

**Générique (pas utile) :**
```
« Obtenir l'ID du produit auprès de l'utilisateur. »
```

**Spécifique (utile) :**
```
« Extraire l'ID du produit du message du client. Les ID de produit sont des nombres 
à 5-6 chiffres commençant par 'PRD'. Si le client mentionne un nom de produit 
(par exemple, 'Widget bleu'), demandez d'abord : 'Quel produit vous intéresse?' 
et fournissez des options, ou recherchez l'ID du produit dans votre base de connaissances. 
Ne devinez jamais les ID de produit. »
```

**Conseils pour obtenir des descriptions spécifiques :**
- Fournissez des exemples de messages de clients
- Précisez les formats exacts et les règles de validation
- Incluez des instructions pour les informations manquantes
- Mentionnez les cas particuliers et comment les gérer

### Meilleures pratiques pour la création d'outils assistée par IA

**1. Commencer avec un contexte clair**
   - Expliquez votre cas d'utilisation commercial
   - Fournissez la documentation API pertinente
   - Partagez des exemples d'interactions avec les clients

**2. Poser des questions spécifiques**
   - « Comment l'IA doit-elle extraire le numéro de commande? »
   - « Que doit faire l'IA si la date est manquante? »
   - « Quel format les numéros de téléphone doivent-ils utiliser? »

**3. Réviser et personnaliser les suggestions de l'IA**
   - N'utilisez pas les descriptions générées par l'IA telles quelles
   - Adaptez-les à vos besoins spécifiques
   - Ajoutez du contexte spécifique à votre entreprise

**4. Tester et itérer**
   - Utilisez les suggestions de l'IA comme point de départ
   - Testez avec de vraies conversations
   - Affinez en fonction des résultats

## Étape 5 : tester vos outils

Des tests approfondis garantissent que vos outils fonctionnent correctement et offrent une bonne expérience client.

### Comment tester les outils dans les conversations

**1. Démarrer une conversation test**
   - Naviguez vers l'interface de discussion de votre employé IA
   - Utilisez une session de navigateur privée (mode incognito) pour éviter le report du contexte
   - Essayez différentes formulations qui devraient déclencher votre outil

**2. Tester différents scénarios**
   - **Cas idéal** : le client fournit toutes les informations requises
   - **Informations manquantes** : le client ne fournit pas les paramètres requis
   - **Mauvais format** : le client fournit des informations dans un format inattendu
   - **Cas particuliers** : demandes inhabituelles ou conditions d'erreur

**Exemples de scénarios de test :**
```
Test 1 : « Vérifiez le statut de la commande 12345 »
Attendu : l'outil se déclenche, récupère le statut de la commande

Test 2 : « Quel est le statut de ma commande? »
Attendu : l'IA demande le numéro de commande avant d'utiliser l'outil

Test 3 : « Vérifiez la commande abc123xyz »
Attendu : l'IA gère élégamment un format de numéro de commande invalide
```

### Vérifier le remplissage correct des paramètres

**1. Utiliser la fonctionnalité Explanation**
   - Dans Conversations, cliquez sur `Explanation` sous un message
   - Passez en revue le raisonnement de l'IA pour utiliser l'outil
   - Vérifiez les valeurs de paramètres réelles envoyées à l'API

**2. Vérifier les valeurs de paramètres**
   - Vérifiez que les paramètres sont extraits correctement des messages des clients
   - Assurez-vous que les types de données correspondent aux exigences de l'API
   - Vérifiez que les paramètres requis sont présents

**3. Comparer avec les attentes de l'API**
   - Passez en revue les paramètres réels de l'appel API
   - Comparez avec les exigences de la documentation API
   - Assurez-vous que les en-têtes et l'authentification sont corrects

### Déboguer les problèmes courants

**Problème : l'outil ne se déclenche pas**

**Étapes de débogage :**
1. Vérifiez la description de l'outil - est-elle assez spécifique?
2. Vérifiez que la capacité est activée pour votre employé IA
3. Passez en revue l'Explanation pour voir si l'IA a envisagé l'outil
4. Testez avec différentes formulations

**Problème : mauvaises valeurs de paramètres**

**Étapes de débogage :**
1. Passez en revue les descriptions de paramètres pour la clarté
2. Vérifiez l'Explanation pour voir comment l'IA a extrait les valeurs
3. Testez avec des valeurs connues pour isoler le problème
4. Affinez les descriptions de paramètres en fonction des résultats

**Problème : l'appel API échoue**

**Étapes de débogage :**
1. Passez en revue l'Explanation pour voir l'appel API exact
2. Testez l'appel API indépendamment (Postman, cURL)
3. Vérifiez que les en-têtes d'authentification sont corrects
4. Vérifiez les limites de taux ou erreurs de l'API

### Itération et amélioration

**1. Documenter les problèmes**
   - Gardez des notes sur ce qui ne fonctionne pas
   - Enregistrez les messages des clients qui causent des problèmes
   - Notez les erreurs API et leurs causes

**2. Apporter des changements progressifs**
   - Changez une chose à la fois
   - Testez chaque changement avant d'en faire un autre
   - Annulez les changements qui n'aident pas

**3. Surveiller l'utilisation réelle**
   - Passez en revue les conversations où l'outil a été utilisé
   - Cherchez des tendances dans les échecs
   - Identifiez les malentendus courants

**4. Amélioration continue**
   - Mettez à jour les descriptions de paramètres en fonction de l'utilisation réelle
   - Ajustez les descriptions d'outils pour améliorer le déclenchement
   - Affinez la gestion des erreurs en fonction des commentaires des clients

## Étape 6 : dépannage

Même avec une planification minutieuse, vous pourriez rencontrer des problèmes. Voici comment résoudre les problèmes courants.

### Problèmes courants et solutions

#### L'outil ne se déclenche jamais

**Symptômes :**
- L'IA n'utilise pas l'outil quand elle le devrait
- Les demandes des clients ne sont pas traitées

**Causes possibles et solutions :**

**1. Description trop vague**
   - **Solution :** Rendez la description de l'outil plus spécifique sur quand l'utiliser
   - **Exemple :** Au lieu de « Vérifier les commandes », utilisez « UTILISER CET OUTIL UNIQUEMENT quand le client demande le statut, le suivi ou la confirmation de livraison d'une commande »

**2. Capacité non activée**
   - **Solution :** Vérifiez que la capacité est assignée à votre employé IA
   - Vérifiez : onglet `Workforce` → `Configure` → `Capabilities`

**3. Capacités en conflit**
   - **Solution :** Passez en revue les autres capacités qui pourraient gérer la même demande
   - Affinez les conditions de déclenchement pour être plus spécifiques

**4. Contexte manquant**
   - **Solution :** Assurez-vous que les informations requises sont disponibles dans la conversation
   - Vérifiez si l'IA a accès aux données nécessaires

#### L'authentification API échoue

**Symptômes :**
- L'API renvoie des erreurs 401 (Unauthorized) ou 403 (Forbidden)
- Les appels d'outil échouent avec des erreurs d'authentification

**Causes possibles et solutions :**

**1. Clé API invalide**
   - **Solution :** Vérifiez que votre clé API est correcte et active
   - Vérifiez si la clé a expiré ou a été révoquée
   - Générez une nouvelle clé si nécessaire

**2. Mauvais format d'en-tête**
   - **Solution :** Vérifiez que le format de l'en-tête d'authentification correspond aux exigences de l'API
   - Formats courants :
     - `Authorization: Bearer YOUR_TOKEN`
     - `Authorization: Basic base64(username:password)`
     - `X-API-Key: YOUR_API_KEY`

**3. Authentification manquante**
   - **Solution :** Assurez-vous que les en-têtes d'authentification sont inclus dans la configuration de l'outil
   - Vérifiez que les en-têtes sont définis comme valeurs fixes, pas dynamiques

**4. Clé API au mauvais endroit**
   - **Solution :** Vérifiez si l'API attend la clé dans :
     - Les en-têtes (le plus courant)
     - Les paramètres de requête (`?api_key=...`)
     - Le corps de la requête

#### Problèmes de mappage de paramètres

**Symptômes :**
- De mauvaises valeurs envoyées à l'API
- Paramètres manquants ou incorrects
- L'API renvoie des erreurs sur des paramètres invalides

**Causes possibles et solutions :**

**1. Descriptions de paramètres peu claires**
   - **Solution :** Rédigez des descriptions plus spécifiques
   - Incluez les exigences de format et des exemples
   - Précisez d'où obtenir la valeur

**2. Non-correspondance de type de paramètre**
   - **Solution :** Vérifiez que les types de paramètres correspondent aux exigences de l'API
   - Vérifiez si l'API attend String vs Number
   - Assurez-vous que les tableaux/objets sont structurés correctement

**3. Paramètres requis manquants**
   - **Solution :** Marquez les paramètres requis dans la configuration de l'outil
   - Mettez à jour les descriptions pour vous assurer que l'IA recueille les informations requises
   - Ajoutez une validation dans les descriptions de paramètres

**4. Mauvais emplacement de paramètre**
   - **Solution :** Vérifiez que les paramètres sont au bon endroit :
     - Paramètres de requête pour les requêtes GET
     - Paramètres du corps pour les requêtes POST/PUT
     - Paramètres de chemin dans l'URL

#### L'outil se déclenche incorrectement

**Symptômes :**
- L'outil s'active quand il ne le devrait pas
- Faux positifs dans les conversations avec les clients

**Causes possibles et solutions :**

**1. Description trop large**
   - **Solution :** Ajoutez des conditions de déclenchement plus spécifiques
   - Utilisez un langage « UNIQUEMENT » et « PAS » pour établir des limites
   - **Exemple :** « UTILISER UNIQUEMENT quand le client demande le statut d'une commande. NE PAS utiliser pour des questions sur les produits ou des demandes générales. »

**2. Capacités qui se chevauchent**
   - **Solution :** Passez en revue et affinez les descriptions des capacités
   - Rendez les conditions de déclenchement plus distinctes
   - Priorisez quelle capacité doit gérer des demandes spécifiques

### Obtenir de l'aide et des ressources

**1. Passer en revue la documentation**
   - Consultez ce guide et la documentation associée
   - Passez en revue la documentation API du service que vous intégrez
   - Consultez [Vue d'ensemble des outils](./index.md) pour une compréhension conceptuelle

**2. Utiliser les assistants IA**
   - Demandez à l'IA d'aider à déboguer des problèmes spécifiques
   - Partagez les messages d'erreur et les réponses API
   - Obtenez des suggestions pour les descriptions de paramètres

**3. Tester indépendamment**
   - Utilisez Postman ou Insomnia pour tester les appels API directement
   - Vérifiez que l'API fonctionne en dehors de Vendasta
   - Isolez si les problèmes viennent de l'outil ou de l'API

**4. Vérifier la fonctionnalité Explanation**
   - Passez en revue le raisonnement de l'IA pour l'utilisation de l'outil
   - Examinez les appels et réponses API réels
   - Identifiez les tendances dans les échecs

**5. Ressources communautaires**
   - Stack Overflow pour les questions spécifiques aux API
   - Forums de développeurs spécifiques au service
   - Canaux de support Vendasta

## Résumé des meilleures pratiques

Suivez ces principes tout au long du processus de création d'outils :

**1. Toujours utiliser la documentation source**
   - Ne devinez pas les points de terminaison ou paramètres API
   - Référez-vous à la documentation API officielle
   - Vérifiez les exigences avant de créer

**2. Rédiger des descriptions claires et spécifiques**
   - Les descriptions de paramètres sont la partie la plus importante
   - Dites exactement à l'IA quoi faire, pas seulement ce qu'est le paramètre
   - Incluez les exigences de format et les instructions de secours

**3. Tester en profondeur**
   - Testez avec différentes formulations et scénarios
   - Utilisez des sessions de navigateur privées pour éviter les problèmes de contexte
   - Passez en revue les explications pour comprendre le comportement de l'IA

**4. Itérer en fonction de l'utilisation réelle**
   - Surveillez les vraies conversations avec les clients
   - Affinez les descriptions en fonction des échecs
   - Apportez des améliorations progressives

**5. Tirer parti de l'assistance IA de manière stratégique**
   - Utilisez l'IA pour comprendre une documentation complexe
   - Obtenez de l'aide pour rédiger des descriptions de paramètres
   - Ne déléguez pas les décisions de logique commerciale

## Foire aux questions (FAQ)

<details>
<summary>Dois-je être développeur pour créer des outils personnalisés?</summary>

Non, vous n'avez pas besoin d'être développeur. Bien qu'une familiarité de base avec les concepts d'API aide, la fonctionnalité d'importation cURL et les assistants IA permettent de créer des outils sans connaissances techniques approfondies. La compétence la plus importante est de rédiger des descriptions de paramètres claires qui indiquent à l'IA comment utiliser l'outil.

</details>

<details>
<summary>Que faire si je ne trouve pas de documentation API pour le service que je veux intégrer?</summary>

Si vous ne trouvez pas de documentation API officielle, essayez :
- De chercher « [Nom du service] API documentation » ou « [Nom du service] developer docs »
- De contacter l'équipe de support du service pour un accès API
- De vérifier s'ils ont un portail développeur ou un forum communautaire

Si aucune API n'existe, vous devrez peut-être utiliser une autre méthode d'intégration ou contacter le fournisseur de services.

</details>

<details>
<summary>Puis-je utiliser le même outil pour plusieurs capacités?</summary>

Oui, vous pouvez utiliser le même outil dans plusieurs capacités. Cependant, chaque capacité doit avoir sa propre invite qui définit quand et comment utiliser l'outil dans ce contexte spécifique. Cela permet au même point de terminaison API de servir différents objectifs commerciaux.

</details>

<details>
<summary>Que se passe-t-il si ma clé API expire ou change?</summary>

Si votre clé API expire ou change, vous devrez mettre à jour l'en-tête d'authentification dans la configuration de votre outil. Allez dans les paramètres de l'outil, trouvez l'en-tête Authorization, et mettez-le à jour avec la nouvelle clé. L'outil fonctionnera alors avec les nouveaux identifiants.

</details>

<details>
<summary>Comment savoir si mes descriptions de paramètres sont assez bonnes?</summary>

Testez votre outil avec différentes formulations de clients. Si l'IA :
- Extrait correctement les paramètres des messages des clients
- Demande les informations requises manquantes
- Utilise l'outil quand c'est approprié
- Gère élégamment les cas particuliers

Alors vos descriptions fonctionnent bien. Passez en revue la fonctionnalité Explanation pour voir comment l'IA interprète vos descriptions.

</details>

<details>
<summary>Puis-je créer des outils qui utilisent plusieurs points de terminaison API?</summary>

Oui, vous pouvez ajouter plusieurs outils à une seule capacité. Chaque outil peut appeler un point de terminaison API différent. L'IA utilisera l'outil approprié en fonction de la demande du client et des descriptions d'outils que vous avez rédigées.

</details>

<details>
<summary>Que dois-je faire si l'importation cURL ne fonctionne pas?</summary>

Si l'importation cURL échoue :
- Vérifiez que la commande cURL est complète et correctement formatée
- Vérifiez que tous les guillemets sont correctement fermés
- Essayez de générer une nouvelle commande cURL avec l'IA ou des outils de test API comme Postman
- Configurez manuellement l'outil si l'importation continue d'échouer

L'option de configuration manuelle vous donne un contrôle total sur tous les paramètres de l'outil.

</details>

<details>
<summary>À quelle fréquence dois-je tester et affiner mes outils?</summary>

Testez immédiatement après avoir créé un outil, puis surveillez l'utilisation réelle. Affinez les outils en fonction de :
- Appels API échoués ou erreurs
- Confusion des clients ou questions répétées
- Outils qui ne se déclenchent pas quand ils le devraient (ou qui se déclenchent incorrectement)
- Changements dans l'API ou le service que vous intégrez

Une surveillance régulière aide à détecter les problèmes avant qu'ils n'affectent trop d'interactions avec les clients.

</details>

<details>
<summary>Puis-je partager les outils que j'ai créés avec d'autres employés IA?</summary>

Oui, les capacités personnalisées (y compris leurs outils) peuvent être assignées à plusieurs employés IA. Cela vous permet de réutiliser des configurations d'outils réussies dans différents employés IA sans les reconstruire.

</details>

<details>
<summary>Quelle est la différence entre un outil et une capacité?</summary>

Un **outil** est l'implémentation technique de l'API (le « comment ») - il définit le point de terminaison API, l'authentification et les paramètres. Une **capacité** est la logique commerciale (le « quand » et le « pourquoi ») - elle inclut l'invite qui indique à l'IA quand utiliser l'outil et comment traiter les réponses. Vous avez besoin des deux : des outils pour la connexion API, et des capacités pour le comportement de l'IA.

</details>
