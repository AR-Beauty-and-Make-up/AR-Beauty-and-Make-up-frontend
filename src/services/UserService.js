import axios from 'axios';

const SERVICE_URL = 'http://localhost:8080'

const UserService = () => {


    const getUser = (id) => {
        return axios.get(`${SERVICE_URL}/user/${id}`)
    }


    return {
        getUser: getUser,
    }

}


export default UserService