import axios from 'axios';


const SERVICE_URL = 'http://localhost:8080'

const TurnService = () => {


    const getTurns = () => {
        return axios.get(`${SERVICE_URL}/turns`)
    }
    
    const postTurn = (turn) => {
        var turnToSend = {...turn}
        turnToSend.date = turnToSend.date.toISOString().slice(0, -2)
        axios.post(`${SERVICE_URL}/turn`, turnToSend).then((response) => console.log(response))
    }

    const updateTurn = (turn) => {
        debugger
        axios.put(`${SERVICE_URL}/turns/` + turn.id , turn).then((response) => console.log(response))
    }

    return {
        getTurns: getTurns,
        postTurn: postTurn,
        updateTurn: updateTurn
    }

}


export default TurnService