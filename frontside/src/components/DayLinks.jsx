import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getAllDayLinks} from "../features/dayLinks/dayLinksSlice";
import { useEffect } from "react";
import {small, middle, large} from "../responsive";
const Container = styled.div`
    width:90%;
    margin: 0 auto;
    height:50vh;
`;
const DayHolder = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin: 10px 0;
`;
const DayLinkImageHolder = styled.div`
    flex:1;
`;
const DayLinkImage = styled.img`
    width:200px;
    height:100px;
`;
const DayLinkContentHolder = styled.div`
    flex:2;
    ${large({marginLeft:"5px"})};
    ${middle({marginLeft:"10px"})};
`
;
const DayLinkTitle = styled.h3`
    color: ${props=>props.name === "tag" && "var(--red)"};
    color: ${props=>props.name === "boersentag" && "var(--blue)"};
    color: ${props=>props.name === "sporttag" && "green"};
    margin-bottom: 20px;
`;
const DayLinkContent = styled.p`
    font-size:24px;
    font-weight:500;
    color:#000;
    ${large({fontSize:"20px"})};
    ${middle({fontSize:"18px"})};
    ${small({fontSize:"16px"})};
`;
const DayLinks = () => {
    const {dayLinks} = useSelector((state)=>state.dayLinks);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllDayLinks());
    }, [dispatch]);
    console.log(dayLinks)
  return <Container>
        {dayLinks.map((item)=>(
            <Link to={{pathname: `/${item.ident}`}} className="link" key={item.ident}>
            <DayHolder key={item._id}>
            <DayLinkImageHolder>
                <DayLinkImage src={item.img} alt={item.title}/>
            </DayLinkImageHolder>
            <DayLinkContentHolder>
                <DayLinkTitle name={item.ident}>{item.title}</DayLinkTitle>
                <DayLinkContent>{item.content}</DayLinkContent>
            </DayLinkContentHolder>
      </DayHolder>
      </Link>

        ))}
      
  </Container>;
};

export default DayLinks;
