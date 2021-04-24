import React from 'react'
import {useState, useEffect} from 'react'
import TurnService from '../../services/TurnService'
import NavbarAR from '../navbar/Navbar'
import './homepage.scss'
import '../navbar/navbar.scss'
import { useHistory } from 'history'


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
            <NavbarAR/>
        </div>
    )

}


export default HomePage