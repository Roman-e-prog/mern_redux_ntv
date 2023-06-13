import styled from "styled-components";
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getAllBilderserie} from "../features/bilderserien/bilderserieSlice";
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
    height:100vh;
    background: #242121;
    position:relative;
`;
const Icon = styled.span`
    background:transparent;
    width:50px;
    height:50px;
    border: 2px solid var(--white);
    border-radius:50%;
    display: flex;
    align-items:center;
    justify-content:center;
    position: absolute;
    top:0;
    bottom:0;
    margin:auto;
    left: ${props=>props.direction ==="left" && "20"}px;
    right: ${props=>props.direction ==="right" && "20"}px;
    z-index:3;
    cursor: pointer;
        & .arrow{
            color: var(--white);
            font-size: 40px;
        }
`;
const Wrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    overflow:hidden;
`;
const SliderItem = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    transform: translateX(${props=>props.slideIndex * - 100}%);
`;
const ImageHolder = styled.div`
    width:80%;
    height:80%;
    margin-top:50px;
    margin-right:auto;
    margin-left:auto;

`;
const Img = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`;
const ContentHolder = styled.div`
    width:100vw;
    height:200px;
    position:sticky;
    bottom:0;
    background: rgba(0,0,0,0.5);
    display:flex;
    align-items:center;
    padding:20px;
    ${small({height:"250px", fontSize:"14px"})}
`;
const Content = styled.p`
    color: var(--white);
`;

const Bilderserien = () => {
    const {allBilderserie} = useSelector((state)=>state.bilderserie);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllBilderserie());
    }, [dispatch]);
    const bilderseries = [...allBilderserie];
        const [sliderPosition, setSliderPosition] = useState(0);
    const handleClick = (name)=>{
            if(name === "left"){
                setSliderPosition(sliderPosition > 0 ? sliderPosition -1 : 0);
            }
            else{
                setSliderPosition(sliderPosition < allBilderserie.length -1 ? sliderPosition +1 : allBilderserie.length -1);
            }
    }
    
  return (
    <Container>
        <Icon direction="left" onClick={()=>handleClick("left")} style={sliderPosition === 0 ? {opacity:"0.5"} : {opacity:"1"}}>
            <IoIosArrowBack className="arrow"/>
        </Icon>
        <Wrapper>
            {
                bilderseries.map((serie)=>(
                    <SliderItem key={serie._id} slideIndex={sliderPosition}>
                        <ImageHolder>
                            <Img src={serie.img} alt={serie.alt} title={serie.title}/>
                        </ImageHolder>
                        <ContentHolder>
                                <Content>{serie.content}</Content>
                            </ContentHolder>
                    </SliderItem>
                ))
            }
        </Wrapper>
        <Icon direction="right" onClick={()=>handleClick("right")} style={sliderPosition === allBilderserie.length-1 ? {opacity:"0.5"} : {opacity:"1"}}>
            <IoIosArrowForward className="arrow"/>
        </Icon>
    </Container>
  )
}

export default Bilderserien