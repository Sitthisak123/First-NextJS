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

const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
})

const getCartItem=(userId,jwt)=>axiosClient.get('/user-carts?filters[userId][$eq]='+
    userId+'&[populate][products][populate][images][populate][0]=url',{
    headers:{
        Authorization:'Bearer '+jwt
    }
}).then(resp=>{

    const data = resp.data.data;
    const cartItemsList = data.map((item,index)=>({
        name:item.attributes.products?.data[0].attributes.name,
        quantity:item.attributes.quantity,
        amount:item.attributes.amount,
        image:item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
        actualPrice:item.attributes.products?.data[0].attributes.mrp,
        id:item.id,
        product:item.attributes.products?.data[0].id

    }))

    return cartItemsList
})


const deleteCartItem = (id, jwt) => axiosClient.delete('/user-carts/' + id,
    {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    })


export default {
    getCategory,
    getSliders,
    getAllproduct,
    getOnceCategory,
    registerUser,
    signIn,
    addToCart,
    getCartItem,
    deleteCartItem
}
