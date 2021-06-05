import React, {useContext, useState} from 'react';
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
import TurnService from '../../services/TurnService';
import {servicesAR} from "../../helpers/Constants";

import Calendar from "./Calendar"
import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

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
        fontWeight: 'bold'
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




const Turn = () => {
    
    const turnService = TurnService()
    const classes = useStyles();
    const [language, setLanguage] = useContext(LanguageContext)

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
        contactNumber: ""
        
    })


  const ChooseService = () => {
    if(showSteps.showServices) {
    
        return(
            <Fade in={showSteps.showServices} timeout={500}>
            <div className={classes.root}>
            <h2>{TEXT[language].turn.service}</h2>
            <Grid container spacing={1}>
                {servicesAR.map((service) => {
                    return(
                        <Grid key={service} item xs={12}>
                            <Paper className={classes.paper} onClick={() => {
                                setService(service.value)
                                setSteps(['showServices', 'showDate'])
                                }}>
                                <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    {service.label}
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
                        <h2>{TEXT[language].turn.calendar.date}</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <Calendar date={turn.date} setDate={setDate} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{background: '#100d0d', color: '#f4f1f1'}} 
                        onClick={() => {
                            setSteps(['showDate', 'showCheckedTurn'])
                            
                        }}
                        disabled={!turn.date}
                        >{TEXT[language].turn.calendar.buttom}</Button>
                    </Grid>
                </Grid>
                
            
        )
    }
    return <div></div>
}

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
                    label={TEXT[language].turn.check.disclaimer}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{background: '#100d0d', color: '#f4f1f1'}} 
                        onClick={() => {
                            setSteps(['showCheckedTurn', 'showPersonalInfo'])

                        }}
                        disabled={!showSteps.acepptTermsCovid}
                        >{TEXT[language].turn.check.buttom}</Button>
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
      .string(TEXT[language].turn.validation.email.placeholder)
      .email(TEXT[language].turn.validation.email.error)
      .required(TEXT[language].turn.validation.email.required),
    contact: yup
      .string(TEXT[language].turn.validation.contact.placeholder)
      .length(11, TEXT[language].turn.validation.contact.error)
      .required(TEXT[language].turn.validation.contact.required),
    firstName: yup
      .string(TEXT[language].turn.validation.firstname.placeholder)
      .required(TEXT[language].turn.validation.firstname.required),
    lastName: yup
      .string(TEXT[language].turn.validation.lastname.placeholder)
      .required(TEXT[language].turn.validation.lastname.required),
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
        newTurn.contactNumber = contact
        
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
            label={TEXT[language].turn.label.email}
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
            label={TEXT[language].turn.label.name}
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
            label={TEXT[language].turn.label.lastname}
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
            label={TEXT[language].turn.label.contact}
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            fullWidth
          />
          </Grid>
          <Grid item xs={12}>
          <Button style={{background: '#100d0d', color: '#f4f1f1'}} variant="contained" fullWidth type="submit">
            {TEXT[language].turn.buttom}
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
                <h3 style={{color: 'purple'}}>{TEXT[language].turn.notification.header}</h3>
                <h4>{TEXT[language].turn.notification.body1}<b>{turn.email}</b></h4>
                <br/>
                <br/>
                <h6>
                    {TEXT[language].turn.notification.body2}
                </h6>
                <h6>
                    {TEXT[language].turn.notification.body3}
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