import styled from "styled-components";
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {small, middle, large} from '../responsive';
import { useEffect } from "react";
import {getAllSliderItems} from '../features/topSlider/sliderItemsSlice';

const Container = styled.div`
    width:100%;
    height:30vh;
    padding:2px;
`;
const SliderTopTitleHolder = styled.div`
    height:20%;
    display:flex;
    align-items:center;
`;
const SliderTitle = styled.h3`
    color: var(--gray);
    font-size:26px;
    margin-left:20px;
    font-weight:400;
    ${middle({fontSize:"22px"})}
`;
const SliderHolder = styled.div`
    height:80%;
    width:100%;
    padding:5px;
    position:relative;
    display:flex;
    flex-direction:column;

    & .arrow{
        position:absolute;
        top:0;
        bottom:0;
        margin:auto;
        color: var(--gray);
        font-size:40px;
        cursor: pointer;
        z-index:4;
        ${middle({fontSize:"30px"})}
        &.left{
            left:10px;
        }
        &.right{
            right:10px;
        }
    }
`;
const SliderContainer = styled.div`
    width:100%;
    height:90%;
    display:flex;
    align-items:center;
  transform: translateX(${(props) => props.slideIndex * -100}%);
`;
const FieldWrapper = styled.div`
    height:60%;
    display:flex;
    flex-direction:column;
`;
const Timestamp = styled.div`
    width:760px;
    padding-left:100px;
    margin-bottom:2px;
    height:20%;
    font-size:18px;
    color:var(--gray);
    ${large({width:"500px"})};
    ${middle({width:"490px"})};
    ${small({width:"400px"})};  
`;
const Content = styled.div`
    width:760px;
    height:80%;
    font-size:22px;
    ${large({width:"500px", paddingLeft:"35px"})};
    ${middle({width:"490px"})};
    ${small({width:"400px"})};
    display:flex;
    align-items:center;
    justify-content:center;
`;
const NewsHolder = styled.div`
    width:80%;
    height:100%;
    display:flex;
    flex-direction:column;

    & #title{
        color:var(--red);
        font-weight:600;  
    }
    & #body{
        color:var(--gray);
    }
`;
const DotWrapper = styled.div`
    width:100%;
    height:10%;
    display:flex;
    align-items:center;
    justify-content:center;
    & .dots{
        width:16px;
        height:16px;
        border-radius:50%;
        margin-left:5px;
    }
`;
const SliderTop = () => {
    const dispatch = useDispatch();
    const sliderItems = useSelector((state)=>state.sliderItems.sliderItems);
  
    useEffect(()=>{
    dispatch(getAllSliderItems());
   },[dispatch])  
    const [slideIndex, setSlideIndex] = useState(0);
    //automatic
   const [backgrounds, setBackgrounds] = useState([]);
   useEffect(() => {
    setBackgrounds(
      new Array(sliderItems.length).fill("var(--gray)")
    );
  }, [sliderItems.length]);

     useEffect(()=>{
        const interval = setInterval(()=>{
            setSlideIndex((prevSlideIndex)=> prevSlideIndex < sliderItems.length -1 ? prevSlideIndex+1 : 0)
        }, 2400)
      
        return ()=>{
            clearInterval(interval)
        }
    },[sliderItems.length])
useEffect(()=>{
    setBackgrounds((prevBackgrounds)=>prevBackgrounds.map((bg, i)=>i === slideIndex ? "var(--red)":"var(--gray)"))
},[slideIndex])
    //manuell
    const handleClick = (direction)=>{  
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 0);
        }
        else{
            setSlideIndex(slideIndex < sliderItems.length -1 ? slideIndex +1 : sliderItems.length -1)
        }     
    }

  return <Container>
      <SliderTopTitleHolder>
          <SliderTitle>DAS NEUESTE</SliderTitle>
          <IoIosArrowForward style={{color: "var(--gray)", fontSize:"26px"}}/>
      </SliderTopTitleHolder>
      <SliderHolder>
        <IoIosArrowBack className="arrow left" onClick={()=>handleClick("left")}/>
            <SliderContainer slideIndex={slideIndex}>
               {sliderItems.map((item)=>(
                <FieldWrapper key={item._id}>
                    <Timestamp>{new Date(item.createdAt).toLocaleTimeString("de-De", {
                        hour:"2-digit",
                        minute:"2-digit",
                    })} Uhr</Timestamp>
                    <Content>
                        <NewsHolder>
                            <span id="title">{item.title}</span>
                            <span id="body">{item.body}</span>
                        </NewsHolder>
                    </Content>
                </FieldWrapper>
               ))}
            </SliderContainer>
        <IoIosArrowForward className="arrow right" onClick={()=>handleClick("right")}/>
        <DotWrapper>
            {backgrounds.map((bg, i)=>(
                <div key={i} style={{background: bg}} className="dots"></div>
            ))}
        </DotWrapper>
      </SliderHolder>
  </Container>;
};

export default SliderTop;
