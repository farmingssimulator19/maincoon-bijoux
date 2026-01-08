# 📝 Guide de Personnalisation - Maincoon Bijoux

## 🎯 Prochaines étapes pour finaliser votre site

### 1️⃣ Remplacer le numéro WhatsApp

Dans `index.html`, recherchez `33XXXXXXXXX` et remplacez par votre numéro (format international) :
- Exemple : `33612345678` (sans espaces, sans + au début)
- Il y a 4 occurrences à remplacer

### 2️⃣ Ajouter vos liens de réseaux sociaux

Dans `index.html`, remplacez les liens par défaut :
```html
<!-- Header -->
<a href="https://instagram.com/votre_compte" target="_blank">
<a href="https://facebook.com/votre_page" target="_blank">
<a href="https://pinterest.com/votre_compte" target="_blank">

<!-- Footer (même chose) -->
```

### 3️⃣ Ajouter vos photos de bijoux

1. Créez un dossier `img` dans votre projet
2. Ajoutez vos photos (format .jpg ou .webp recommandé)
3. Dans `index.html`, remplacez les emojis par vos images :

```html
<!-- Au lieu de -->
<div class="product-image">💎</div>

<!-- Utilisez -->
<img src="img/bracelet-amethyste.jpg" alt="Bracelet Améthyste" class="product-image-real">
```

4. Ajoutez ce style dans `styles.css` :
```css
.product-image-real {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1.5rem;
}
```

### 4️⃣ Photo de l'atelier

Remplacez le placeholder dans la section "L'Atelier" :
```html
<!-- Au lieu du placeholder -->
<div class="placeholder-image">...</div>

<!-- Utilisez -->
<img src="img/atelier-maincoon.jpg" alt="Atelier Maincoon Bijoux" style="width: 100%; border-radius: 15px;">
```

### 5️⃣ Ajouter plus de produits

Pour ajouter un bijou, copiez-collez ce bloc dans la section `product-grid` :

```html
<div class="product-card">
    <div class="product-image">🔷</div>
    <span class="product-tag">Protection</span>
    <h3>Bracelet Œil de Tigre</h3>
    <p>Pierre de protection et de confiance en soi. Repousse les énergies négatives.</p>
    <span class="price">27,90 €</span>
    <a href="https://wa.me/33VOTRENUMERO?text=Bonjour%20Maincoon%20Bijoux,%20je%20suis%20intéressé(e)%20par%20le%20Bracelet%20Œil%20de%20Tigre" class="whatsapp-btn" target="_blank">
        <i class="fab fa-whatsapp"></i> Commander
    </a>
</div>
```

### 6️⃣ Modifier les couleurs du site

Dans `styles.css`, modifiez les variables au début :
```css
:root {
    --primary-color: #6b8e69; /* Vert sauge - changez ici */
    --secondary-color: #d4a574; /* Or brossé - changez ici */
    --accent-color: #c9896b; /* Terracotta - changez ici */
}
```

### 7️⃣ Ajouter Google Fonts (optionnel)

Pour une typographie encore plus élégante, ajoutez dans le `<head>` de `index.html` :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

Puis dans `styles.css` :
```css
body {
    font-family: 'Inter', sans-serif;
}

h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
}
```

## 📊 SEO - Optimisation Google

### Mots-clés intégrés :
✅ Bijoux artisanaux fait main
✅ Bijoux lithothérapie
✅ Créatrice bijoux Bon-Encontre
✅ Pierres naturelles et bien-être
✅ Bracelets en pierres naturelles
✅ Bijoux fait main Agen
✅ Maincoon Bijoux artisanat
✅ Vertus des pierres et cristaux

### Créer un fichier Google Business Profile :
1. Allez sur https://business.google.com
2. Créez votre fiche "Maincoon Bijoux"
3. Adresse : Bon-Encontre (47)
4. Catégorie : "Bijouterie", "Artisan"
5. Ajoutez le lien de votre site GitHub Pages

## 🚀 Mettre à jour le site (workflow Git)

Après chaque modification :

```bash
# 1. Voir les changements
git status

# 2. Ajouter tous les fichiers modifiés
git add .

# 3. Créer un commit avec un message
git commit -m "Ajout de vraies photos de bijoux"

# 4. Envoyer sur GitHub
git push

# Attendre 1-2 minutes, le site se met à jour automatiquement !
```

## 💡 Idées d'évolution

### Court terme :
- [ ] Ajouter un formulaire newsletter (Mailchimp gratuit)
- [ ] Créer une page "Blog" avec des articles lithothérapie
- [ ] Ajouter un système de filtres par pierre
- [ ] Créer une page "Avis clients"

### Moyen terme :
- [ ] Intégrer Stripe/PayPal pour paiements directs
- [ ] Ajouter un système de panier
- [ ] Créer des fiches produits détaillées (pages individuelles)
- [ ] Ajouter une galerie Instagram automatique

### Long terme :
- [ ] Développer une version mobile app
- [ ] Créer un espace client
- [ ] Programme de fidélité
- [ ] Vente en marketplace (Etsy, Amazon Handmade)

## 📞 Support

Pour toute question sur la modification du site :
1. Utilisez GitHub Copilot dans VS Code
2. Demandez-lui : "Comment faire X sur mon site Maincoon Bijoux ?"
3. Il connaît toute la structure de votre projet !

---

💜 **Bon courage pour votre aventure Maincoon Bijoux !**
