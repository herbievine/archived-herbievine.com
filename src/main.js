// Basic Vue
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// Firebase
import firebase from 'firebase';
import 'firebase/auth';

Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: 'AIzaSyDkYuqnf_59DDUq5eukN_ycTGKzZ9LaVdY',
    authDomain: 'vineherbie-a383a.firebaseapp.com',
    databaseURL: 'https://vineherbie-a383a.firebaseio.com',
    projectId: 'vineherbie-a383a',
    storageBucket: 'vineherbie-a383a.appspot.com',
    messagingSenderId: '723139562438',
    appId: '1:723139562438:web:3e18bfd6c9e3780758c0c7',
    measurementId: 'G-PB91H3K3XT',
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
