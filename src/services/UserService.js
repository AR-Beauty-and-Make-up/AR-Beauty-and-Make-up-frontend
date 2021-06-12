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
        return axios.post(`${SERVICE_URL}/validateUser`, {email: email, password: password}) 
    }

    const updateUser = (id, userToUpdate) => {
        debugger
        return axios.put(`${SERVICE_URL}/updateUser/${id}`, userToUpdate )
    }


    return {
        getUser: getUser,
        postUser: postUser,
        loginUser: loginUser,
        updateUser: updateUser
    }

}


export default UserService