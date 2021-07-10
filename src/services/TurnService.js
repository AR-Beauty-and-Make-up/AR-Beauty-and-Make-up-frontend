import axios from 'axios';
import moment from "moment-timezone";


const SERVICE_URL = 'http://localhost:8080'

const TurnService = () => {


    const getTurns = () => {
        return axios.get(`${SERVICE_URL}/turns`)
    }
    
    const postTurn = (turn) => {
        debugger
        var turnToSend = {...turn}
        turnToSend.date = moment(turnToSend.date.toString()).tz( "America/Argentina/Buenos_Aires").format("YYYY-MM-DDTHH:mm:ss")
        turnToSend.clientName = turn.name + " " + turn.lastname
        return axios.post(`${SERVICE_URL}/turn`, turnToSend)
    }

    const updateTurn = (turn) => {
        return axios.put(`${SERVICE_URL}/turns/` + turn.id , turn)
    }

    const deleteTurn = (turnId) => {
        axios.delete(`${SERVICE_URL}/turns/delete/` + turnId)
    }
    

    const getDates = () => {
        return axios.get(`${SERVICE_URL}/dates/`)
    }


    return {
        getTurns: getTurns,
        postTurn: postTurn,
        updateTurn: updateTurn,
        deleteTurn: deleteTurn,
        getDates: getDates
    }



}


export default TurnService