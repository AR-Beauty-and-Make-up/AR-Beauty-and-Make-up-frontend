
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, TextField, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import Notification from '../notification/Notification'

import UserService from '../../services/UserService'

import { useContext } from 'react';
import { UserContext } from '../../providers/userProvider';
import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

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
    const [user, setUser] = useContext(UserContext)
    const [language, setLanguage] = useContext(LanguageContext)
    

    const initialValues = {
        name: '',
        lastname:'',
        email: '',
        password: '' 
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(TEXT[language].signup.name),
        lastname: Yup.string().required(TEXT[language].signup.lastname),
        email: Yup.string().email(TEXT[language].signup.email.error).required(TEXT[language].signup.email.required),
        password: Yup.string().min(8, TEXT[language].signup.password.error).required(TEXT[language].signup.password.required) 
    })

    const register = (values, properties) => {

        SERVICE.postUser({...values, fullname: values.name+" "+values.lastname}).then((response) => {
            setUser(response.data)
            properties.resetForm()
        })
        .then(() => {
            props.setNotication(<Notification message={TEXT[language].signup.notification} />)
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
                            <Typography variant='h6'>{TEXT[language].signup.header}</Typography>
                            <Typography variant='caption'>{TEXT[language].signup.title}</Typography>
                        </Grid>
                        <Formik initialValues={initialValues} 
                                validationSchema={validationSchema}
                                onSubmit={register}>
                            {
                                (props) => (
                                    <Form>
                                        <Field as={TextField} label={TEXT[language].signup.label.name} name='name' fullWidth required
                                        value={props.values.name}
                                        error={props.errors.name&&props.touched.name}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='name'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label={TEXT[language].signup.label.lastname} name='lastname' fullWidth required
                                        value={props.values.lastname}
                                        error={props.errors.lastname&&props.touched.lastname}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='lastname'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label={TEXT[language].signup.label.email} name='email' type='Email' fullWidth required
                                        value={props.values.email}
                                        error={props.errors.email&&props.touched.email}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='email'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <Field as={TextField} label={TEXT[language].signup.label.password} name='password' type='password' fullWidth required
                                        value={props.values.password}
                                        error={props.errors.password&&props.touched.password}
                                        onChange={props.handleChange}
                                        helperText={<ErrorMessage name='password'>
                                            {(error) => <Error error={error} />}
                                            </ErrorMessage>}/>

                                        <div className={classes.button}>
                                            <Button  type='submit' color='primary' variant='contained' 
                                            fullWidth>{TEXT[language].signup.buttom}</Button>
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