importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const firebaseConfig = {
    messagingSenderId: "334193342301",
  };

firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();