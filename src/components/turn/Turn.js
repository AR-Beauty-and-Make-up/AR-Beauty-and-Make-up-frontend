import React from 'react'
import {useState} from 'react'
import {Button, Alert, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './turn.scss';
import 'react-datepicker/dist/react-datepicker-min.module.css'
import DatePicker from 'react-datepicker'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import TurnService from '../../services/TurnService'


const excludedTimes = [
    setHours(setMinutes(new Date(), 0), 0),
    setHours(setMinutes(new Date(), 30), 1),
    setHours(setMinutes(new Date(), 0), 3),
    setHours(setMinutes(new Date(), 30), 4),
    setHours(setMinutes(new Date(), 0), 6),
    setHours(setMinutes(new Date(), 30), 7),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 0), 21),
    setHours(setMinutes(new Date(), 30), 22)
]

const servicesAR = [
    "Masaje reductor",
    "Mesoterapia",
    "Maquillaje",
    "Depilacion",
    "Radio Frecuencia",
    "Ultracavitación"
]

const Turn = () => {
    const [showSteps, setShowSteps] = useState({
        showButton: true,
        showReservation: false,
        showDate: false,
        showPersonalInfo: false,
        showInputs: false,
        acepptTerms: false,
        acepptTermsAge: false,
        notification: false,
    })

    const [turn, setTurn] = useState({
        service: "",
        date: null,
        name: "",
        tel: ""
        
    })


    const header = () => {
        if(showSteps.showButton) {
            return (
                <div>
                    <h1>Reserva tu turno para poder visitarnos</h1>
                    <Button className="btn" variant="secondary" onClick={() => setreservation()}> Reservar</Button>
                </div>
            )
        }
        
    }

    const reservation = () => {
        
        if(showSteps.showReservation) {
            return (
                <div>
                    <h1>Seleccionar servicio</h1>
                    {services()}
                </div>
            )
        }
   
    }

    const dates = () => {
        if(showSteps.showDate){

            return(
                <div>
                    <div className="container">
                        <Alert id="1" key={1} variant={'warning'} className="service">
                                <h3><span value={"Lunes 15"}>{turn.service}</span></h3>
                        </Alert>
                    </div>
                    <h1>Selecionar fecha</h1>
                        {calender()}
                        <br/>
                        <Button className="btn" variant="secondary" onClick={() => setDate()} disabled={!turn.date}>Aceptar</Button>    
                </div>
            )
        }
    }

    const calender = () => {

        const filterTimes = dateAndtime => {
            
            const filterPassedTime = time => {
                const currentDate = new Date();
                const selectedDate = new Date(time);
        
                return currentDate.getTime() < selectedDate.getTime();
            }

            const allowedSatudaysTimes = time => {
                const selectedDate =  new Date(time)
             
                return  selectedDate.getHours() < 13
            }

            const filterPassedTimesAndSaturdayTimes = date => {
                if(date.getDay() !== 6){
                    return filterPassedTime(date)
                }
                else {
                    return filterPassedTime(date) && allowedSatudaysTimes(date)
                }
            }

            return filterPassedTimesAndSaturdayTimes(dateAndtime)
            
        }

        const isSunday = date => {
            return date.getDay() !== 0
          };
        
        return (
          <DatePicker selected={turn.date} onChange={(date) => selectedDate(date)} 
          showTimeSelect
            excludeTimes={excludedTimes}
            filterTime={filterTimes}
            minDate={new Date()}
            maxDate={new Date().setMonth(new Date().getMonth() + 1 )}
            
            locale='pt-br'
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={90}
            filterDate={isSunday}
            placeholderText="Elegir fecha"
          />
          
        );
    };

    const setCheckbox = () => {
        var newShowSteps = {...showSteps}
        newShowSteps.acepptTerms = !newShowSteps.acepptTerms
        setShowSteps(newShowSteps)
    }

    const setPersonalInformation = () => {
        var newShowSteps = {...showSteps}
        newShowSteps.showPersonalInfo = !newShowSteps.showPersonalInfo
        newShowSteps.showInputs = !newShowSteps.showInputs
        setShowSteps(newShowSteps)
    }

    const personalInformation = () => {
        if(showSteps.showPersonalInfo){

            return(
                <div>
                    <h1>Estás solicitando la siguiente reserva</h1>
                    <div className="container">
                        <Alert  variant={'warning'} className="service">
                                <h3><span>{turn.service}</span></h3>
                        </Alert>
                        <Alert  variant={'warning'} className="service">
                                <h3><span>{turn.date.toLocaleString().slice(0, -3) + " HS"}</span></h3>
                        </Alert>
                    </div>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" 
                                label="Declaro no tener fiebre ni haber estado en contacto con personas 
                                con diagnostico positivo de COVID-1" 
                                onClick={() => setCheckbox()}/>
                            </Form.Group>

                        </Form>
                    <br/>
                    <div className="container">
                    <Button className="btn" variant="secondary"  
                        onClick={() => setPersonalInformation()} disabled={!showSteps.acepptTerms}
                        block
                        >Completar mi datos</Button>
                    </div>
                </div>
            )
        }
    }
    

    
    const services = () => {

        return( servicesAR.map((ser) => {
            return (
                <div className="container">
            <Alert id="1" key={1} variant={'warning'} onClick={(event) => selectedService(event)}>
                <h3><span value={"Masajes"}>{ser}</span></h3>
            </Alert>
        </div>
            )
        }
    ))
    }

    const setreservation = () => {

        var newShowSteps = {...showSteps}
        newShowSteps.showButton = !newShowSteps.showButton
        newShowSteps.showReservation = ! newShowSteps.showReservation 
        setShowSteps(newShowSteps)
        
    }

    const selectedService = (e) => {
        const service = e.target.outerText
        var newTurn =  {...turn}
        newTurn.service = service
        setTurn(newTurn)

        var newShowSteps = {...showSteps}
        newShowSteps.showReservation = ! newShowSteps.showReservation
        newShowSteps.showDate = !newShowSteps.showDate
        setShowSteps(newShowSteps)
        
    }

    const  selectedDate = (date) => {
        
            var newTurn =  {...turn}
            newTurn.date = date
            setTurn(newTurn)

        
    }

    const setDate = () => {

        var newShowSteps = {...showSteps}
        newShowSteps.showDate = !newShowSteps.showDate
        newShowSteps.showPersonalInfo = ! newShowSteps.showPersonalInfo
        setShowSteps(newShowSteps)
        
    }

    const setName = (name) => {
        var newTurn =  {...turn}
        newTurn.name = name
        setTurn(newTurn)
    }

    const setTel = (tel) => {

        var newTurn =  {...turn}
        newTurn.tel = tel
        setTurn(newTurn)

    }

    const setCheckboxAge = () => {
        var newShowSteps = {...showSteps}
        newShowSteps.acepptTermsAge = !newShowSteps.acepptTermsAge
        setShowSteps(newShowSteps)
    }

    const completePersonalInformation = () => {

        if(showSteps.showInputs){

        
            return(
                <div className="container">
                    <Form>
                        <Form.Group 
                        
                        onChange={(event) => setName(event.target.value)}

                        >
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar nombre completo" />
                            <Form.Text className="text-muted">
                           
                            </Form.Text>
                        </Form.Group>

                        <Form.Group 
                            onChange={(event) => setTel(event.target.value)}
                        >
                            <Form.Label>Numero de telefono</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar numero de telefono" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Check type="checkbox"
                            onClick={() => setCheckboxAge()}
                            label="Soy mayor de 19 años" />
                        </Form.Group>
                        <Button className="btn" variant="secondary"  
                        disabled={!turn.name || !turn.tel || !showSteps.acepptTermsAge} 
                        block
                        onClick={() => {

                            var newShowSteps = {...showSteps}
                            newShowSteps.showInputs = !newShowSteps.showInputs
                            newShowSteps.notification = !newShowSteps.notification
                            setShowSteps(newShowSteps)

                            TurnService().postTurn(turn)
                        }}
                        >Enviar</Button>
                    </Form>
                </div>
            )
        }
    }

    const sendNotification = () => {
        if(showSteps.notification) {
            return(
                <h3>Se ha enviado su solicitud de turno.</h3>
            )
        }
    }

    return(
        <div>
            {header()}
            {reservation()}
            {dates()}
            {personalInformation()}
            {completePersonalInformation()}
            {sendNotification()}
        </div>
    )

}

 

  

export default Turn