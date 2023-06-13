import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMainNews, incrementStars, reset } from '../../features/news/newsSlice';
import {AiFillStar} from 'react-icons/ai';
import {small, middle} from '../../responsive';
const Container = styled.div`
    width:88%;
    background:var(--white);
    margin:0 auto;
    min-height:100vh;
    padding:10px;
    ${middle({width:"100%", margin:"0"})}
`;
const Page = styled.span``;
const Wrapper = styled.div`
  width:100%;
  padding:20px 10px;
`;
const ImageHolder = styled.div`
  width:100%;
`;
const Image = styled.img`
  width:90%;
  height:300px;
  object-fit: cover;
  margin-bottom:5px;
`;
const ContentHolder = styled.div``;
const Ressort = styled.h3`
  font-size:20px;
  color:var(--gray);
`;
const Theme = styled.h3`
font-size:20px;
color:var(--red);
margin: 10px 0;
`;
const Title = styled.h2`
  font-size:26px;
  margin.bottom:10px;
`;
const Content = styled.p``;
const Evaluate = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  padding:0 20px;
  margin-top:10px;
  ${middle({justifyContent:"center"})};
  ${small({flexDirection:"column"})};
`;
const EvaluateTitle = styled.h2`
  font-size:20px;
  margin-right:5px;
  ${small({fontSize:"16px"})};
`;
const IconHolder = styled.div`
  display:flex;
  width:20%;
  align-items:center;
  ${small({width:"100%", marginTop:"10px"})};
`;
const EvaluateForm = styled.form`
    display:flex;
  & .starlink{
    font-size:24px;
    margin: 10px 5px;
    ${small({fontSize:"20px"})};
  }
  & #bewertung{
    background:var(--blue);
    color:var(--white);
    padding:5px;
    border:none;
    cursor: pointer;
    ${small({fontSize:"14px", padding:"2px"})};
  }
`;
const MainNewsArticles = () => {
    const dispatch = useDispatch();
    const mainnewsArticle = useSelector((state)=>state.mainnews.mainNews);
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getMainNews(id))
        return ()=>{
          dispatch(reset())
        }
    },[dispatch, id])
        //Artikelbewertung
        const stars = [1,2,3,4,5];
        const [starCount, setStarCount] = useState(0);
        const [backgrounds, setBackgrounds] = useState(Array(stars.length).fill(""));
        const [disabled, setDisabled] = useState(false);
        const handleStars = (index)=>{
          setStarCount(index+1);
          setBackgrounds(backgrounds.map((bg, i)=> i <= index ? "yellow": ""));
        }
        const onSubmit = (e)=>{
          e.preventDefault();
          const evaluateData = {
            starCount,
            id:id,
          }
          dispatch(incrementStars(evaluateData));
          setDisabled(true);
        }
  return (
    <Container>
      <Page><Link to="/" className='link'>Startseite</Link>/{mainnewsArticle.ressort}/{mainnewsArticle.title}</Page>
         <Wrapper>
        <ImageHolder>
          <Image src={mainnewsArticle.img} alt={mainnewsArticle.title} title={mainnewsArticle.title}/>
        </ImageHolder>
        <ContentHolder>
          <Ressort>{mainnewsArticle.ressort}</Ressort>
          <Theme>{mainnewsArticle.theme}</Theme>
          <Title>{mainnewsArticle.title}</Title>
          <Content>{mainnewsArticle.content}</Content>
        </ContentHolder>
        <Evaluate>
          <EvaluateTitle>Bitte geben Sie eine Bewertung ab:</EvaluateTitle>
          <IconHolder>
          <EvaluateForm onSubmit={onSubmit}>
            {stars.map((item, index)=>(
              <span onClick={()=>handleStars(index)} key={index}><AiFillStar className='starlink' style={{color:backgrounds[index]}}/></span>
            ))}
              <button title="Bewertung" id="bewertung" onClick={onsubmit} disabled={disabled}>Jetzt bewerten</button>
            </EvaluateForm>
          </IconHolder>
        </Evaluate>
      </Wrapper>
    </Container>
  )
}

export default MainNewsArticles
