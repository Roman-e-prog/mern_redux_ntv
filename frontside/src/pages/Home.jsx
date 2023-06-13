import styled,{keyframes}  from "styled-components";
import Advertise from "../components/Advertise";
import Ukraine from "../components/Ukraine";
import CoronaChart from "../components/CoronaChart";
import DasBeste from "../components/DasBeste";
import DayLinks from "../components/DayLinks";
import Footer from "../components/Footer";
import ImgSeries from "../components/ImgSeries";
import ImgSlider from "../components/ImgSlider";
import InLineNews from "../components/InLineNews";
import LinkContainer from "../components/LinkContainer";
import MostRead from "../components/MostRead";
import MostSeen from "../components/MostSeen";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import News from "../components/News";
import Partnerservice from "../components/Partnerservice";
import SliderTop from "../components/SliderTop";
import TopBar from "../components/TopBar";
import Video from "../components/Video";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from "react";
import { getAllBreakingNews } from "../features/breakingNews/breakingNewsSlice";
import {small, middle} from "../responsive";
import MobilePartnerService from "../components/MobilePartnerService";
import CookieConsent from "react-cookie-consent";
const Container = styled.div`
    width:100%;
`;
const Wrapper = styled.div`
    width:88%;
    background: var(--white);
    margin: 0 auto;
    overflow:hidden;
    ${middle({width:"100%", margin:"0"})}
    ${small({width:"100%", margin:"0"})}
`;
const ArticleHolder = styled.div`
    display:flex;
`;
const NewsHolder = styled.div`
    flex:2;
    overflow:hidden;
`;
const VideoHolder = styled.div`
    flex:1;
    padding:20px;
    ${middle({width:"200px", padding:"10px"})}
    ${small({display:"none"})}
`;
const FullWidth = styled.div`
    width:100%;
`;
const BreakingNewsWrapper = styled.div`
    width:100%;
`;
const KeyFrames = keyframes`
    0%{
        transform:translateX(100%);
    }
    100%{
        transform:translateX(-100%)
    }
`
const BreakingNewsContainer = styled.div`
    width:100%;
    height:60px;
    background:yellow;
    position:relative;
    overflow:hidden;
`;
const Laufband = styled.div`
    font-size:18px;
    color:var(--blue);
    // animation-name: running-text;
    animation: ${KeyFrames} 4s linear infinite;
    animation-iteration-count:5;
    animation-duration:20s;
    position:absolute;
    z-index:2;
    top:21px;
    white-space:nowrap;
`;

const Home = () => {
    const dispatch = useDispatch();
    //breakingNews
    const allBreakingNews = useSelector((state)=>state.breakingNews.allBreakingNews);
    useEffect(()=>{
        dispatch(getAllBreakingNews());
    },[dispatch]);
    const [breakingNews, setBreakingNews] = useState(false);
    useEffect(()=>{
        if(allBreakingNews.length){
            setBreakingNews(true);
        }
    },[allBreakingNews.length])
    //mobile
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <Container>
            <Wrapper>
                {windowWidth <= 420 ? <MobileNavbar/>: <Navbar/> }
                <BreakingNewsWrapper>
                {breakingNews ?  <BreakingNewsContainer>
                {allBreakingNews.map((item)=>(
                    <div key={item._id}>
                        <Laufband>+++ {item.content} +++</Laufband>
                    </div>
                ))}
                </BreakingNewsContainer> : null}
                </BreakingNewsWrapper>
                <TopBar/>
                <ArticleHolder>
                    <NewsHolder>
                        <SliderTop/>
                        <Ukraine/>
                        <DayLinks/>
                        <News/>
                        <InLineNews/>
                    </NewsHolder>
                    <VideoHolder>
                        <Video/>
                    </VideoHolder>
                </ArticleHolder>
                <FullWidth>
                    <MostRead/>
                    <DasBeste/>
                    <ImgSeries/>
                    <ImgSlider/>
                    <CoronaChart/>
                    <MostSeen/>
                    <Advertise/>
                    {windowWidth <= 420 ? <MobilePartnerService/>: <Partnerservice/>}
                    <LinkContainer/>
                    <Footer/>
                </FullWidth>
            </Wrapper>
            <CookieConsent
                location="bottom"
                buttonText="Annehmen"
                cookieName="myAwesomeCookieName2"
                style={{ background: "var(--blue)" }}
                buttonStyle={{ color: "var(--white)", background:"var(--red)", fontSize: "13px" }}
                expires={150}
                >
                Wir verwenden Cookies, um Ihr Nutzererlebnis zu verbessern.
            </CookieConsent>
  </Container>;
};

export default Home;
