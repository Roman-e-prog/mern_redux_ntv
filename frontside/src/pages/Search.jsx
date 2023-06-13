import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNavbar from '../components/MobileNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMainNews } from '../features/news/newsSlice';
import { getAllInlineNews } from '../features/inlineNews/inlineNewsSlice';
import { Link } from 'react-router-dom';
import {IoIosArrowForward} from 'react-icons/io';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:88%;
    margin: 0 auto;
    background:var(--white);
    ${middle({width:"100%", margin:"0"})}
`;
const ContentWrapper = styled.div`
    width:100%;
    padding:20px;
`;
const NewsTitleHolder = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin-top:10px;
`;
const NewsTitle = styled.h3`
    color: var(--gray);
    font-size:26px;
    margin-left:20px;
    font-weight:400;
    ${small({fontSize:"18px"})}
`;
const ArticleHolder = styled.div`
    width:100%;
`;
const Section = styled.section`
    width:100%;
    margin:30px 0;
    padding-bottom:10px;
    cursor:pointer;
`;
const NewsImg = styled.img`
    width:100%;
    height:300px;
    object-fit: cover;
`;
const NewsRessort = styled.h5`
    color: var(--gray);
    font-size:14px;
    margin-bottom:10px;
`;
const NewsTheme = styled.h4`
    color: var(--red);
    margin-bottom:10px;
`;
const ContentTitle = styled.h3`
    font-size:24px;
    margin-bottom:10px;
    color: #000;
`;
const ContentHolder = styled.div`
    width:100%;
    height:60px;
    overflow:hidden;
`;
const Content = styled.p`
    color:#000;
`;

const Search = () => {
    const dispatch = useDispatch();
    const mainnews = useSelector((state)=>state.mainnews.allMainNews);
    const inlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
    const searchValue = useSelector((state)=>state.search.searchValue);
    useEffect(()=>{
        dispatch(getAllMainNews());
        dispatch(getAllInlineNews());
    },[dispatch])
    const concat = mainnews.concat(inlineNews);
    
    const filteredNews = concat.filter((item)=>{
        return Object.values(item).join().toLowerCase().includes(searchValue[0].searchValue.toLowerCase());
    })
        //mobile
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        useEffect(() => {
          const handleResize = () => setWindowWidth(window.innerWidth);
          window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  return (
    <Container>
      {windowWidth <= 420 ? <MobileNavbar/> : <Navbar/>}
        <ContentWrapper>
            <NewsTitleHolder>
                <NewsTitle>Nachrichten zu Ihrer Suche</NewsTitle>
                <IoIosArrowForward style={{fontSize:"26px", color: "var(--gray)"}}/>
            </NewsTitleHolder>
            <ArticleHolder>
            {filteredNews.length ? filteredNews.map((item)=>(
                 <Link to={{pathname: `/${mainnews.some(news => news._id === item._id) ? 'mainNewsArticles' : 'inlineNewsArticles'}/${item._id}`}} className="link" key={item._id}>
                 <Section key={item._id}>
                     <NewsImg src={item.img} alt={item.ressort} title={item.title}/>
                     <NewsRessort>{item.ressort}</NewsRessort>
                     <NewsTheme>{item.theme}</NewsTheme>
                     <ContentTitle>{item.title}</ContentTitle>
                     <ContentHolder>
                     <Content>{item.content}</Content>
                     </ContentHolder>
                 </Section>
                 </Link>
            )) : null}
            </ArticleHolder>
        </ContentWrapper>
      <Footer/>
    </Container>
  )
}

export default Search
