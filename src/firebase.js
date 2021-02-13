import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsVOgdEI3lQQ4a-NogHFKN8UICA4yBucc",
    authDomain: "rcielectric-be3e6.firebaseapp.com",
    databaseURL: "https://rcielectric-be3e6-default-rtdb.firebaseio.com",
    projectId: "rcielectric-be3e6",
    storageBucket: "rcielectric-be3e6.appspot.com",
    messagingSenderId: "560886654795",
    appId: "1:560886654795:web:6ca357679a12297e5e6ace",
    measurementId: "G-GZ2MFB0K8T"
  }

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth}
  