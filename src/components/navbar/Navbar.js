import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import logo from '../../static/images/logo.jpg'
import Button from '@material-ui/core/Button';
import { Avatar, Grid } from '@material-ui/core';
import { UserContext } from '../../providers/userProvider';
import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

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
  const [user, setUser] = useContext(UserContext)
  const [language, setLanguage] = useContext(LanguageContext)

  const avatar = (user) => {
    if(user.photo){
      return <Avatar alt="Avatar" src={user.photo} />
    }
    else {
      return <Avatar alt="Avatar" >{user.fullname[0].toUpperCase()}</Avatar>
    }
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Grid container >
            <Grid item xs={6} className={classes.navbar}>
              <img src={logo} alt="logo" className={classes.logo} />
              <Typography className={classes.title} variant="h6">
                <div onClick={() => history.push('/')}>
                  {TEXT[language].navbar.title}
                </div>
              </Typography>
                <Typography className={classes.items} 
                  variant="h7"
                  onClick={() => history.push('/store')}
                  >
                    {TEXT[language].navbar.subtitle1}
                </Typography>
              <Typography className={classes.items} 
                variant="h7"
                onClick={() => history.push('/scheduler')}
                >
                  {TEXT[language].navbar.subtitle2}
              </Typography>
              <Typography className={classes.items} 
                variant="h7"
                onClick={() => history.push('/services')}
                >
                  {TEXT[language].navbar.subtitle3}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.login}>
            {user?avatar(user):<Button className={classes.items} 
                variant="h7"
                onClick={() => history.push('/login')}
                >
                  {TEXT[language].navbar.login}
              </Button>}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar
