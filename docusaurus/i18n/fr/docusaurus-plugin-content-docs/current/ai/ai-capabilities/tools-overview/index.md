---
title: Outils IA  
sidebar_label: Outils IA 
sidebar_position: 1
description: Les outils permettent aux employés IA d'interagir avec des systèmes externes, de récupérer des informations en temps réel et d'automatiser des flux de travail sur différentes plateformes. Découvrez comment fonctionnent les outils, leurs composants et quand créer des outils personnalisés pour étendre les capacités de votre IA.
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

Les outils permettent à vos employés IA d'interagir avec des systèmes externes, de récupérer des informations en temps réel et d'automatiser des flux de travail sur différentes plateformes. Comprendre le fonctionnement des outils est essentiel pour créer des capacités IA puissantes qui vont au-delà d'une simple conversation.

## Que sont les outils?

Un **outil** est une fonction ou une API qu'un employé IA peut utiliser. Les outils connectent l'IA à des systèmes logiciels pour :

- La récupération de données en temps réel
- Des actions automatisées sur différentes plateformes
- Des réponses dynamiques basées sur des informations externes

:::note Exemple
Un réceptionniste IA pour une entreprise de bricolage utilise un outil API météo lors de la réservation d'un « nettoyage de gouttières cette semaine » pour vérifier si les conditions extérieures sont adaptées avant de confirmer les rendez-vous.
:::


### API et outils

Les outils et les API travaillent ensemble pour permettre aux employés IA d'interagir avec des systèmes logiciels. Alors que les API fournissent la fonctionnalité brute pour connecter les systèmes, les outils fournissent la couche d'intelligence qui indique à l'IA quand et comment utiliser ces API efficacement.

Les **API** fournissent des fonctionnalités; les **outils** indiquent à l'IA comment utiliser les API en définissant :
- Quand utiliser l'API
- Comment formater les requêtes
- La gestion de l'authentification

## Composants d'un outil

Chaque outil comprend quatre composants clés qui indiquent à l'employé IA comment utiliser l'API. Ces composants *ne* nécessitent *pas* une compréhension approfondie du code, mais vous devrez consulter la documentation de l'API pour les remplir correctement.

