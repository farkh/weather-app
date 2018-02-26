import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD2R6_SQMgt926P8burRIboYuFEKHzrSYw",
    authDomain: "weatherapp-c2cc2.firebaseapp.com",
    databaseURL: "https://weatherapp-c2cc2.firebaseio.com",
    projectId: "weatherapp-c2cc2",
    storageBucket: "",
    messagingSenderId: "258628185002"
};

export const firebaseApp = firebase.initializeApp(config);
export const database = firebase.database();
