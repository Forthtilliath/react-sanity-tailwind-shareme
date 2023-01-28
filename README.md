# Dépendances

[![@react-oauth/google](https://img.shields.io/badge/%40react--oauth%2Fgoogle-0.2.6-brightgreen)](https://www.npmjs.com/package/@react-oauth/google) [![@sanity/client](https://img.shields.io/badge/%40sanity%2Fclient-3.4.1-brightgreen)](https://www.npmjs.com/package/@sanity/client) [![@sanity/image-url](https://img.shields.io/badge/%40sanity%2Fimage--url-1.0.1-brightgreen)](https://www.npmjs.com/package/@sanity/image-url) [![jwt-decode](https://img.shields.io/badge/jwt--decode-3.1.2-brightgreen)](https://www.npmjs.com/package/jwt-decode) [![jwt-encode](https://img.shields.io/badge/jwt--encode-1.0.1-brightgreen)](https://www.npmjs.com/package/jwt-encode) [![query-string](https://img.shields.io/badge/query--string-7.1.1-brightgreen)](https://www.npmjs.com/package/query-string) [![react](https://img.shields.io/badge/react-18.2.0-brightgreen)](https://www.npmjs.com/package/react) [![react-dom](https://img.shields.io/badge/react--dom-18.2.0-brightgreen)](https://www.npmjs.com/package/react-dom) [![react-focus-lock](https://img.shields.io/badge/react--focus--lock-2.9.1-brightgreen)](https://www.npmjs.com/package/react-focus-lock) [![react-icons](https://img.shields.io/badge/react--icons-4.4.0-brightgreen)](https://www.npmjs.com/package/react-icons) [![react-loader-spinner](https://img.shields.io/badge/react--loader--spinner-5.3.4-brightgreen)](https://www.npmjs.com/package/react-loader-spinner) [![react-masonry-css](https://img.shields.io/badge/react--masonry--css-1.0.16-brightgreen)](https://www.npmjs.com/package/react-masonry-css) [![react-modal](https://img.shields.io/badge/react--modal-3.15.1-brightgreen)](https://www.npmjs.com/package/react-modal) [![react-router-dom](https://img.shields.io/badge/react--router--dom-6.4.0-brightgreen)](https://www.npmjs.com/package/react-router-dom) [![react-scripts](https://img.shields.io/badge/react--scripts-5.0.1-brightgreen)](https://www.npmjs.com/package/react-scripts) [![react-scroll-to-top](https://img.shields.io/badge/react--scroll--to--top-3.0.0-brightgreen)](https://www.npmjs.com/package/react-scroll-to-top) [![tailwind-merge](https://img.shields.io/badge/tailwind--merge-1.1.1-brightgreen)](https://www.npmjs.com/package/tailwind-merge) [![uuid](https://img.shields.io/badge/uuid-9.0.0-brightgreen)](https://www.npmjs.com/package/uuid)

# Explication du projet

Le projet a été initié à partir de cette vidéo youtube : https://www.youtube.com/watch?v=1RHDhtbqo94. Il permet de réaliser un site à l'aide de Réact et de Sanity.

# Liste des améliorations apportées
### Sur l'ensemble du projet
- [x] **Ajout d'un contexte `user`**. Afin d'éviter d'avoir à passer des props d'un composant à un autre, j'ai préféré ajouter un contexte pour gérer l'utilisateur connecté. Par la même occasion, ca permet d'alléger le code de certains composants pour regrouper tout ce qui est lié à la connexion ou la récupération de l'utilisateur dans la db.

- [x] **Ajout d'un contexte `search`**. Même avantage que pour user, search étant liés à plusieurs composants, il était plus simple d'en faire un contexte.

- [x] **Ajout de beaucoup d'accessibilité**. Que soit au niveau de la tabulation ou des aria-labels, j'ai taché d'ajouter un maximum d'accessibilité.
A commencé par le hover des pins, il était essentiel de rendre cela possible à l'aide de la tabulation. Ainsi, une fois sur le pin, il est possible d'interagir avec les fonctionnalités sur celui-ci : `D` permet de télécharger l'image, `L` permet d'aller vers la destination, `S` permet de sauvegarder le pin dans ses favoris et enfin `R` permet de le supprimer.
Un problème lié à la tabulation a été rencontré. Lorsque l'utilisateur met le focus sur le champ de recherche, celui-ci est redirigé vers la page `/search`. Le champ étant en haut, un utilisateur navigant à l'aide de la tabulation était redirigé vers `/search` en permanance. Il a donc été utile d'ajouter `/search` dans la sidebar et de retirer l'accès au champ à l'aide de la tabulation lorsque l'utilisateur n'est pas sur `/search`.

- [x] **Regroupement des routes dans App**. Avoir des routes partout dans son projet est quelque chose que je ne trouve pas pratique. On s'y perd vite, et lors d'une redirection non désirée, on peut vite ne pas comprendre ce qu'il se passe. Avoir toutes les routes permet d'avoir une vue d'ensemble sur la navigation à travers les routes.

- [x] **Routes comme active dans la sidebar**. Toutes les routes, hormis login, se trouve en dessous de `Home`. Cela avait pour conséquence que `Home` était considérée comme la route active sur l'ensemble du site. Il a donc été nécessaire d'ajouter un composant pour gérer correctement la route active.

- [ ] **Afficher les raccourcis**. Lorsqu'un pin a le focus, comme dit précédemment, j'ai mis en place des raccourcis. Toutefois, l'utilisateur n'en a pas forcement connaissance. Ajouter une sorte de tooltip serait un vrai plus pour l'accessibilité.
### Route /login

- [x] **Sécurité le localstorage**. Au début du projet, tous les données reçues par google suite à la connexion d'un utilisateur étaient stockées en clair dans le localstorage. Il était tout à fait possible de modifier son id par celui d'un autre utilisateur, ce qui permettait de poster des messages sous un autre nom, voir de supprimer les messsages d'autres utilisateurs.
A présent, les données sont stockées dans un json web token !

- [x] **Ajout de rôles**. Afin de pouvoir modérer un minimum, j'ai ajouté un système de rôles. Un nouvel utilisateur obtient naturellement le rôle ``role_user``. Deux rôles supplémentaires ont été ajouté ``role_moderator`` et ``role_admin``, uniquement ajoutable via la db. Un modérateur ou un admin peut à présent supprimer le pin de n'importe quel autre utilisateur.

- [ ] **Modérer les commentaires**. Il aurait tout à fait été possible d'ajouter les modérations des commentaires. Contairement aux pins, les commentaires ne sont de base pas supprimable, même par le posteur. Je n'ai donc pas souhaité ajouter cette fonctionnalité.

- [ ] **Vérifier un token expiré**. J'ai ajouté la date de création du token dans le contenu de la variable cryptée du localstorage. De plus, j'ai fait en sorte d'ajouter une date d'expiration. Il aurait été possible de gérer cela à la connexion de l'utilisateur. Si le token est expiré, on le supprime et on le redige vers la page de connexion.

### Composant Pin

- [x] **Optimisation du hover**. Le hover était géré à l'aide des événements ``onMouseEnter`` et ``onMouseLeave``. J'ai préféré passer par tailwind pour gérer cela à l'aide de la classe `group`.

- [x] **Affichage de la destination**. L'affichage était géré par js. Si la destination était trop longue, celle-ci était tronquée, ne rendant cela pas réellement plus lisible. Ce qui compte dans la destination, c'est le nom du site. J'ai donc commencé par retirer le protocol. Ensuite, via tailwind et ellipsis, le tour était joué.

- [x] **Ajout d'un modal avant de supprimer un pin**. Une fausse manip est si vite arrivé. L'ajout d'un modal pour confirmer son choix était donc important.

- [x] **Désactivation des boutons**. Sur les formulaires de création de pin et de création de commentaire, il me semblait utile de désactiver les boutons permettant de valider le formulaire, afin de montrer que ce dernier n'était pas valide.

- [x] **Retrait des rechargements de la page**. Il me semble important, sur React d'autant plus, d'éviter de rafraichir la page lors d'un ajout ou d'une suppression d'un élément.

### Petit plus

- [x] **A lot of modifications**. Que cela soit au niveau de la gestion des classes si un élément est actif ou non, de l'ajout d'un composant pour afficher correctement l'image d'un utilisateur (car souvent durant le projet, google m'envoyait un erreur 403), l'ajout de hook personnalisé, de nombreuses autres modifications ont été apportées.

- [x] **Scroll To Top**. Amélioration UX afin que l'utilisateur puisse remonter en haut de la page facilement. Suite à cela, le raccourci vers le profil dans la sidebar faisait doublon et a donc été retiré.

- [x] **Typescript**. Passage en totalité du projet en ``Typescript``.
