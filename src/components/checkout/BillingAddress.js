import { useFormik } from 'formik'
import { Button, TextField, Typography, Container, Grid, Paper } from '@material-ui/core'
import {FormLabel, FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup'

import { useContext, useState } from 'react';
import { UserContext } from '../../providers/userProvider';


const useStyles = makeStyles((theme) => ({
    textField: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    form: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    formLabel: {
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 5,
    },
    PaperRadioButton: {
        paddingTop: 5,
        paddingBottom: 150,
    },
    paper: {
        textAlign: 'left',
        paddingRight: 5,
        paddingLeft: 5,
    },
    radio: {
        paddingRight: 5,
        paddingLeft: 10
    },
    button: {
        backgroundColor: "#f3d5d7",
        '&:hover': {
            backgroundColor: "#f3d5d7"
        }
        
    }

  }));



const BillingAddress = () => {

   const [purchase, setPurchase] = useState({
        billingAddress: null,
        paymentMethod: null,
        purchaseItems: null
    })
    const [value, setValue] = useState('')
    const [user, setUser] = useContext(UserContext)
    const classes = useStyles()


    const validationSchema = Yup.object({

        fullname: Yup.string('Ingrese nombre y apellido completo')
                     .required('Este campo es obligatorio'),
    
        email: Yup.string('Ingrese un correo electronico')
                  .email('Ingrese un correo electronico valido')
                  .required('Este campo es obligatorio'),
    
        contactNumber: Yup.string('Ingrese un numero de contacto')
                          .length(11, 'Numero de contacto debe incluir prefijo 011')
                          .required('Este campo es obligatorio'),

        address: Yup.string('Ingrese direccion de entrega')
                    .required('Este campo es obligatorio'),

        city: Yup.string('Ingrese ciudad donde se realizara la entrega')
                 .required('Este campo es obligatorio'),
        
        zipCode: Yup.string('Ingrese codigo postal')
                    .required('Este campo es obligatorio'),
    })



    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            contactNumber: "",
            address: "",
            city: "",
            zipCode: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    }
    )

    const Error = (props) => {
        return (
            <Typography variant='caption' className={classes.error}>{props.error}</Typography>
        )
    }

    const handleChange = (event) => {
 
        if(event.target.value == value) {
            setValue('')
            setPurchase((prevPurchase) => {
              prevPurchase['billingAddress'] = null
              return prevPurchase})
        }
        else {
            setValue(event.target.value)
            setPurchase((prevPurchase) => {
              prevPurchase['billingAddress'] = event.target.value
              return prevPurchase})

            formik.values.fullname = user.fullname
            formik.values.email = user.email
            formik.values.contactNumber = "0"+user.contactNumber
            formik.values.address = user.address.split(',')[0]
            formik.values.city = user.address.split(',')[1]
            formik.values.zipCode = user.address.split(',')[2].split("(")[1].split(")")[0]
        }
    }

    const UserDetail = () => {
        return (
            <div className={classes.radio}>
                <Typography variant="h6">
                    {user.address}
                </Typography>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="span">
                        {user.fullname}
                    </Typography>
                    <Typography variant="span">
                        {"0"+user.contactNumber}
                    </Typography>
                    <Typography variant="span">
                        {user.email}
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <Container>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                        className={classes.textField}
                        fullWidth
                        id="fullname"
                        name="fullname"
                        label="Nombre y Apellido"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        placeholder="Ej: Juan Perez"
                        disabled={!!purchase.billingAddress}    
                        />  
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        className={classes.textField}
                        fullWidth
                        id="email"
                        name="email"
                        label="Correo electronico"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        placeholder="Ej: ejemplo@gmail.com"
                        disabled={!!purchase.billingAddress}    
                        />  
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                        className={classes.textField}
                        id="contactNumber"
                        name="contactNumber"
                        label="Telefono de contacto"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        placeholder="Ej: 011 11112222"
                        disabled={!!purchase.billingAddress}    
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        className={classes.textField}
                        fullWidth
                        id="address"
                        name="address"
                        label="Direccion"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        placeholder="Ej: Calle Falsa 123 (Timbre 19)"
                        disabled={!!purchase.billingAddress}    
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        className={classes.textField}
                        fullWidth
                        id="city"
                        name="city"
                        label="Ciudad"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        placeholder="Ej: Bernal"
                        disabled={!!purchase.billingAddress}    
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        className={classes.textField}
                        id="zipCode"
                        name="zipCode"
                        label="Codigo postal"
                        value={formik.values.zipCode}
                        onChange={formik.handleChange}
                        error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                        helperText={formik.touched.zipCode && formik.errors.zipCode}
                        placeholder="Ej: 1876"
                        disabled={!!purchase.billingAddress}    
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} className={classes.formLabel}>
                    <FormLabel component="legend">Datos de usuario</FormLabel>
                </Grid>
                <Grid item xs={12} className={classes.PaperRadioButton} >
                    <Paper className={classes.paper}>
                        <FormControl component="fieldset">
                            <RadioGroup value={value} >
                                <FormControlLabel className={classes.radio} value={user.address} 
                                control={<Radio onClick={handleChange}/>} 
                                label={<UserDetail  />} />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>

                <Button className={classes.button} variant="contained"  type="submit">
                    Finalizar compra
                </Button>
            </form>
        </Container>
      )
}


export default BillingAddress