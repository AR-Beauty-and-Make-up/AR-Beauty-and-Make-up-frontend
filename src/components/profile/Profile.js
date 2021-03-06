import {useEffect, useState, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../../services/UserService'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
    },
    subtitles: {
        textAlign: 'left'
    },
    icon: {
        textAlign: 'right',
        
      },
  }));



const Profile = (props) => {

    const classes = useStyles()

    const [user, setUser] = useState({})
    const [language, setLanguage] = useContext(LanguageContext)

    useEffect(() => {
        UserService().getUser(1).then((response) => {
            setUser(response.data)
        })
    }, [])


    return (
        <div>
            <Container maxWidth="sm">
            <Grid container>
                <Grid item xs={12} className={classes.subtitles}><h2>{TEXT[language].profile.header1}</h2></Grid>
                <Grid item xs={12} className={classes.subtitles}>
                    
                    <Grid item xs={12}><h3>{TEXT[language].profile.header2}</h3></Grid>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    {TEXT[language].profile.email}
                                </Grid>
                                <Grid item xs={4}>
                                    {user.email}
                                </Grid>
                                <Grid item xs={4} className={classes.icon}>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    {TEXT[language].profile.password}
                                </Grid>
                                <Grid item xs={4}>
                                    {user.password}
                                </Grid>
                                <Grid item xs={4} className={classes.icon}>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                        </Grid>
                    </Paper>
                    
                </Grid>
                
                <Grid item xs={12} className={classes.subtitles}>
                    
                    <Grid item xs={12}><h3>{TEXT[language].profile.header3}</h3></Grid>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1}>
                                <Grid item xs={4}>
                                 {TEXT[language].profile.fullname}
                                </Grid>
                                <Grid item xs={4}>
                                    {user.fullname}
                                </Grid>
                                <Grid item xs={4} className={classes.icon}>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    {TEXT[language].profile.dateofbirth}
                                </Grid>
                                <Grid item xs={4}>
                                    {new Date(user.dateOfBirth).toLocaleDateString()}
                                </Grid>
                                <Grid item xs={4} className={classes.icon}>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    {TEXT[language].profile.phone}
                                </Grid>
                                <Grid item xs={4}>
                                    {user.contactNumber}
                                </Grid>
                                <Grid item xs={4} className={classes.icon}>
                                    <IconButton aria-label="delete" className={classes.margin} size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.subtitles}>
                    
                    <Grid item xs={12}><h3>{TEXT[language].profile.address}</h3></Grid>
                    <Paper className={classes.paper}>
                        {user.address}
                    </Paper>
                </Grid>

            </Grid>
            </Container>
        </div>
    )
}


export default Profile 