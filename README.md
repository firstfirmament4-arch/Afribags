# AFRIBAGS — Site web

Site vitrine + catalogue + commande WhatsApp + back-office pour AFRIBAGS by D'Avafrik.

Stack : Next.js (React) + Tailwind CSS + Supabase (base de données, stockage des photos, connexion admin). 100% gratuit au démarrage.

## 1. Installer le projet sur ton ordinateur

Il te faut [Node.js](https://nodejs.org) installé (version 18 ou plus).

```bash
cd afribags
npm install
```

## 2. Créer le projet Supabase (gratuit)

1. Va sur https://supabase.com, crée un compte, puis "New project".
2. Une fois le projet créé, va dans **SQL Editor** → colle le contenu du fichier `supabase/schema.sql` → clique sur "Run". Cela crée la table des produits et les règles de sécurité.
3. Va dans **Storage** → "New bucket" → nomme-le exactement `products` → coche **Public bucket** → crée-le. C'est ici que les photos seront stockées.
4. Va dans **Authentication** → **Users** → "Add user" → crée un compte pour ta sœur (email + mot de passe). C'est ce compte qu'elle utilisera pour se connecter à l'espace admin du site.
5. Va dans **Project Settings** → **API** → copie :
   - "Project URL"
   - "anon public" key

## 3. Configurer les variables d'environnement

Copie le fichier `.env.local.example` en `.env.local` :

```bash
cp .env.local.example .env.local
```

Puis remplis-le avec les valeurs copiées à l'étape précédente.

## 4. Lancer le site en local

```bash
npm run dev
```

Ouvre http://localhost:3000

## 5. Déployer gratuitement (Vercel)

1. Mets le code sur GitHub (crée un dépôt et pousse le projet).
2. Va sur https://vercel.com, connecte-toi avec GitHub, "Add New Project", sélectionne le dépôt.
3. Dans les réglages du projet Vercel, ajoute les mêmes variables d'environnement que dans `.env.local` (Settings → Environment Variables).
4. Déploie. Ton site sera disponible sur une adresse `https://afribags.vercel.app` (tu pourras brancher un vrai nom de domaine plus tard).

## Notes importantes

- **Le numéro WhatsApp** est configuré dans `lib/constants.js`.
- **Les produits** sont gérés entièrement depuis `/admin` une fois connecté — aucune modification de code nécessaire pour ajouter un sac, changer un prix, ou marquer une rupture de stock.
- **Sécurité** : le mot de passe de ta sœur n'est jamais stocké dans le code ; l'authentification est gérée par Supabase.
- **Prochaines améliorations possibles** : compression automatique des photos avant envoi (pour économiser la data mobile), configurateur "mix & match" bandoulières, badges de stock limité automatiques.
