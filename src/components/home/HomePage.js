import React from 'react'
import img1 from "../../static/images/home2.jpg"
import img2 from "../../static/images/home.jpg"
import Slider from 'infinite-react-carousel';
import './homepage.scss'


const HomePage = () => {

    return(
        <div className="home-page">
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