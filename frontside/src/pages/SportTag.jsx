import React from 'react'
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import {useSelector,useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getAllMainNews,} from "../features/news/newsSlice";
import {getAllInlineNews} from "../features/inlineNews/inlineNewsSlice";
import {getAllVideos} from "../features/video/videoSlice"
import {IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import {small, middle} from '../responsive';
import MobileNavbar from '../components/MobileNavbar';
const Container = styled.div`
  width:88%;
  background:var(--white);
  margin:0 auto;
  ${middle({width:"100%", margin:"0"})};
`;
const ArticleWrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
`;
const TitleHolder = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  padding:20px;
`;
const Title = styled.h1`
  color: var(--gray);
  font-size: 26px;
`;
const SectionWrapper = styled.div`
  width:100%;
  display:flex;
`;
const NewsWrapper = styled.div`
  width:65%;
  ${small({width:"100%"})};
`;
const Videos = styled.article`
  width:35%;
  padding:10px;
  border: 1px solid var(--gray);
  margin: 20px 5px 20px 5px;
  ${small({display:"none"})}
`;
const Articles = styled.article`
  width:100%;
  padding:20px;
`;
const NewsHolder = styled.div`
  width:100%;
`;
const Section = styled.section`
  width:100%;
  margin:20px auto;
`;
const ImageHolder = styled.div`
  width:100%;
`;
const ContentHolder = styled.div`
  width:100%;
  max-height:200px;
  overflow:hidden;
`;
const MainnewsImage = styled.img`
  width:90%;
  height:300px;
  object-fit:cover;
`;
const MainnewsRessort = styled.h5`
  color:var(--gray);
  margin: 5px 0;
`;
const MainnewsTheme = styled.h4`
  color:var(--red);
  margin-bottom:5px;
`;
const MainnewsTitle = styled.h3`
  font-size:20px;
  margin-bottom:10px;
`;
const MainnewsContent = styled.p``;
const InlineNewsHolder = styled.div`
  width:100%;
  margin: 20px 0;
`;
const InlineContentHolder = styled.div`
  margin:0 5px;
  max-height:200px;
  overflow:hidden;
`;
const InlineSection = styled.div`
  display:flex;
  margin:20px auto;
  ${middle({flexDirection:"column"})}
`;
const InlineImage = styled.img`
  width:300px;
  height:200px;
`;
const InlineRessort = styled.h5`
  color:var(--gray);
  margin-bottom: 5px;
`;
const InlineTheme = styled.h4`
  color:var(--red);
  margin-bottom: 5px;
`;
const InlineTitle = styled.h3`
  margin-bottom:5px;
`;
const InlineContent = styled.p`
`;
const DataHolder = styled.div`
  width:100%;
`;
const Iframe = styled.iframe`
  background:var(--lightblue);
  width:90%;
  margin: 0 auto;
`;
const VideoRessort = styled.h5``;
const VideoTheme = styled.h4``;
const VideoTitle = styled.h3``

const SportTag = () => {
    const dispatch = useDispatch();
    const allMainNews = useSelector((state)=>state.mainnews.allMainNews);
    const allInlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
    const videos = useSelector((state)=>state.videos.videos);
    const [filteredMainNews, setFilteredMainNews] = useState([]);
    const [filteredInlineNews, setFilteredInlineNews] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(()=>{
        dispatch(getAllMainNews());
        dispatch(getAllInlineNews());
        dispatch(getAllVideos());

    },[dispatch])  
    useEffect(()=>{
      setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Sport Tag"))
      setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Sport Tag"))
      setFilteredVideos(videos.filter((item)=>item.ressort === "Sport Tag"))
  },[allMainNews, allInlineNews, videos])
        //mobile
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        useEffect(() => {
          const handleResize = () => setWindowWidth(window.innerWidth);
          window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  return (
    <Container>
        {windowWidth <= 420 ? <MobileNavbar/>: <Navbar/>}
       <ArticleWrapper>
          <TitleHolder>
                <Title>Der Sport Tag</Title>
                <IoIosArrowForward style={{color:"var(--gray)", fontSize:"26px", marginLeft:"5px"}}/>
              </TitleHolder>
                <SectionWrapper>
                  <NewsWrapper>
                    <Articles>
                      <NewsHolder>
                        {filteredMainNews.length > 0 && <DataHolder>
                          {
                            filteredMainNews.map((item)=>(
                              <Link to={{pathname: `/mainNewsArticles/${item._id}`}} className="link" style={{color:"black"}} key={item._id}>
                              <Section key={item._id}>
                                <ImageHolder>
                                  <MainnewsImage src={item.img} alt={item.theme} title={item.theme}/>
                                </ImageHolder>
                                <ContentHolder>
                                  <MainnewsRessort>{item.ressort}</MainnewsRessort> 
                                  <MainnewsTheme>{item.theme}</MainnewsTheme>
                                  <MainnewsTitle>{item.title}</MainnewsTitle>
                                  <MainnewsContent>{item.content.slice(0,200)}...</MainnewsContent>
                                </ContentHolder>
                              </Section>
                              </Link>
                            ))
                          }
                          </DataHolder>}
                      </NewsHolder>
                      <InlineNewsHolder>
                      {filteredInlineNews.length > 0 && <DataHolder>
                          {
                            filteredInlineNews.map((item)=>(
                              <Link to={{pathname: `/inlineNewsArticles/${item._id}`}} className="link" style={{color:"black"}} key={item._id}>
                              <InlineSection key={item._id}>
                                <ImageHolder>
                                  <InlineImage src={item.img} alt={item.theme} title={item.theme}/>
                                </ImageHolder>
                                <InlineContentHolder>
                                  <InlineRessort>{item.ressort}</InlineRessort>
                                  <InlineTheme>{item.theme}</InlineTheme>
                                  <InlineTitle>{item.title}</InlineTitle>
                                  <InlineContent>{item.content.slice(0,200)}...</InlineContent>
                                </InlineContentHolder>
                              </InlineSection>
                              </Link>
                            ))
                          }
                          </DataHolder>}
                      </InlineNewsHolder>
                    </Articles>
                  </NewsWrapper>
                <Videos>
                  <TitleHolder>
                        <Title>Videos</Title>
                        <IoIosArrowForward style={{color:"var(--gray)", fontSize:"26px", marginLeft:"5px"}}/>
                    </TitleHolder>
                    <Articles>
                    {filteredVideos.length > 0 && <DataHolder>
                          {
                            filteredVideos.map((item)=>(
                              <Link to={{pathname:`/videosArticles/${item._id}`}} className="link" style={{color:"black"}} key={item._id}>
                              <Section key={item._id}>
                                <ImageHolder>
                                  <Iframe src={item.src} alt={item.theme} title={item.theme}/>
                                </ImageHolder>
                                <ContentHolder>
                                  <VideoRessort>{item.ressort}<span>  {new Date(item.createdAt).toLocaleString("de-De",{
                                    hour:"numeric",minute:"numeric"
                                  })}</span></VideoRessort>
                                  <VideoTheme>{item.theme}</VideoTheme>
                                  <VideoTitle>{item.title}</VideoTitle>
                                </ContentHolder>
                              </Section>
                              </Link>
                            ))
                          }
                          </DataHolder>}
                    </Articles>
                </Videos>
              </SectionWrapper>
            </ArticleWrapper>
          <Footer/>
    </Container>
  )
}

export default SportTag

