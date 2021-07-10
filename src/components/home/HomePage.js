import React from 'react'
import img1 from "../../static/images/home2.jpg"
import img2 from "../../static/images/home.jpg"
import Slider from 'infinite-react-carousel';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 10,
    },
    img: {
        height: 500
    }
  }));
const HomePage = () => {
    const classes = useStyles()

    return(
        <Container maxWidth="md">
            <Slider dots arrows={false} autoplay={true} autoplaySpeed={4500}>
                <div>
                    <img src={img2} alt="logo" className={classes.img}/>
                </div>
                <div>
                    <img src={img1} alt="logo" className={classes.img}/>
                </div>
                
            </Slider>
        </Container>
    )

}


export default HomePage