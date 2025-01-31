## React + Firebase : authentication
### 1. Utilisation de Firebase pour l'authentification
#### 1.1. Création d'un projet Firebase
- Se rendre sur le site de Firebase : https://firebase.google.com/
- Se connecter avec son compte Google
- Cliquer sur "Ajouter un projet"
- Remplir les informations demandées
- Cliquer sur "Créer un projet"
- Cliquer sur "Ajouter Firebase à votre application Web"
- Copier le code qui est généré
- Créer un fichier .env à la racine du projet
- Ajouter les variables d'environnement suivantes :
```
REACT_APP_FIREBASE_API_KEY=VOTRE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=VOTRE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL=VOTRE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID=VOTRE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=VOTRE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=VOTRE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=VOTRE_APP_ID
```
- Installer le module dotenv : `npm install dotenv`
- Importer le module dotenv dans le fichier src/index.js : `import 'dotenv/config';`
- Utiliser les variables d'environnement dans le fichier src/firebase.js
- Créer un fichier src/firebase-config.js
- Ajouter le code suivant :
```javascript
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
```
### Utilisation du contexte pour gérer l'authentification
- Créer un fichier src/UserContext.js
- Ajouter le code suivant :
```javascript
import React, { useContext, useState, useEffect } from 'react';
import firebase from './firebase-config';
   
const UserContext = React.createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
```
#   r e a c t - a u t h - f i r e b a s e - u s e C o n t e x t  
 