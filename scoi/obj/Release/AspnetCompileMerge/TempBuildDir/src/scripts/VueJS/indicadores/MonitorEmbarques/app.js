import Vue from 'vue';
import App from './components/App.vue';

const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = "/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"

new Vue({
    render: h => h(App)
}).$mount('#app');