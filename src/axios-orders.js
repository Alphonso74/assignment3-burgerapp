import axios from 'axios';

 const instance = axios.create({
    baseURL: 'https://burger-app-1173d.firebaseio.com/'
});


 export default instance;
