import {useContext, useEffect, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import {Avatar, Menu, MenuItem} from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {UserContext} from '../../providers/userProvider';
import UserService from '../../services/UserService';
import { useCookies } from 'react-cookie'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const MenuListComposition = () =>  {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  
  
  useEffect(() => {

    
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const AvatarLogin = () => {
    if(user?.photo){
      return <Avatar className={classes.avatar} alt="Avatar" src={user?.photo} />
    }
    else {
      return (
        <Avatar className={classes.avatar} alt="Avatar" >
          {user?.fullname[0].toUpperCase()}
        </Avatar>
      )
    }
  }

  const close = () => {
    UserService().logout().then(() => {
      removeCookie("jwt")
      setUser(null)
      history.push('/')
    })
  }



  return (
    <div className={classes.root}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AvatarLogin />
        </Button>
        <Menu 
          open={open} 
          anchorEl={anchorRef.current} 
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
          
          }}
          getContentAnchorEl={null}
          >
          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
            <MenuItem onClick={() => history.push("/profile")} >Perfil</MenuItem>
            <MenuItem onClick={() => history.push("/purchases")}>Mis compras</MenuItem>
            <MenuItem onClick={() => close()}>Cerrar sesion</MenuItem>
          </MenuList>
        </Menu>
    </div>
  );
}


export default MenuListComposition