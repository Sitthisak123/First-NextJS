const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://10.30.0.75:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*');
const getOnceCategory = (category) => axiosClient.get(`/products?filters[categories][name][$in]=${category}&populate=*`).then(resp => {
    return resp.data.data
});

const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {
    return resp.data.data
})

const getAllproduct = () => axiosClient.get('/products?populate=*').then(resp => {
    return resp.data.data
})

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
})

const signIn = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})


export default {
    getCategory,
    getSliders,
    getAllproduct,
    getOnceCategory,
    registerUser,
    signIn
}
