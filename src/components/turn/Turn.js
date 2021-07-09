import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useFormik} from 'formik';
import * as yup from 'yup';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './turn.scss';
import TurnService from '../../services/TurnService';
import {servicesAR} from "../../helpers/Constants";

import Calendar from "./Calendar"
import Notification from "../notification/Notification";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: '#d1a4a6',
    '&:hover': {
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  },
  selectedService: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#d1a4a6',
    fontSize: '130%',
    '&:hover': {
      cursor: 'pointer'
    }
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
  },
  titleMessage: {
    color: 'purple',
    fontWeight: '600',
    fontSize: 'larger'
  }
}));


const Turn = (props) => {

  const turnService = TurnService()
  const classes = useStyles();


  const [showSteps, setShowSteps] = useState({
    showServices: true,
    showDate: false,
    showCheckedTurn: false,
    acepptTermsCovid: false,
    showPersonalInfo: false,
    notification: false,
    showFade: true,
    showError: false,
  })

  const [turn, setTurn] = useState({
    service: {},
    date: null,
    email: "",
    name: "",
    lastname: "",
    contactNumber: ""

  })

  const [codeErrorMessage, setCodeErrorMessage] = useState(null)


  const ChooseService = () => {
    if (showSteps.showServices) {

      return (
        <Fade in={showSteps.showServices} timeout={500}>
          <div className={classes.root}>
            <h2 aria-label="Choose service">Elegir Servicio</h2>
            <Grid container spacing={1}>
              {servicesAR.map((service) => {
                return (
                  <Grid key={service} item xs={12}>
                    <Paper aria-label={service} className={classes.paper} onClick={() => {
                      setService(service)
                      setSteps(['showServices', 'showDate'])
                    }}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          {service.label}
                        </Grid>
                        <Grid item xs={6} className={classes.icon}>
                          <IconButton aria-label="delete" className={classes.margin} size="small">
                            <ArrowForwardIosIcon fontSize="inherit"/>
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
    if (showSteps.showDate) {
      return (

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.selectedService} onClick={() => {
              setSteps(['showDate', 'showServices'])
            }}>
              <b data-testid="Service selected">{turn.service.label}</b>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h2>Selecionar fecha</h2>
          </Grid>
          <Grid item xs={12}>
            <Calendar date={turn.date} setDate={setDate}/>
          </Grid>
          <Grid item xs={12}>
            <Button aria-label="Save date" style={{background: '#100d0d', color: '#f4f1f1'}}
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

  const setDate = (date) => {
    var newTurn = {...turn}
    newTurn.date = date
    setTurn(newTurn)
  }


  const CheckTurn = () => {
    if (showSteps.showCheckedTurn) {
      return (

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.selectedService} onClick={(event) => {
              setSteps(['showCheckedTurn', 'showServices'])
            }}>
              <b>{turn.service.label}</b>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.selectedService} onClick={(event) => {
              setSteps(['showDate', 'showCheckedTurn'])
            }}>
              <b data-testid="Selected date">{turn.date.toLocaleString().slice(0, -3) + " HS"}</b>
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

    if (showSteps.showPersonalInfo) {
      return <Fade in={showSteps.showPersonalInfo} timeout={1000}><FormTurn/></Fade>
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
        newTurn.service = turn.service.value
        newTurn.email = email
        newTurn.name = firstName
        newTurn.lastname = lastName
        newTurn.contactNumber = contact

        setTurn(newTurn)
        turnService.postTurn(newTurn).then((response) => {
          setSteps(['showPersonalInfo', 'notification'])
        })
          .catch((error) => {
            if (error.request.status === 400) {
              debugger
              setCodeErrorMessage(error.response.data.message)
              setSteps(['showPersonalInfo', 'showServices', 'showError'])
            } else {
              setCodeErrorMessage("Ocurrio un error, intente nuevamente")
              setSteps(['showPersonalInfo', 'showServices', 'showError'])
            }

          })
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

    if (showSteps.notification) {
      return (
        <div className={classes.notificationStyle}>
          <p className={classes.titleMessage}>Gracias por confiar en nosotros!</p>

          <p>Enviamos un mail de confimación con los datos del turno y nuestra dirección a {turn.email}</p>

          <p>En caso de querer anular o cambiar su turno, por favor contactenos por whatsapp al 1162434990 o a través de nuestras redes sociales</p>


        </div>
      )
    }
    return <></>
  }

  const Error = () => {
    if (showSteps.showError) {
      return (
        <Alert onClose={() => {
          setSteps(['showError'])
        }} variant="outlined" severity="error">
          {codeErrorMessage}
        </Alert>
      )
    }

    return <></>
  }


  return (
    <Container maxWidth="sm">
      <Error/>
      <ChooseService/>
      <ChooseDate/>
      <CheckTurn/>
      <PersonalInfo/>
      <Notification/>
    </Container>
  );
}


export default Turn