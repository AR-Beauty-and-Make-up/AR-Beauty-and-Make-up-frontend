import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './turn.scss';
import 'react-datepicker/dist/react-datepicker-min.module.css'
import DatePicker from 'react-datepicker'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import TurnService from '../../services/TurnService';

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: '#c8adab',
    '&:hover': {
        color: '#FFFFFF'
    }
  },
  selectedService: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#c8adab',
    fontSize: '130%',
  },
  icon: {
    textAlign: 'right',
    
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  notificationStyle: {
    textAlign: 'left'
}
}));

const servicesAR = [
    "Masaje reductor",
    "Mesoterapia",
    "Maquillaje",
    "Depilacion",
    "Radio Frecuencia",
    "Ultracavitación"
]




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

const Turn = () => {

  const turnService = TurnService()
  const classes = useStyles();

  const [datesAlreadyTaken, setDatesAlreadyTaken] = useState([])


  const [showSteps, setShowSteps] = useState({
    showServices: true,
    showDate: false,
    showCheckedTurn: false,
    acepptTermsCovid: false,
    showPersonalInfo: false,
    notification: false,
    showFade: true,
})

const [turn, setTurn] = useState({
    service: "",
    date: null,
    email: "",
    name: "",
    lastname: "",
    clientNumber: ""
    
})


useEffect(() => { 
     turnService.getDates().then((response) => {
    
        let newStringDates = response.data
        
        let newDates = newStringDates.map((stringDate) => new Date(stringDate))

        setDatesAlreadyTaken(newDates.concat(datesAlreadyTaken))
    
     })
    
}, [])

  const ChooseService = () => {
    if(showSteps.showServices) {
    
        return(
            <Fade in={showSteps.showServices} timeout={500}>
            <div className={classes.root}>
            <h2>Elegir Servicio</h2>
            <Grid container spacing={1}>
                {servicesAR.map((service) => {
                    return(
                        <Grid key={service} item xs={12}>
                            <Paper className={classes.paper} onClick={() => {
                                setService(service)
                                setSteps(['showServices', 'showDate'])
                                }}>
                                <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    {service}
                                </Grid>
                                <Grid item xs={6} className={classes.icon}>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
        </Fade>
        )
    }

    return <div></div>
}


const setService = (service) => {
    var newTurn = {...turn}
    newTurn.service = service
    setTurn(newTurn)
}


const setSteps = (steps) => {
    
    var newShowSteps = {...showSteps}
    steps.forEach((step) => {
        newShowSteps[step] = !newShowSteps[step]
    })
    
    setShowSteps(newShowSteps)
}

const ChooseDate = () => {
    if(showSteps.showDate){
        return(
            
                <Grid container spacing={2}>         
                    <Grid item xs={12}>
                        <Paper className={classes.selectedService} onClick={() => {
                            setSteps(['showDate', 'showServices'])
                            }}>
                            <b>{turn.service}</b>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Selecionar fecha</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <Calender />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{background: '#100d0d', color: '#f4f1f1'}} 
                        onClick={() => {
                            setSteps(['showDate', 'showCheckedTurn'])
                            
                        }}
                        disabled={!turn.date}
                        >Aceptar</Button>
                    </Grid>
                </Grid>
                
            
        )
    }
    return <div></div>
}



const Calender = () => {

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

        const filterDatesAlreadyTaken = __date => {

            const date = new Date(__date)

            console.log(date)
            const filteredYear = datesAlreadyTaken.filter((_date) => _date.getFullYear() === date.getFullYear())
            console.log(filteredYear)
            const filteredDay = filteredYear.filter((_date) => _date.getDay() === date.getDay())
            console.log(filteredDay)
            const filteredMonth = filteredDay.filter((_date) => _date.getMonth() === date.getMonth())
            console.log(filteredMonth)
            
            //return filteredMonth?filteredMonth.some((_date) => _date.getTime() === date.getTime()):true
            return true
        }

        return filterPassedTimesAndSaturdayTimes(dateAndtime)// && filterDatesAlreadyTaken(dateAndtime)
        
    }

    const isSunday = date => {
        return date.getDay() !== 0
      };
    
    const handleColor = time => {
        //return time.getHours() === 12 ? "disabled-date" : "text-error";
    };

    
    return (
      <DatePicker selected={turn.date} onChange={(date) => {
            if(date.getHours() !== 0) {
                setDate(date)
            }    
        }} 
        showTimeSelect
        timeCaption="time"
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
        withPortal
        required={true}
        locale="es"
        timeClassName={handleColor}
      />
      
    );
};

const setDate = (date) => {
    var newTurn =  {...turn}
    newTurn.date = date
    setTurn(newTurn)
}


const CheckTurn = () => {
    if(showSteps.showCheckedTurn){
        return(
            
                <Grid container spacing={2}>         
                    <Grid item xs={12}>
                        <Paper className={classes.selectedService} onClick={(event) => {
                            setSteps(['showCheckedTurn', 'showServices'])
                            }}>
                            <b>{turn.service}</b>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.selectedService} onClick={(event) => {
                                setSteps(['showDate', 'showCheckedTurn'])
                                }}>
                                <b>{turn.date.toLocaleString().slice(0, -3) + " HS"}</b>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox color="default" 
                    checked={showSteps.acepptTermsCovid}
                    onChange={(e) => setSteps(['acepptTermsCovid'])}
                    />} 
                    label="Declaro no tener fiebre ni haber estado en contacto con personas con diagnostico positivo de COVID-19" 
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{background: '#100d0d', color: '#f4f1f1'}} 
                        onClick={() => {
                            setSteps(['showCheckedTurn', 'showPersonalInfo'])

                        }}
                        disabled={!showSteps.acepptTermsCovid}
                        >Completar mis datos</Button>
                    </Grid>
                </Grid>
        )
    }
    return <div></div>
}

const PersonalInfo = () => {

    if(showSteps.showPersonalInfo){
        return <Fade in={showSteps.showPersonalInfo} timeout={1000}><FormTurn /></Fade>
    }
    return <div></div>
}

const validationSchema = yup.object({
    email: yup
      .string('Ingrese un correo electronico')
      .email('Ingrese un correo electronico valido')
      .required('Correo electronico es requerido'),
    contact: yup
      .string('Ingrese un numero de contacto')
      .length(11, 'Numero de contacto debe incluir prefijo 011')
      .required('Numero de contacto es requerido'),
    firstName: yup
      .string('Ingrese primer nombre')
      .required('Primer nombre es requerido'),
    lastName: yup
      .string('Ingrese apellido')
      .required('Apellido es requerido'),
  });
  
  const FormTurn = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        contact: '',
        firstName: '',
        lastName: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        const {email, firstName, lastName, contact} = values
        var newTurn = {...turn}
        newTurn.email = email
        newTurn.name = firstName
        newTurn.lastname = lastName
        newTurn.clientNumber = contact
        
        setTurn(newTurn)
        turnService.postTurn(newTurn)
        console.log(newTurn)
        setSteps(['showPersonalInfo', 'notification'])
      },
    });
  
    return (

        <form onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>         
          <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo electronico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            
            id="firstName"
            name="firstName"
            label="Nombre"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            fullWidth
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            
            id="lastName"
            name="lastName"
            label="Apellido"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            
            id="contact"
            name="contact"
            label="Numero de contacto"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            fullWidth
          />
          </Grid>
          <Grid item xs={12}>
          <Button style={{background: '#100d0d', color: '#f4f1f1'}} variant="contained" fullWidth type="submit">
            Completar datos
          </Button>
          </Grid>
        </Grid>
        </form>

    );
  };


const Notification = () => {

    if(showSteps.notification) {
        return(
            <div className={classes.notificationStyle}>
                <h3 style={{color: 'purple'}}>Revisa tu correo</h3>
                <h4>Enviamos un mail de confimacion a <b>{turn.email}</b></h4>
                <br/>
                <br/>
                <h6>
                    Deberás confirmar tu reserva dentro de los próximos 15 minutos.
                </h6>
                <h6>
                    De lo contrario, será cancelada automaticamente.
                </h6>
            </div>
        )
    }
    return <></>
}

return (
    <Container maxWidth="sm">
        <ChooseService />
        <ChooseDate />
        <CheckTurn />
        <PersonalInfo />
        <Notification />
    </Container>
  );
}


export default Turn