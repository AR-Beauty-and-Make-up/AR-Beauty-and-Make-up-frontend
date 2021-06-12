import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import UserService from '../../services/UserService'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import EditProfileModal from "./EditProfileModal";
import {Button} from "@material-ui/core";
import EditPasswordModal from "./EditPasswordModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: '#c8adab',
  },
  subtitles: {
    textAlign: 'left'
  },
  icon: {
    textAlign: 'right',

  },
  buttonEdition: {
    margin: '5%',
    backgroundColor: '#c8adab',
    '&:hover': {
      fontWeight: 'bold'
    }
  }
}));


const Profile = (props) => {

  const classes = useStyles()

  const [user, setUser] = useState({})
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editPasswordOpen, setEditPasswordOpen] = useState(false)


  useEffect(() => {
    UserService().getUser(1).then((response) => {
      setUser(response.data)
    })
  }, [])

  const handleClickOpen = () => setEditModalOpen(true);

  const handleClose = () => setEditModalOpen(false);

  const openChangePassword = () => setEditPasswordOpen(true);

  const closePasswordEditModal = () => setEditPasswordOpen(false);

  const updateData = (userToUpDate) => {
    UserService().updateUser(user.id, userToUpDate).then((response) => {
      setUser(response.data)
    })
  }


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
                <Grid item xs={4}>
                  {user.email}
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  Password
                </Grid>
                <Grid item xs={4}>
                  {user.password}
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
                <Grid item xs={4}>
                  {user.fullname}
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  Fecha de nacimiento
                </Grid>
                <Grid item xs={4}>
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  Telefono
                </Grid>
                <Grid item xs={4}>
                  {user.contactNumber}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.subtitles}>

            <Grid item xs={12}><h3>Domicilios</h3></Grid>
            <Paper className={classes.paper}>
              {user.address}
            </Paper>
          </Grid>

        </Grid>
        <Button className={classes.buttonEdition} onClick={openChangePassword}>Cambiar Contraseña</Button>
        <Button className={classes.buttonEdition} onClick={handleClickOpen}>Editar Información</Button>
      </Container>


      {editModalOpen && <EditProfileModal onClose={handleClose}
                                          user={user}
                                          changeValue={updateData}/>}

      {editPasswordOpen && <EditPasswordModal onClose={closePasswordEditModal}
                                              user={user}
                                              changePassword={updateData}/>}

    </div>
  )
}


export default Profile 