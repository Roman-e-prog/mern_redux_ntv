import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./ImgSlider.css";
import { BiImages } from "react-icons/bi"
export default class ImgSlider extends Component {
  render() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 1200,
        slidesToShow: 4,
        slidesToScroll: 4
    }
    return (
        <div className='fullContainer'>
        <h2>Bilderserien</h2>
        <Slider {...settings}>
          <div className='imgHolder'>
            <img src="../../img/ukraine.jpg" alt="soldat"/>
            <BiImages className="icon"/>
          </div>
          <div className='imgHolder'>
          <img src="../../img/essen.jpg" alt="sandwich"/>
          <BiImages className="icon"/>
          </div>
          <div className='imgHolder'>
          <img src="../../img/football_1.jpg" alt="quaterback"/>
          <BiImages className="icon"/>
          </div>
          <div  className='imgHolder'>
          <img src="../../img/golf.jpg" alt="golfspieler"/>
          <BiImages className="icon"/>
          </div>
          <div className='imgHolder'>
          <img src="../../img/kanzleramt.jpg" alt="kanzleramt"/>
          <BiImages className="icon"/>
          </div>
          <div className='imgHolder'>
          <img src="../../img/music.jpg" alt="Musikkonzert"/>
          <BiImages className="icon"/>
          </div>
          <div className='imgHolder'>
          <img src="../../img/paddling.jpg" alt="paddling"/>
          <BiImages className="icon"/>
          </div>
          <div className='imgHolder'>
          <img src="../../img/verschmutzung.jpg" alt="Müll im Meer"/>
          <BiImages className="icon"/>
          </div>
        </Slider>
      </div>
    );
  }
}

