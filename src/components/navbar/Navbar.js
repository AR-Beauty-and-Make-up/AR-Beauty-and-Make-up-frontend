import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import logo from '../../static/images/logo.jpg'

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
  
}));

const Navbar = () =>  {
  const classes = useStyles();
  const history = useHistory();


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
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
            
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar
