import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDFnbQhBhJYiHVujiJc-nXbvJD6DoeN3BE',
  authDomain: 'codeopoly.firebaseapp.com',
  databaseURL: 'https://codeopoly.firebaseio.com',
  projectId: 'codeopoly',
  storageBucket: 'codeopoly.appspot.com',
  messagingSenderId: '1071026321837',
  appId: '1:1071026321837:web:6b0f94a93d2b01aecec924',
  measurementId: 'G-D6RWEQTY3D' // The tutorial doesn't have this line
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//firebase.analytics()
firebaseConfig.firestore()

export default firebase
