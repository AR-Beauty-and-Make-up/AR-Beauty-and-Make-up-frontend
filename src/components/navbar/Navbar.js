import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";

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
    paddingRight: 5 
  }
  
}));

const Navbar = () =>  {
  const classes = useStyles();
  const history = useHistory();


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <div onClick={() => history.push('/')}>
              AR Beauty & make up
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
