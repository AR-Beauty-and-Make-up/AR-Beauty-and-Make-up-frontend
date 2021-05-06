import axios from 'axios';


const SERVICE_URL = 'http://localhost:8080'

const TurnService = () => {


    const getTurns = () => {
        return axios.get(`${SERVICE_URL}/turns`)
    }
    
    const postTurn = (turn) => {
        var turnToSend = {...turn}
        turnToSend.date = turnToSend.date.toISOString().slice(0, -2)
        turnToSend.clientName = turn.name + " " + turn.lastname
        axios.post(`${SERVICE_URL}/turn`, turnToSend).then((response) => console.log(response))
    }

    const getDates = () => {
        return axios.get(`${SERVICE_URL}/dates`)
    }

    return {
        getTurns: getTurns,
        postTurn: postTurn,
        getDates: getDates
    }

}


export default TurnService