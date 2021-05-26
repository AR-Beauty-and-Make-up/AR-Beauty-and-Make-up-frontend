
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, TextField, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import Notification from '../notification/Notification'

import UserService from '../../services/UserService'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 20,
      height: '55vh',
      width: 350,
      margin: '20px auto'
    },
    button: {
        paddingTop: 70,
        paddingBottom: 10
    },
    error: {
        color: 'red'
    },
  }));



const SignUp = (props) => {

    const classes = useStyles()
    const history = useHistory();
    const SERVICE = UserService()
    

    const initialValues = {
        name: '',
        lastname:'',
        email: '',
        password: '' 
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Debe completar este campo"),
        lastname: Yup.string().required("Debe completar este campo"),
        email: Yup.string().email('Correo electronico invalido').required('Debe completar este campo'),
        password: Yup.string().min(8, 'Contraseña debe tener al menos 8 caracteres').required("Debe completar este campo") 
    })

    const register = (values, properties) => {

        SERVICE.postUser(values).then(() => properties.resetForm())
        .then(() => {
            props.setNotication(<Notification message="Se ha dado de alta usuario exitosamente" />)
        }).then(() => {
            history.push('/')
        })
        
    }


    const Error = (props) => {
        return (
            <Typography variant='caption' className={classes.error}>{props.error}</Typography>
        )
    }

    return (
        <Grid>
                <Paper elevation={10} className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Registrate</Typography>
                            <Typography variant='caption'>Llena este formulario para crear tu cuenta</Typography>
                        </Grid>
                        <Formik initialValues={initialValues} 
                                validationSchema={validationSchema}
                                onSubmit={register}>
                            {
                                (props) => (
                                    <Form>
                                        <Field as={TextField} label='Nombre' name='name' fullWidth required
                                        value={props.values.name}
                                        error={props.errors.name&&props.touched.name}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='name'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label='Apellido' name='lastname' fullWidth required
                                        value={props.values.lastname}
                                        error={props.errors.lastname&&props.touched.lastname}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='lastname'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label='Correo electronico' name='email' type='Email' fullWidth required
                                        value={props.values.email}
                                        error={props.errors.email&&props.touched.email}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='email'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label='Contraseña' name='password' type='password' fullWidth required
                                        value={props.values.password}
                                        error={props.errors.password&&props.touched.password}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='password'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <div className={classes.button}>
                                            <Button  type='submit' color='primary' variant='contained' 
                                            fullWidth>Registrar</Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Grid>
                </Paper>
            </Grid>
    )
}


export default SignUp 