import React from 'react'
import img1 from "../../static/images/home2.jpg"
import img2 from "../../static/images/home.jpg"
import Slider from 'infinite-react-carousel';
import { Avatar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 10,
    },
  }));
const HomePage = () => {
    const classes = useStyles()

    return(
        <div className={classes.root}>
            <Slider dots>
                <div>
                    <img src={img2} alt="logo" className={{height: 100}}/>
                </div>
                <div>
                    <img src={img1} alt="logo" className={{height: 100}}/>
                </div>
                
            </Slider>
            
            

        </div>
    )

}


export default HomePage