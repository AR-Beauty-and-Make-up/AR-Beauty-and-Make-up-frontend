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
        axios.post(`${SERVICE_URL}/turn`, turnToSend)
    }

    const updateTurn = (turn) => {
        axios.put(`${SERVICE_URL}/turns/` + turn.id , turn)
    }

    const deleteTurn = (turnId) => {
        axios.delete(`${SERVICE_URL}/turns/delete/` + turnId)
    }
    

    const getDates = () => {
        return axios.get(`${SERVICE_URL}/dates/`)
    }


    const getProducts = () => {
        return axios.get(`${SERVICE_URL}/products`)
    }

    return {
        getTurns: getTurns,
        postTurn: postTurn,
        updateTurn: updateTurn,
        deleteTurn: deleteTurn,
        getProducts: getProducts,
        getDates: getDates
    }



}


export default TurnService