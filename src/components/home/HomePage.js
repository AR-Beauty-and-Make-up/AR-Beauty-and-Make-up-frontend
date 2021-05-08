import React from 'react'
import {useState, useEffect} from 'react'
import TurnService from '../../services/TurnService'
import './homepage.scss'


const useTurns = () => {
    
    const [turns, setTurns] = useState([])

    return {turns, setTurns}

}

const HomePage = (props) => {


    const {turns, setTurns} = useTurns()

    useEffect(async () => {
        const response =  await TurnService().getTurns()

        setTurns(response.data)
    }, []);

    const turnFunc = (turn) => {

        console.log(turn.id)
        return (
            <div>
                {turn.id}
            </div>
        )

    }

    return(
        <div className="home-page">
            
        </div>
    )

}


export default HomePage