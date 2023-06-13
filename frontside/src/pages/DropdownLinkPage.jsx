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
import {Link, useParams} from "react-router-dom";
import { getAllAdvertise } from '../features/advertises/advertiseSlice';
import { getAllInlineAdvertise } from '../features/advertises/inlineAdvertisesSlice';
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
  ${small({width:"100%"})}
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

const DropdownLinkPage = () => {
    const dispatch = useDispatch();
    const {li} = useParams();
    const allMainNews = useSelector((state)=>state.mainnews.allMainNews);
    const allInlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
    const videos = useSelector((state)=>state.videos.videos);
    const advertises = useSelector((state)=>state.advertises.advertises);
    const inlineAdvertises = useSelector((state)=>state.inlineAdvertises.inlineAdvertises)
    const [filteredMainNews, setFilteredMainNews] = useState([]);
    const [filteredInlineNews, setFilteredInlineNews] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(()=>{
        dispatch(getAllMainNews());
        dispatch(getAllInlineNews());
        dispatch(getAllVideos());
        dispatch(getAllAdvertise());
        dispatch(getAllInlineAdvertise());

    },[dispatch])  
    useEffect(()=>{
        if(li === "Coronavirusspezial"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Corona News"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Corona News"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Corona News"));
        }
        else if(li === "DasBeste"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Das Beste"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Das Beste"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Das Beste"));
        }
        else if(li === "Unterhaltung"){
          setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Unterhaltung"));
          setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Unterhaltung"));
          setFilteredVideos(videos.filter((item)=>item.ressort === "Unterhaltung"));
        }
        else if(li === "Ratgeber"){
          setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Ratgeber"));
          setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Ratgeber"));
          setFilteredVideos(videos.filter((item)=>item.ressort === "Ratgeber"));
        }
        else if(li === "Panorama"){
          setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Panorama"));
          setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Panorama"));
          setFilteredVideos(videos.filter((item)=>item.ressort === "Panorama"));
        }
        else if(li === "Leben"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Leben"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Leben"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Leben"));
        }
        else if(li === "Technik"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Technik"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Technik"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Technik"));
        }
        else if(li === "Wissen"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Wissen"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Wissen"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Wissen"));
        }
        else if(li === "Auto"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Auto"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Auto"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Auto"));
        }
        else if(li === "Infografik"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Infografik"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Infografik"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Infografik"));
        }
        else if(li === "Regionales"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Regionales"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Regionales"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Regionales"));
        }
        else if(li === "AlleTage"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Alle Tage"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Alle Tage"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Alle Tage"));
        }
        else if(li === "Meinung"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Meinung"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Meinung"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Meinung"));
        }
        else if(li === "Shopping&Service"){
            setFilteredMainNews(advertises.filter((item)=>item.adv === "Anzeige"));
            setFilteredInlineNews(inlineAdvertises.filter((item)=>item.adv === "Anzeige"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Shopping & Service"));
        }
        else if(li === "HeuteLive"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Heute Live"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Heute Live"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Heute Live"));
        }
        else if(li === "Meldungen"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Meldungen"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Meldungen"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Meldungen"));
        }
        else if(li === "Fussball"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Fussball"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Fussball"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Fussball"));
        }
          else if(li === "Motorsport"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Motorsport"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Motorsport"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Motorsport"));
        }
        else if(li === "Tennis"){
          setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Tennis"));
          setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Tennis"));
          setFilteredVideos(videos.filter((item)=>item.ressort === "Tennis"));
        }
        else if(li === "Handball"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Handball"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Handball"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Handball"));
        }
        else if(li === "Eishockey"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Eishockey"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Eishockey"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Eishockey"));
        }
        else if(li === "Basketball"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Baskeball"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Baskeball"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Baskeball"));
        }
        else if(li === "SportTagArchiv"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Sport-Tag-Archiv"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Sport-Tag-Archiv"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Sport-Tag-Archiv"));
        }
        else if(li === "AufEinenBlick"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Auf einen Blick"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Auf einen Blick"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Auf einen Blick"));
        }
        else if(li === "Rohstoffe"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Rohstoffe"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Rohstoffe"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Rohstoffe"));
        }
        else if(li === "Devisen"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Devisen"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Devisen"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Devisen"));
        }
        else if(li === "rr-tvZertifikate"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "rr-tvZertifikate"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "rr-tvZertifikate"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "rr-tvZertifikate"));
        }
        else if(li === "rr-tvFonds"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "rr-tvFonds"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "rr-tvFonds"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "rr-tvFonds"));
        }
        else if(li === "Anleihen"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Anleihen"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Anleihen"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Anleihen"));
        }
        else if(li === "Fonds&ETV"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Fonds & ETV"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Fonds & ETV"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Fonds & ETV"));
        }
        else if(li === "GeldanlageCheck"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Geldanlage Check"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Geldanlage Check"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Geldanlage Check"));
        }
        else if(li === "BörsenTagArchiv"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Börsen Tag Archiv"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Börsen Tag Archiv"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Börsen Tag Archiv"));
        }
        else if(li === "Vorhersage"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Vorhersage"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Vorhersage"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Vorhersage"));
        }
        else if(li === "Regenradar"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Regenradar"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Regenradar"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Regenradar"));
        }
        else if(li === "Pollenflug-undWetterkarte"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Pollenflug-und Wetterkarte"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Pollenflug-und Wetterkarte"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Pollenflug-und Wetterkarte"));
        }
        else if(li === "Top-Videos"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Top-Videos"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Top-Videos"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Top-Videos"));
        }
        else if(li === "rr-tvLive"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "rr-tv Live"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "rr-tv Live"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "rr-tv Live"));
        }
        else if(li === "Programm"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Programm"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Programm"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Programm"));
        }
        else if(li === "Moderatoren"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Moderatoren"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Moderatoren"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Moderatoren"));
        }
        else if(li === "AlleSendungen"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Alle Sendungen"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Alle Sendungen"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Alle Sendungen"));
        }
        else if(li === "Magazine"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Magazine"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Magazine"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Magazine"));
        }
        else if(li === "Teletext"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Teletext"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Teletext"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Teletext"));
        }
        else if(li === "RTL+"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "RTL+"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "RTL+"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "RTL+"));
        }
        else if(li === "Wirtschaft"){
            setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Wirtschaft"));
            setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Wirtschaft"));
            setFilteredVideos(videos.filter((item)=>item.ressort === "Wirtschaft"));
        }
        else if(li === "Politik"){
          setFilteredMainNews(allMainNews.filter((item)=>item.ressort === "Politik"));
          setFilteredInlineNews(allInlineNews.filter((item)=>item.ressort === "Politik"));
          setFilteredVideos(videos.filter((item)=>item.ressort === "Politik"));
      }
    },[allInlineNews,allMainNews,videos, li, advertises, inlineAdvertises])
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
                    <Title>{li.charAt(0).toUpperCase()+li.slice(1).replace(/([A-Z, &])/g, " $1").trim()}</Title>
                    <IoIosArrowForward style={{color:"var(--gray)", fontSize:"26px", marginLeft:"5px"}}/>
                </TitleHolder>
                <SectionWrapper>
                  <NewsWrapper>
                    <Articles>
                      <NewsHolder>
                        {filteredMainNews.length > 0 && <DataHolder>
                          {
                            filteredMainNews.map((item)=>(
                              <Link to={{pathname: item.adv ? `/advertiseArticles/${item._id}`:`/mainNewsArticles/${item._id}`}} className="link" style={{color:"black"}} key={item._id}>
                              <Section key={item._id}>
                                <ImageHolder>
                                  <MainnewsImage src={item.img} alt={item.theme} title={item.theme}/>
                                </ImageHolder>
                                <ContentHolder>
                                  <MainnewsRessort>{item.ressort || item.adv}</MainnewsRessort> 
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
                              <Link to={{pathname: item.adv ? `/inlineAdvertiseArticles/${item._id}`:`/inlineNewsArticles/${item._id}`}} className="link" style={{color:"black"}} key={item._id}>
                              <InlineSection key={item._id}>
                                <ImageHolder>
                                  <InlineImage src={item.img} alt={item.theme} title={item.theme}/>
                                </ImageHolder>
                                <InlineContentHolder>
                                  <InlineRessort>{item.ressort || item.adv}</InlineRessort>
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

export default DropdownLinkPage

