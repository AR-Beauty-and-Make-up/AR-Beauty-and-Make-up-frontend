import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import logo from '../../static/images/logo.jpg'
import Button from '@material-ui/core/Button';
import { Grid, Link } from '@material-ui/core';
import { UserContext } from '../../providers/userProvider';
import Cart from '../cart/Cart' 
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MenuListComposition from './Menu'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  social: {
    backgroundColor: "#f3d5d7",
    minHeight: "35px"
  },
  menu: {
    backgroundColor: "#f4f1f1"
  },
  title: {
    color: "black",
    paddingRight: 10,
    cursor: 'pointer' 
  },
  items: {
    color: "black",
    paddingRight: 5,
    cursor: 'pointer' 
  },
  logo: {
    maxWidth: 50,
    borderRadius: '50%',
    marginRight: '10px',
    cursor: 'pointer'
  },
  login: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  navbarContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  icon: {
    color: "black",
    paddingRight: "5px",
  }
  
}));



const Navbar = () =>  {
  const classes = useStyles()
  const history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const {pathname} = useLocation()

  const Loginbuttom = () => {
    if(!user) {
      return (
        <>
          <Button className={classes.items} 
          variant="h7"
          onClick={() => history.push('/login')}>
            Iniciar sesion
          </Button>
          <Button className={classes.items} 
          variant="h7"
          onClick={() => history.push('/sign-up')}>
            Crear cuenta
          </Button>
        </>
      )
    }
    else {
      return <MenuListComposition />
    }
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar className={classes.social}>
          <Grid container >
              <Grid item xs={6} className={classes.navbarContent}>
                <Typography className={classes.title}>
                  info.arbm@gmail.com (011) 62434990
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.login}>
                <Link href="https://www.instagram.com/ar_beautyandmakeup/" >
                  <InstagramIcon className={classes.icon}/>
                </Link>
                <Link href="https://www.facebook.com/ar.beautyandmakeupok/" >
                  <FacebookIcon className={classes.icon}/>
                </Link>
              </Grid>
          </Grid>
          
        </Toolbar>
        <Toolbar className={classes.menu}>
          <Grid container >
            <Grid item xs={6} className={classes.navbarContent}>
              <img src={logo} alt="logo" className={classes.logo} onClick={() => history.push('/')}/>
              <Typography className={classes.title} variant="h5">
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
                { (user && user.isAdmin) &&
                    <Typography className={classes.items} 
                    variant="h7"
                    onClick={() => history.push('/scheduler')}
                    >
                      Turnos
                  </Typography>
                }
              <Typography className={classes.items} 
                variant="h7"
                onClick={() => history.push('/services')}
                >
                  Servicios
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.login}>
              <Loginbuttom />
              {!user?.isAdmin&&<Cart />}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar
