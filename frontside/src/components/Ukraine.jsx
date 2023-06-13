import { useSelector, useDispatch } from "react-redux";
import {getAllUkraineNews} from "../features/ukraineNews/ukraineNewsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {small,middle} from "../responsive";

const Container = styled.div`
    width:90%;
    height:20vh;
    margin:0 auto;
`;
const TitleContainer = styled.div`
    width:100%;
    height:5vh;
    padding:5px;
    background: var(--red);
    display:flex;
    align-items:center;
`;
const Title = styled.h3`
    color: var(--white);
    font-size:25px;
    font-weight:300;
    ${middle({fontSize:"20px"})}
    ${small({fontSize:"18px"})}
`;
const UkraineNewsHolder = styled.div`
    width:100%;
    height:10vh;
    cursor: pointer;
`;
const UkraineNews = styled.p`
    font-size:25px;
    color: #000;
    ${middle({fontSize:"20px"})}
    ${small({fontSize:"18px"})}
`;
const Downline = styled.div`
    width:100%;
    height:4px;
    background: var(--red);
`;

const Ukraine = () => {
    const dispatch = useDispatch();
    const allUkraineNews = useSelector((state)=>state.ukraineNews.allUkraineNews);
   useEffect(()=>{
    dispatch(getAllUkraineNews())
   },[dispatch]) 
   const latestNews = allUkraineNews && allUkraineNews.length ? [...allUkraineNews].sort((a,b)=>a.createdAt < b.createdAt ? 1: -1)[0]: null;
  return <Container>
      <TitleContainer>
          <Title>UkraineKrieg-Liveticker</Title>
      </TitleContainer>
      <UkraineNewsHolder>
        {latestNews ? <> 
            <Link to="/ukraine" className="link" title="Ukrainekrieg Liveticker">
                    <UkraineNews>
                        +++{new Date(latestNews.createdAt).toLocaleTimeString("de-De", {
                            hour:"2-digit",
                            minute:"2-digit",
                        })}{latestNews.text}+++
                    </UkraineNews>
                    </Link> 
                <Downline></Downline> 
              </>:null }
                 
      </UkraineNewsHolder>
  </Container>;
};
export default Ukraine;
