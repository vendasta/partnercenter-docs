---
title: Comment configurer les capacités de l'IA
sidebar_label: Configuration des capacités
sidebar_position: 2
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

Ce guide vous explique comment activer et configurer les capacités intégrées de vos employés IA. Suivez ces étapes pour mettre en place des capacités qui gèrent des tâches commerciales courantes comme la capture de prospects et la prise de rendez-vous.

## Prérequis

Avant de commencer :
- Vous avez créé un employé IA dans votre compte Business App
- Vous disposez des autorisations appropriées pour configurer les paramètres de l'IA
- Vous savez quelles capacités correspondent aux besoins de votre entreprise

## Étape 1 : Accéder à la configuration de l'employé IA

1. Accédez à <AISparkleIcon /> `AI` → `Workforce` dans votre tableau de bord Business App.
2. Repérez l'employé IA que vous voulez configurer.
3. Cliquez sur le bouton **Configure** à côté du nom de l'employé.

:::tip
Si vous ne voyez pas le bouton Configure, vérifiez que vous disposez des autorisations nécessaires pour modifier les paramètres de l'employé IA.
:::

## Étape 2 : Ouvrir la section Capacités

1. Sur la page `Configure` de l'employé IA, faites défiler jusqu'à la section `Capabilities`.
2. Cliquez pour développer la section si elle est réduite.
3. Vous verrez une liste des capacités déjà ajoutées à l'employé IA.

## Étape 3 : Ajouter les capacités souhaitées

Les capacités qui apparaissent dans la section Capabilities sont actives. Pour en ajouter une nouvelle :

1. Cliquez sur **+ Add a capability**.
2. **Consultez la description de la capacité** pour comprendre ce qu'elle fait.
3. **Ajoutez des instructions spécifiques** (facultatif) pour personnaliser le comportement de la capacité.

Pour retirer une capacité, cliquez sur le menu à trois points à côté de celle-ci et sélectionnez **Remove**.

### Configurations courantes des capacités

#### Lead Capture
- **Ce que ça fait** : Recueille automatiquement les coordonnées de clients potentiels
- **Instructions recommandées** :
  ```
  Always ask for name, email, and phone number. 
  Qualify leads by asking about budget and timeline.
  Be friendly but persistent in gathering complete information.
  ```

#### Appointment Booking
- **Ce que ça fait** : Planifie des rendez-vous en utilisant votre calendrier connecté
- **Prérequis** : Assurez-vous que votre calendrier est connecté dans les paramètres de votre Business App
- **Instructions recommandées** :
  ```
  Check availability for the next 2 weeks.
  Confirm all details before booking: date, time, service type, duration.
  Send confirmation details to the customer.
  ```

#### Communication Style
- **Ce que ça fait** : Maintient un ton et une voix de marque cohérents
- **Instructions recommandées** :
  ```
  Use a professional but friendly tone.
  Always end responses with "How else can I help you today?"
  Refer to our company as "we" and "our team."
  ```

## Étape 4 : Ajouter des objectifs et des instructions (facultatif)

Pour un contrôle plus précis du comportement des capacités :

1. **Cliquez sur le lien « Add Instructions »** sous chaque capacité activée.
2. **Rédigez des instructions claires et précises** qui définissent :
   - Quand utiliser la capacité
   - Quelles informations recueillir
   - Comment répondre dans différents scénarios
   - Que faire en cas de problème

### Rédiger des instructions efficaces

**Bon exemple :**
```
Lead Capture: Only collect contact information after the customer shows interest in our services. Always ask for name, email, and phone. If they're hesitant to share information, explain that it helps us provide better service.
```

**Mauvais exemple :**
```
Get contact info when needed.
```

:::tip Bonnes pratiques pour les instructions
- **Soyez précis sur les conditions de déclenchement** - Indiquez exactement à l'IA quand agir
- **Incluez des consignes de gestion des erreurs** - Que doit-il se passer en cas de problème ?
- **Utilisez un langage clair et actionnable** - Écrivez comme si vous formiez un nouvel employé
- **Montrez des exemples, pas seulement des règles** - « Par exemple, dites : "Je serais ravi de vous aider avec ça." »
- **Restez concis** - Des instructions courtes et précises fonctionnent souvent mieux que de longs paragraphes
- **Testez et itérez** - Essayez différentes formulations et observez ce qui donne de meilleurs résultats
:::

### Adapter une capacité à des canaux spécifiques

Votre employé IA sait sur quel canal il répond, de sorte que les instructions d'une capacité peuvent faire référence au canal par son nom. C'est utile lorsqu'une tâche doit se comporter différemment selon l'endroit où le client vous contacte, par exemple en recueillant moins de détails pour la capture de prospects par SMS que par e-mail :

```
When capturing a lead on SMS, ask for name and phone number only, one question at a time, and keep each message short.
When capturing a lead by email, you can ask for name, email, phone, and preferred appointment time in a single reply.
```

