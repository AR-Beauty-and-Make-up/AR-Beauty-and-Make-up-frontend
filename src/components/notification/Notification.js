import {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  modal: {
    background: 'rgb(190,148,147)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '8px 30px',
  },
}));


const Notification = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert className={classes.modal} onClose={handleClose} severity="info">
            {props.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Notification