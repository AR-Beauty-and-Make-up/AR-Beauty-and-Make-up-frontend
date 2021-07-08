import axios from 'axios';

const SERVICE_URL = 'http://localhost:8080'

const UserService = () => {


    const getUser = (id) => {
        return axios.get(`${SERVICE_URL}/user/${id}`)
    }

    const postUser = (user) => {
        return axios.post(`${SERVICE_URL}/users`, user)
    }

    const loginUser = (email, password) => {
        return axios.post(`${SERVICE_URL}/validateUser`, {email: email, password: password}, { withCredentials: true }) 
    }

    const updateUser = (id, userToUpdate) => {
        return axios.put(`${SERVICE_URL}/updateUser/${id}`, userToUpdate )
    }

    const addPurchase = (id, purchase) => {
        return axios.put(`${SERVICE_URL}/addPurchase/${id}`, {purchaseItems: purchase, date: new Date()} )
    }

    const getPurchases = (id) => {
        return axios.get(`${SERVICE_URL}/purchases/${id}`)
    }

    const getUserAuthenticated = () => {
        return axios.get(`${SERVICE_URL}/user/`, {withCredentials: true})
    }

    const logout = () => {
        return axios.post(`${SERVICE_URL}/logout-user`, {withCredentials: true}) 
    }

    return {
        getUser: getUser,
        postUser: postUser,
        loginUser: loginUser,
        updateUser: updateUser,
        addPurchase: addPurchase,
        getPurchases: getPurchases,
        getUserAuthenticated: getUserAuthenticated,
        logout: logout
    }

}


export default UserService