Pour des conseils sur le comportement spécifique à chaque canal pour l'ensemble de l'employé IA, consultez [Ajuster les réponses par canal](../ai-workforce/index.mdx#adjust-responses-by-channel).

#### Pourquoi les exemples sont importants

Inclure des exemples dans vos instructions aide votre IA à comprendre exactement ce que vous voulez :

**Sans exemples :**
```
Be friendly when greeting customers.
```

**Avec exemples :**
```
Be friendly when greeting customers. For example: "Hi there! Thanks for reaching out. How can I help you today?"
```

La deuxième version donne à l'IA un modèle concret à suivre, ce qui produit des résultats plus cohérents.

### Modèles d'instructions qui fonctionnent

Utilisez ces modèles éprouvés lors de la rédaction des instructions de capacités :

#### Logique conditionnelle : « Si X, alors Y »
```
If the customer asks about pricing: Share our standard rates and offer to send a detailed quote.
If they mention a competitor: Acknowledge their research and focus on our unique benefits.
```

#### Étapes séquentielles : « D'abord... Ensuite... Enfin... »
```
First, greet the customer warmly.
Then, ask what brings them to our site today.
Finally, based on their answer, offer relevant help or information.
```

#### Établissement de limites : « Seulement... quand... » / « Jamais... sauf si... »
```
Only ask for contact information when the customer shows clear buying interest.
Never transfer calls unless the customer specifically requests to speak with someone else.
```

#### Gestion des erreurs : « Si... ne peut pas... »
```
If you can't find the answer in the knowledge base, say: "I don't have that specific information, but I'd be happy to connect you with someone who does."
```

## Étape 5 : Enregistrer et tester votre configuration

1. Cliquez sur `Save Changes` en bas de la page `Configure`.
2. **Testez les capacités** en démarrant une conversation avec votre employé IA.
3. **Essayez différents scénarios** pour vérifier que les capacités s'activent correctement :
   - Posez des questions qui devraient déclencher l'accès à la base de connaissances
   - Manifestez de l'intérêt pour des services afin de tester la capture de prospects
   - Demandez un rendez-vous pour tester la fonctionnalité de réservation

### Liste de vérification des tests

- [ ] Les capacités s'activent aux moments appropriés
- [ ] Les informations requises sont recueillies avant de poursuivre
- [ ] L'IA suit vos instructions personnalisées
- [ ] Les scénarios d'erreur sont gérés avec souplesse
- [ ] L'expérience client semble naturelle et utile

## Étape 6 : Surveiller et affiner

Après la configuration initiale :

1. **Consultez les journaux de conversation** pour voir comment les capacités se comportent lors d'interactions réelles.
2. **Recueillez les commentaires des clients** sur leur expérience.
3. **Ajustez les instructions** en fonction de ce que vous apprenez.
4. **Ajoutez ou retirez des capacités** à mesure que les besoins de votre entreprise évoluent.

## Dépannage des problèmes courants

### La capacité ne s'active pas
- **Vérifiez les conditions de déclenchement** : Assurez-vous que les demandes des clients correspondent aux paramètres de la capacité
- **Relisez les instructions** : Assurez-vous que les critères d'activation sont clairs
- **Testez avec différentes formulations** : Essayez diverses façons dont les clients pourraient formuler leurs demandes

### Les informations ne sont pas recueillies
- **Vérifiez les champs requis** : Assurez-vous que la capacité sait quelles informations recueillir
- **Vérifiez la clarté des instructions** : Rendez les exigences de collecte explicites
- **Testez le déroulement de la conversation** : Parcourez le processus comme le ferait un client

### Conflits entre capacités
- **Vérifiez les priorités des capacités** : Certaines capacités peuvent en remplacer d'autres
- **Clarifiez les instructions** : Rendez les conditions de déclenchement plus précises
- **Retirez les capacités en conflit** : Retirez les capacités qui interfèrent puis rajoutez-les une fois les instructions affinées

## Conseils de configuration avancée

### Superposition de capacités
Activez plusieurs capacités complémentaires qui fonctionnent ensemble :
- Lead Capture + Appointment Booking pour les entreprises de services
- Knowledge Base + Communication Style pour les scénarios de support
- Product Lookup + Lead Capture pour les interactions de vente

### Déploiement progressif
Commencez par les capacités essentielles et ajoutez-en d'autres au fil du temps :
1. **Semaine 1** : Activez le style de communication de base et la base de connaissances
2. **Semaine 2** : Ajoutez la capture de prospects une fois que l'IA répond bien
3. **Semaine 3** : Incluez la prise de rendez-vous après avoir testé le flux de prospects
4. **Semaine 4 et plus** : Ajoutez des capacités personnalisées pour des besoins spécialisés

### Suivi de la performance
Suivez les indicateurs clés pour mesurer l'efficacité des capacités :
- Taux d'activation (fréquence de déclenchement des capacités)
- Taux d'achèvement (collecte réussie des informations)
- Scores de satisfaction client
- Taux de conversion pour la capture de prospects

## Prochaines étapes

- **Créer des capacités personnalisées** : [Apprenez à créer des capacités personnalisées](./creating-custom-capabilities) pour des besoins commerciaux spécialisés
- **Prompting avancé** : Explorez les techniques d'ingénierie de prompts pour de meilleures performances des capacités
- **Configuration des intégrations** : Connectez des systèmes externes pour améliorer les fonctionnalités des capacités

Besoin d'aide pour des configurations de capacités spécifiques ? Consultez notre [guide de dépannage](#depannage-des-problemes-courants) ou contactez le support pour une assistance personnalisée.

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    Nouveau dans le fonctionnement des employés IA ? Suivez le cours <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>Les fondamentaux de l'IA</a> dans Vendasta Learn — Débutant, 6 leçons.
  </span>
</div>