<img src={require('./img/main-tool-components.png').default} alt="The four main tool components" style={{width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Description

La description est une courte phrase qui indique à l'IA quand utiliser l'outil et ce qu'il accomplit. En étant précis sur les déclencheurs et les résultats commerciaux, vous aidez l'IA à comprendre quand utiliser l'outil et à quoi s'attendre dans la réponse.

:::note Exemple
« À utiliser avant de réserver des rendez-vous extérieurs pour vérifier les conditions météorologiques par sécurité. »
:::

<img src={require('./img/tool-description-example.png').default} alt="Tool description example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Méthode et URL

Le point de terminaison API spécifique (adresse web) et la méthode HTTP qui indiquent à l'API quelle action effectuer. 

<img src={require('./img/tool-method-url-example.png').default} alt="Tool method and URL example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

| Méthode | Objectif standard | Exemple de cas d'utilisation |
|--------|----------------|------------------|
| **GET** | Récupérer des ressources | Rechercher des informations client |
| **POST** | Créer de nouvelles ressources | Créer un nouveau client |
| **PUT/PATCH** | Mettre à jour des ressources existantes | Mettre à jour les informations client |
| **DELETE** | Supprimer des ressources | Supprimer un client |

:::info
La méthode et l'URL que vous utilisez sont déterminées par le créateur de l'API. Bien que connaître les méthodes courantes et leurs objectifs vous aidera à comprendre comment configurer un outil et confirmer qu'il est correctement configuré, vous devrez vous référer à la documentation de l'API pour la méthode et l'URL spécifiques à utiliser.
:::

### En-têtes

Les en-têtes fournissent des métadonnées essentielles pour les requêtes API, y compris l'authentification et les informations sur le type de contenu. Ils sont envoyés avec chaque appel API et garantissent une communication sécurisée et correctement formatée.

**Les en-têtes courants incluent :**
- `Authorization: Bearer YOUR_API_KEY` - Prouve votre identité et vos permissions
- `Content-Type: application/json` - Spécifie le format des données envoyées

<img src={require('./img/tool-header-example.png').default} alt="Tool headers example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Paramètres

Les paramètres définissent les données spécifiques envoyées à l'API. Il y a un certain nombre de champs que vous devrez remplir pour configurer un paramètre afin que l'IA puisse l'utiliser correctement, mais beaucoup d'entre eux ne nécessitent pas une compréhension approfondie du code.

<img src={require('./img/tool-parameter-example.png').default} alt="Tool parameters example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

#### Emplacement du paramètre

Les outils permettent d'envoyer des données à l'API à deux emplacements : **Body** (corps) et **Query** (requête). Choisissez l'emplacement qui correspond à la documentation de l'API. 

| Emplacement | Signification | Utilisation typique | Exemple |
|----------|----------------|-------------|---------|
| **Body** | Inclus dans la charge utile de la requête | La plupart des requêtes POST/PUT/PATCH | Corps JSON comme `{ "email": "user@example.com" }` |
| **Query** | Ajouté à l'URL comme chaîne de requête | Filtrage, pagination, recherche | `/contacts?limit=25&sort=createdAt` |

#### Type de paramètre 

Le type de paramètre est le type de données attendu pour le paramètre. Cela permet de s'assurer que la valeur envoyée à l'API est dans le bon format et que l'IA est capable de la remplir correctement. Les outils prennent en charge les principaux types de données fondamentaux dans les API REST ou basées sur JSON modernes, comme indiqué dans le tableau ci-dessous.

| Type | Ce que l'API attend | Exemple de valeur | Remarques |
|------|----------------------|---------------|-------|
| **String** | Texte | `"hello world"` | |
| **Number** | Décimal/flottant | `12.5` | Pour les prix, les mesures |
| **Integer** | Nombre entier | `42` | Pour les comptages, les ID lorsqu'ils sont numériques |
| **Boolean** | Vrai/faux | `true` | Indicateurs de fonctionnalité, bascules |
| **Enum** | Une des chaînes autorisées | `"open"` | Définissez les options autorisées |
| **Object** | Structure clé/valeur | `{ "id": "123", "name": "Acme" }` | Ajoutez des champs sous le paramètre |
| **Array** | Liste ordonnée | `["a", "b"]` ou `[{...},{...}]` | Choisissez le type d'élément (String, Object, etc.) |

:::note Remplir les paramètres Object et Array
Pour les objets et les tableaux, vous serez invité à définir la structure interne afin que l'IA puisse remplir chaque champ correctement. Les champs à l'intérieur de l'objet ou du tableau sont remplis de manière similaire à un paramètre normal.

<img src={require('./img/tool-nested-object-fields.png').default} alt="Object and array parameter example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
:::

#### Case à cocher « Requis » du paramètre

La case à cocher `Required` est utilisée pour indiquer si le paramètre est requis pour que l'API fonctionne correctement. Si le paramètre **est** requis, l'IA utilisera toujours cet outil avec une valeur remplie. 

Certaines API exigent que certains paramètres soient remplis pour fonctionner correctement. Vérifiez toujours la documentation de l'API pour confirmer si un paramètre est requis afin de pouvoir le configurer correctement.


:::tip Exiger des paramètres pour un comportement cohérent
Bien qu'un paramètre puisse **ne pas** être requis pour que l'API fonctionne correctement, vous pouvez le rendre requis pour un comportement cohérent dans votre employé IA. 
:::

:::info Paramètres requis dans les objets et les tableaux
Bien que les objets et les tableaux puissent ne pas être requis par l'API, s'ils sont présents, ils peuvent eux-mêmes avoir des champs requis. Par exemple, une commande peut ne pas être tenue d'inclure un client, mais l'objet client lui-même peut nécessiter des champs comme un nom ou une adresse e-mail.

Ce comportement est pris en charge en laissant l'« Object » ou l'« Array » marqué comme non requis, mais en marquant les champs requis eux-mêmes comme requis.

<img src={require('./img/tool-object-requirements.png').default} alt="Object and array parameter example showing required fields" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
:::


#### Description du paramètre

La description du paramètre indique à l'IA ce qu'est le paramètre et comment le remplir. Cela peut inclure :
- d'où provient la valeur (message de l'utilisateur, contexte de la conversation, etc.)
- des règles de validation et des exigences de format (par exemple « doit être une adresse e-mail valide », « doit être un nombre entre 1 et 100 », etc.)
- des instructions de secours pour les informations manquantes

Un exemple de description de paramètre détaillée pourrait être :
``` 
« La date du rendez-vous demandée par l'utilisateur. Elle doit être au format AAAA-MM-JJ. Il peut être nécessaire de demander la date à l'utilisateur si elle n'est pas fournie. »
```
<img src={require('./img/tool-parameter-description-example.png').default} alt="Parameter description example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

#### Case à cocher « Défini par l'IA » du paramètre

Bien que vous souhaitiez souvent que l'IA remplisse dynamiquement la valeur du paramètre en fonction du contexte de la conversation, il y a des moments où vous voudrez définir une valeur fixe. Vous pouvez le faire en désactivant la case à cocher `Set by AI`.

Avec `Set by AI` désactivé, vous devrez remplir le champ `Value` avec la valeur fixe que vous souhaitez utiliser.

<img src={require('./img/tool-set-by-ai-example.png').default} alt="Parameter set by AI checkbox example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

| Type | Description | Exemple |
|------|--------------|----------|
| Set by AI | Valeurs dynamiques provenant de l'utilisateur ou du contexte de la conversation | « La date du rendez-vous demandée par l'utilisateur. Elle doit être au format AAAA-MM-JJ. Il peut être nécessaire de demander la date à l'utilisateur si elle n'est pas fournie. » |
| Fixed value | Constantes requises par l'API, indicateurs de fonctionnalité ou modes par défaut | `"2025-01-01"` |

## Quand créer des outils personnalisés

Créez des outils personnalisés lorsque les employés IA doivent :
- Vérifier l'inventaire ou la disponibilité des produits en temps réel
- Planifier des rendez-vous dans des calendriers externes
- Rechercher le statut des commandes à partir de plateformes de commerce électronique
- Accéder aux informations du compte client
- S'intégrer à des systèmes commerciaux spécialisés
- Automatiser des flux de travail spécifiques à votre secteur

:::tip Prêt à créer?
Maintenant que vous comprenez ce que sont les outils et comment ils fonctionnent, suivez notre tutoriel étape par étape pour créer votre premier outil personnalisé : [Créer des outils personnalisés](./building-custom-tools)
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Vous êtes nouveau dans l'embauche et la gestion d'un employé IA? Suivez le cours <a href="/learn/ai-workforce" style={{color: '#3C9A63', fontWeight: 600}}>Embauchez votre premier employé IA</a> dans Vendasta Learn — Débutant à intermédiaire, 7 leçons.
  </span>
</div>
