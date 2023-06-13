import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import { getInlineAdvertise } from '../../features/advertises/inlineAdvertisesSlice';
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
const ContentHolder = styled.div`
  width:100%;
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
const InlineAdvertiseArticle = () => {
    const dispatch = useDispatch();
    const advertise = useSelector((state)=>state.inlineAdvertises.inlineAdvertise);
    const {id} = useParams();

    useEffect(()=>{
       dispatch(getInlineAdvertise(id)) 
    },[dispatch, id])
  return (
    <Container>
        <Page><Link to="/" className='link' title="Startseite">Startseite</Link>/{advertise.theme}/{advertise.title}</Page>
        <Wrapper>
            <ImageHolder>
                <Image src={advertise.img} alt={advertise.title} title={advertise.title}/>
            </ImageHolder>
            <ContentHolder>
              <Theme>{advertise.theme}</Theme>
              <Title>{advertise.title}</Title>
              <Content>{advertise.content}</Content>
            </ContentHolder>
        </Wrapper>
    </Container>
  )
}

export default InlineAdvertiseArticle
