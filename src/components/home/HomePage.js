import React from 'react'
import img1 from "../../static/images/home2.jpg"
import img2 from "../../static/images/home.jpg"
import Slider from 'infinite-react-carousel';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import './home.scss'

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 10,
    },
    img: {
        height: "100%"
    }
  }));
const HomePage = () => {
    const classes = useStyles()

    return(
        <Container maxWidth="xl">
            <Slider dots autoplay={true} autoplaySpeed={4500}>
                <div className="photoContainerHome">
                    <img src={img2} alt="logo" />
                </div>
                <div className="photoContainerHome">
                    <img src={img1} alt="logo" />
                </div>
                
            </Slider>
        </Container>
    )

}


export default HomePage