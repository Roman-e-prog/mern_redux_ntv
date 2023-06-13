import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getVideos } from '../../features/video/videoSlice';
import {middle} from '../../responsive';
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
const VideoHolder = styled.div`
  width:100%;
`;
const Video = styled.iframe`
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
const VideosArticles = () => {
    const dispatch = useDispatch();
    const videosArticle = useSelector((state)=>state.videos.video);
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getVideos(id))
    },[dispatch, id])
  return (
    <Container>
      <Page><Link to="/" className='link'>Startseite</Link>/{videosArticle.ressort}/{videosArticle.title}</Page>
        <Wrapper>
          <VideoHolder>
            <Video src={videosArticle.src} alt={videosArticle.title} title={videosArticle.title}/>
          </VideoHolder>
          <ContentHolder>
            <Ressort>{videosArticle.ressort}</Ressort>
            <Theme>{videosArticle.theme}</Theme>
            <Title>{videosArticle.title}</Title>
          </ContentHolder>
        </Wrapper>
    </Container>
  )
}

export default VideosArticles
