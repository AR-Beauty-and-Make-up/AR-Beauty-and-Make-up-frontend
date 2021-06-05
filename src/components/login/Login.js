import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar, Button, TextField, Typography, Link } from '@material-ui/core';
import LockOutlined  from '@material-ui/icons/LockOutlined';

import UserService from '../../services/UserService'

import Notification from '../notification/Notification'
import React, { useContext } from 'react';
import { UserContext } from '../../providers/userProvider';

import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

const useStyles = makeStyles(() => ({
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
    }
  }));

const Login = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const SERVICE = UserService()
    const [user, setUser] = useContext(UserContext)
    const [language, setLanguage] = useContext(LanguageContext)

    const initialValues = {
        email: '',
        password: '' 
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(TEXT[language].login.validation.email.error).required(TEXT[language].login.validation.email.required),
        password: Yup.string().min(8, TEXT[language].login.validation.password.error).required(TEXT[language].login.validation.password.required) 
    })

    const Error = (props) => {
        return (
            <Typography variant='caption' className={classes.error}>{props.error}</Typography>
        )
    }

    const login = ({email, password}, properties) => {
        SERVICE.loginUser(email, password).then((response) => {
            setUser(response.data)
            properties.resetForm()
        })
        .then(() => {
            props.setNotication(<Notification message={TEXT[language].login.notification} />)
        }).then(() => {
            history.push('/')
        }).catch((error) => {
            props.setNotication(<Notification message="Los datos ingresados son incorrectos" />)
        })
    }

    return (
            <Grid>
                <Paper elevation={10} className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} style={{display: 'flex'}} justify='center' >
                            <Avatar><LockOutlined /></Avatar>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>{TEXT[language].login.header}</h2>
                        </Grid>
                        <Formik initialValues={initialValues} 
                                validationSchema={validationSchema}
                                onSubmit={login}>
                            {
                                (props) => (
                                    <Form>
                                        <Field as={TextField} label={TEXT[language].login.label.email} name='email' type='Email' fullWidth required
                                        value={props.values.email}
                                        error={props.errors.email&&props.touched.email}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='email'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label={TEXT[language].login.label.password} name='password' type='password' fullWidth required
                                        value={props.values.password}
                                        error={props.errors.password&&props.touched.password}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='password'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <div className={classes.button}>
                                            <Button  type='submit' color='primary' variant='contained' 
                                            fullWidth>{TEXT[language].login.buttom}</Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                        <Typography>
                                {TEXT[language].login.footer.span}
                            <Link href='sign-up'>
                                {TEXT[language].login.footer.link}
                            </Link> 
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        )
}


export default Login