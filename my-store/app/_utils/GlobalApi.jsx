const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://10.30.0.75:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*');

const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {
    return resp.data.data
})

const getAllproduct = () => axiosClient.get('/products?populate=*').then(resp => {
    return resp.data.data
})

export default {
    getCategory,
    getSliders,
    getAllproduct
}
