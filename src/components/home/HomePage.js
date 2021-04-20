import React from 'react'
import TurnService from '../../services/TurnService'
import NavBar from '../navbar/Navbar'
import './homepage.scss'

export class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            turns: []
        }
    }


    componentDidMount() {
        TurnService().getTurns().then( (response) => {
            
            this.setState({turns: response.data})
        })
    }

    turn = (turn) => {

        console.log(turn.id)
        return (
            <div>
                {turn.id}
            </div>
        )

    }

    render() {
        return (
            
            <div className="home-page">
                <NavBar />
                <div>Hola mundo!</div>
            </div>
        )
    }
}