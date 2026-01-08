# 🔗 Intégration du Paiement Wix dans ton site GitHub

## 🎯 Objectif
Garder ton site sur GitHub Pages (gratuit, rapide) mais utiliser le système de paiement Wix (sécurisé, avec gestion de stock).

## 📋 Méthode 1 : Boutons Wix Payment (RECOMMANDÉ)

### Étape 1 : Créer des boutons de paiement sur Wix

1. **Connecte-toi à ton tableau de bord Wix** :
   - Va sur https://manage.wix.com
   - Clique sur ton site "Maincoon Bijoux"

2. **Accède à "Wix Stores"** :
   - Dans le menu de gauche : **Vendre** > **Produits**
   - Sélectionne un produit (ex: Bracelet Améthyste)

3. **Génère un bouton "Acheter maintenant"** :
   - Clique sur le produit
   - Cherche l'option **"Partager le produit"** ou **"Embed Code"**
   - Wix va te donner un code HTML comme ceci :

```html
<!-- Exemple de code Wix -->
<div data-wix-store="product-page" data-product-id="ABC123"></div>
<script src="https://static.parastorage.com/unpkg/wix-ecommerce-renderer@1.x/dist/app.bundle.js"></script>
```

4. **Copie ce code** pour chaque produit

### Étape 2 : Intégrer dans ton site GitHub

Dans `index.html`, remplace les boutons WhatsApp par les boutons Wix :

**AVANT :**
```html
<a href="https://wa.me/33XXXXXXXXX?text=..." class="whatsapp-btn">
    <i class="fab fa-whatsapp"></i> Commander
</a>
```

**APRÈS :**
```html
<!-- Bouton Wix Payment -->
<div class="wix-payment-button" data-product-id="BRACELET-AMETHYSTE">
    <a href="https://denisvidalon.wixsite.com/maincoon-bijoux/product-page/bracelet-améthyste" 
       class="buy-button" target="_blank">
        <i class="fas fa-shopping-cart"></i> Acheter - 29,90 €
    </a>
</div>
```

### Étape 3 : Styler le bouton

Ajoute dans `styles.css` :

```css
.buy-button {
    display: inline-block;
    background: var(--secondary-color);
    color: var(--white);
    padding: 0.8rem 1.8rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: transform 0.3s, background 0.3s;
}

.buy-button:hover {
    background: var(--primary-color);
    transform: scale(1.05);
}

.buy-button i {
    margin-right: 0.5rem;
}
```

---

## 📋 Méthode 2 : Redirection vers Wix Store (PLUS SIMPLE)

Si Wix ne te donne pas de boutons embeddables, tu peux simplement **rediriger** vers tes pages produits Wix.

### Dans ton fichier `index.html` :

```html
<!-- Pour chaque produit -->
<a href="https://denisvidalon.wixsite.com/maincoon-bijoux/product-page/bracelet-améthyste" 
   class="buy-button" target="_blank">
    <i class="fas fa-shopping-cart"></i> Acheter sur notre boutique
</a>
```

**Avantages :**
- ✅ Système de paiement 100% sécurisé par Wix
- ✅ Gestion automatique du stock
- ✅ Emails de confirmation automatiques
- ✅ Suivi des commandes
- ✅ 0 ligne de code à maintenir

**Inconvénient :**
- ⚠️ Le client est redirigé vers ton site Wix (mais c'est normal pour un paiement)

---

## 📋 Méthode 3 : Double Site (Hybride Avancé)

**Stratégie :**
- 🎨 **Site vitrine** sur GitHub : `farmingssimulator19.github.io/maincoon-bijoux`
- 🛒 **Boutique** sur Wix : `denisvidalon.wixsite.com/maincoon-bijoux`

**Dans ton site GitHub**, tu mets un gros bouton "Boutique" :

```html
<section class="cta-shop">
    <h2>Prêt à commander ?</h2>
    <p>Visitez notre boutique sécurisée pour passer commande</p>
    <a href="https://denisvidalon.wixsite.com/maincoon-bijoux/shop" 
       class="cta-button-large">
        🛒 Accéder à la boutique
    </a>
</section>
```

---

## 🎯 Ma Recommandation pour Maincoon Bijoux

### Utilise la **Méthode 2** (Redirection simple) parce que :

1. **C'est légal et sécurisé** : Les clients paient sur Wix (certifié PCI-DSS)
2. **Facile à maintenir** : Tu changes les prix sur Wix, pas besoin de toucher à GitHub
3. **Professionnel** : Ton site GitHub est une "carte de visite" magnifique
4. **Gratuit** : Hébergement GitHub = 0€, tu paies juste la commission Wix sur les ventes

### Workflow idéal :

1. **Client découvre tes bijoux** sur ton site GitHub (rapide, beau, SEO)
2. **Clique sur "Acheter"** → Redirigé vers la page produit Wix
3. **Paiement sécurisé** sur Wix
4. **Tu reçois la commande** dans ton tableau de bord Wix
5. **Tu expédies** le bijou

---

## 📞 Contact & Support

Si tu veux garder WhatsApp pour les demandes **avant-vente** :
- Garde le bouton WhatsApp flottant
- Change le message en : "Une question avant de commander ?"

Si tu veux **uniquement** les paiements Wix :
- Remplace tous les boutons WhatsApp par des liens Wix
- Garde juste un formulaire de contact

---

## 🚀 Prochaine étape

Dis-moi quelle méthode tu préfères et je modifie ton `index.html` en conséquence !

**Option A** : Redirection simple vers boutique Wix (RECOMMANDÉ)
**Option B** : Garder WhatsApp + Ajouter liens Wix
**Option C** : Autre idée ?
