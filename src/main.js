import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase/app'

// Bootstrap
import BootstrapVue from 'bootstrap-vue' 
import 'bootstrap/dist/css/bootstrap.css' 
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCrzK15CBGE7i3ExoVgaFoy3bF3bAOvivk",
  authDomain: "bookmark-410.firebaseapp.com",
  projectId: "bookmark-410",
  storageBucket: "bookmark-410.appspot.com",
  messagingSenderId: "1001797004309",
  appId: "1:1001797004309:web:4fd21e9ae777498ed0b21c"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
