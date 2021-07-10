import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import EditProfileModal from "./EditProfileModal";
import {Button} from "@material-ui/core";
import EditPasswordModal from "./EditPasswordModal";

import {UserContext} from '../../providers/userProvider'
import moment from "moment-timezone";
import {useHistory} from "react-router";
import UserService from "../../services/UserService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: '#d1a4a6',
  },
  subtitles: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  info: {
    fontWeight: 'normal'
  },
  icon: {
    textAlign: 'right',

  },
  buttonEdition: {
    margin: '5%',
    textTransform: 'capitalize',
    color: '#FFFFFF',
    backgroundColor: '#000000',
    '&:hover': {
      backgroundColor: 'rgb(0,0,0, 0.7)'
    }
  }
}));


const Profile = (props) => {

  const classes = useStyles()

  const history = useHistory()
  const SERVICE =  UserService()
  const [user, setUser] = useContext(UserContext)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editPasswordOpen, setEditPasswordOpen] = useState(false)

  const handleClose = () => setEditModalOpen(false);

  const closePasswordEditModal = () => setEditPasswordOpen(false);

  useEffect(() => {
    SERVICE.getUserAuthenticated().then((response) => {
      if(!response.data){
        history.push('/')
      }
      })

  }, [])

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12} className={classes.subtitles}><h2>Mis datos</h2></Grid>
          <Grid item xs={12} className={classes.subtitles}>

            <Grid item xs={12}><h3>Datos de cuenta</h3></Grid>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  E-mail
                </Grid>
                <Grid item xs={4} className={classes.info}>
                  {user?.email}
                </Grid>
              </Grid>
            </Paper>

          </Grid>

          <Grid item xs={12} className={classes.subtitles}>

            <Grid item xs={12}><h3>Datos personales</h3></Grid>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  Nombre y apellido
                </Grid>
                <Grid item xs={4} className={classes.info}>
                  {user?.fullname}
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  Fecha de nacimiento
                </Grid>
                <Grid item xs={4} className={classes.info}>
                  {moment(user?.dateOfBirth).tz( "America/Argentina/Buenos_Aires").format("DD-MM-YYYY")}
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  Telefono
                </Grid>
                <Grid item xs={4} className={classes.info}>
                  {user?.contactNumber}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.subtitles}>

            <Grid item xs={12}><h3>Domicilios</h3></Grid>
            <Paper className={classes.paper}>
              <Grid container spacing={1} className={classes.info}>
                {user?.address}
              </Grid>
            </Paper>
          </Grid>

        </Grid>
        <Button className={classes.buttonEdition} onClick={() => setEditPasswordOpen(true)}>Cambiar Contraseña</Button>
        <Button className={classes.buttonEdition} onClick={() => setEditModalOpen(true)}>Editar Información</Button>
      </Container>


      {editModalOpen && <EditProfileModal onClose={handleClose}/>}

      {editPasswordOpen && <EditPasswordModal onClose={closePasswordEditModal}/>}

    </div>
  )
}


export default Profile 