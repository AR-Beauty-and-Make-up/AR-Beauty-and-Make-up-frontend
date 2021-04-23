import axios from 'axios';


const SERVICE_URL = 'http://localhost:8080'

const TurnService = () => {


    const getTurns = () => {
        return axios.get(`${SERVICE_URL}/turns`)
    }
    

    return {
        getTurns: getTurns
    }

}


export default TurnService