import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import logo from '../../static/images/logo.jpg'
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menu: {
    backgroundColor: "#c19e9f"
  },
  title: {
    paddingRight: 10
  },
  items: {
    color: "white",
    paddingRight: 5,
    cursor: 'pointer' 
  },
  logo: {
    maxWidth: 50,
    borderRadius: '50%',
    marginRight: '10px',
  },
  login: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  
}));

const Navbar = () =>  {
  const classes = useStyles();
  const history = useHistory();


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Grid container >
            <Grid item xs={6} className={classes.navbar}>
              <img src={logo} alt="logo" className={classes.logo} />
              <Typography className={classes.title} variant="h6">
                <div onClick={() => history.push('/')}>
                  AR Beauty & Make up
                </div>
              </Typography>
                <Typography className={classes.items} 
                  variant="h7"
                  onClick={() => history.push('/store')}
                  >
                    Tienda
                </Typography>
              <Typography className={classes.items} 
                variant="h7"
                onClick={() => history.push('/scheduler')}
                >
                  Turnos
              </Typography>
              <Typography className={classes.items} 
                variant="h7"
                onClick={() => history.push('/services')}
                >
                  Servicios
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.login}>
              <Button className={classes.items} 
                variant="h7"
                onClick={() => history.push('/login')}
                >
                  Iniciar sesion
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar
