import styled from "styled-components"
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
const Container = styled.div`
    width:100%;
    position:relative;
    height:100%;

    & .videoSliderIcon{
        position:absolute;
        width:50px;
        height:100%;
        background: rgba(0,0,0,0.2);
        color: var(--red);
        top:0;
        bottom:0;
        margin:auto;
        cursor: pointer;
        z-index:2;

        &.left{
            left:0;
        
        }
        &.right{
            right:0;
        }
    }
`;
const SliderWrapper = styled.ul`
    display:flex;
    width: max-content;
    height:100%;   
`;
const SliderItem = styled.li`
    width: 250px;
    height: 300px;
    list-style:none;
    margin: 0 5px;
    transform: translateX(${props=>props.slideIndex * -260}px);
    transition: all 1s ease;  
    & .link{
        width:100%;
        height:100%;
        color:black;
        display:block;
    }
`;
const Iframe = styled.iframe`
    width:100%;
    height:150px;
    background: var(--lightblue);
`;
const ContentHolder = styled.div`
    width:100%;
    height:150px;
`;
const Ressort = styled.h5`
    color: var(--gray);
    margin-bottom:10px;
`;
const Theme = styled.h4`
    color: var(--red);
    margin-bottom: 10px;
`;
const ContentTitle = styled.h3`
    color: #000;
`;
const VideoSlider = ({state}) => {
    const sorted = state.sort((a,b)=>(a.clicked < b.clicked) ? 1 : -1);
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction)=>{
       if(direction === "left"){
           setSlideIndex(slideIndex > 0 ? slideIndex-1 : 0);
       }
       else{
           setSlideIndex(slideIndex < sorted.length - 4 ? slideIndex + 1 : sorted.length - 4);
       }
    }

  return (
    <Container>
        <IoIosArrowBack className="videoSliderIcon left" onClick={()=>handleClick("left")}/>
        <SliderWrapper >
        {
            sorted.map((item, index)=>(
                <SliderItem key={item._id} index={index} slideIndex={slideIndex}>
                    <Link to={{pathname:`/videosArticles/${item._id}`}} className="link" title={item.theme}>
                        <Iframe src={item.src} alt={item.title} title={item.theme}/>
                        <ContentHolder>
                            <Ressort>{item.ressort}</Ressort>
                            <Theme>{item.theme}</Theme>
                            <ContentTitle>{item.title}</ContentTitle>
                        </ContentHolder>
                    </Link>
                </SliderItem>
            ))
        }
        </SliderWrapper>
        <IoIosArrowForward className="videoSliderIcon right" onClick={()=>handleClick("right")}/>
    </Container>
  )
}

export default VideoSlider
