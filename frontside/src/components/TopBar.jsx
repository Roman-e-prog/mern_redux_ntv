import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {getAllBoersenwerte} from "../features/boersenwerte/boersenwerteSlice";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillSunFill} from "react-icons/bs";
import { useEffect } from "react";
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
    height:30vh;
    background: var(--white);
    display:flex;
    border-bottom: 1px solid var(--lightgray);
`;
const Stock = styled.div`
    flex:2;
    height:100%;
`;
const Weather = styled.div`
    flex:1;
    height:100%;
    ${small({display:"none"})}
`;
const TitleHolder = styled.div`
    height:20%;
    display:flex;
    align-items:center;
`;
const Title = styled.h3`
    color: var(--gray);
    font-size:26px;
    margin-left:20px;
    font-weight:400;
`;
const Weatherplace = styled.span`
    color: var(--lightgray);
    font-size:22px;
`;
const ContentHolder = styled.div`
    height:80%;
    width:100%;
    padding:10px 0;
    display:flex;
    flex-wrap:wrap;
`;
const StockContent = styled.div`
    width:32%;
    border-right: 1px solid var(--lightgray);
    @media screen and (max-width:420px){
        display: ${props=>props.index > 8 && "none"}
     }
     & ul{
         display:flex;
         justify-content:space-between;
         margin: 0 5px;

         & li{
             color: var(--gray);
             font-weight:600;
             ${middle({fontWeight:"400"})}
             ${small({fontSize:"12px"})}

             &:first-of-type{
                 color:black;
             }
         }
         & #innerUl{
             display:flex;
             & li:first-of-type{
                 color: var(--gray);
             }
         }
     }
`;
const WeatherIcon = styled.div`
    flex:1;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center; 
    border-right: 1px solid var(--lightgray);
`;
const ActualCelsius = styled.span`
    font-size:50px;
    color: var(--gray);
    margin-left:10px;
`;
const WeatherWeek = styled.div`
    flex:2;
    display:flex;
`;
const WeatherMonday = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
`;
const WeatherTuesday = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
`;

const WeatherTitle = styled.h5`
    font-size:22px;
    color: var(--gray);
    margin:0 auto;
`;
const Celsius = styled.span`
    margin-top:20px;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Day = styled.p`
    font-size:22px;
    color: var(--red);
`;
const Night = styled.p`
    font-size:22px;
    color: var(--lightblue);
`;
const TopBar = () => {
    const {boersenwerte} = useSelector((state)=>state.boersenwerte);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllBoersenwerte());
    }, [dispatch]);
  return <Container>
            <Stock>
                <TitleHolder>
                    <Title>Börsenkurse</Title>
                    <IoIosArrowForward style={{color: "var(--gray)", fontSize:"26px"}}/>
                </TitleHolder>
                <ContentHolder>
                    {
                        boersenwerte.map((boersenwert, index)=>(
                            <StockContent key={boersenwert._id} index={index}>
                                <ul>
                                    <li>{boersenwert.title}</li>
                                    <li><ul id="innerUl">
                                    <li>{boersenwert.value}</li>
                                    <li>{boersenwert.up.includes("-") ? <BsFillArrowDownCircleFill style={{color:"red", margin:"0 5px"}}/>: <BsFillArrowUpCircleFill style={{color:"green", margin:"0 5px"}}/> }</li>
                                    <li>{boersenwert.up.includes("-") ? <div style={{color:"red"}}>{boersenwert.up}</div>: <div style={{color:"green"}}>{boersenwert.up}</div>}</li>
                                    </ul></li>
                                </ul>
                            </StockContent>
                        ))
                    }
                </ContentHolder>
            </Stock>
            <Weather>
            <TitleHolder>
                    <Title>Wetter |</Title>
                    <Weatherplace>Berlin</Weatherplace>
                </TitleHolder>
                <ContentHolder>
                    <WeatherIcon>
                        <BsFillSunFill style={{color:"yellow", fontSize:"50px"}}/>
                        <ActualCelsius>6°</ActualCelsius>
                    </WeatherIcon>
                    <WeatherWeek>
                        <WeatherMonday>
                            <WeatherTitle>Mo</WeatherTitle>
                            <Celsius>
                                <Day>5°</Day>
                                <Night>/1°</Night>
                            </Celsius>
                        </WeatherMonday>
                        <WeatherTuesday>
                        <WeatherTitle>Di</WeatherTitle>
                            <Celsius>
                                <Day>6°</Day>
                                <Night>/0°</Night>
                            </Celsius>
                        </WeatherTuesday>
                    </WeatherWeek>
                </ContentHolder>
            </Weather>
  </Container>;
};

export default TopBar;
