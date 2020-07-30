import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDNXBC78P66zbprBZf9p7k231OMrJSfEng",
    authDomain: "softwarechimps-cms.firebaseapp.com",
    databaseURL: "https://softwarechimps-cms.firebaseio.com",
    projectId: "softwarechimps-cms",
    storageBucket: "softwarechimps-cms.appspot.com",
    messagingSenderId: "987335827445",
    appId: "1:987335827445:web:b53a63893a0b47cfaa8abc"
  };
  // Initialize Firebase
  const Firebase = firebase.initializeApp(firebaseConfig);
  export default Firebase;
