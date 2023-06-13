import styled from "styled-components"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//import components
import DropdownRessorts from "../components/dashboardComponents/DropdownRessorts";
import DropdownSport from "../components/dashboardComponents/DropdownSport";
import DropdownBoerse from "../components/dashboardComponents/DropdownBoerse";
import DropdownWetter from "../components/dashboardComponents/DropdownWetter";
import DropdownVideo from "../components/dashboardComponents/DropdownVideo";
import DropdownAudio from "../components/dashboardComponents/DropdownAudio";
import DropdownProgramm from "../components/dashboardComponents/DropdownProgramm";
import TopSliderItems from "../components/dashboardComponents/TopSliderItems";
import UkraineNews from "../components/dashboardComponents/UkraineNews";
import DayLinks from "../components/dashboardComponents/DayLinks";
import MainNews from "../components/dashboardComponents/MainNews";
import InlineNews from "../components/dashboardComponents/InlineNews";
import ImgSeries from "../components/dashboardComponents/ImgSeries";
import Videos from "../components/dashboardComponents/Videos";
import Advertises from "../components/dashboardComponents/Advertises";
import InlineAdvertises from "../components/dashboardComponents/InlineAdvertises";
import BreakingNews from "../components/dashboardComponents/BreakingNews";
import Partnerservice from "../components/dashboardComponents/Partnerservice";
import MobileNavbar from "../components/MobileNavbar";
import {small, middle} from '../responsive';
const Container = styled.div`
  width:88%;
  margin:0 auto;
  overflow:hidden;
  ${middle({width:"100%", margin:"0"})}
`;
const Wrapper = styled.div`
  width:100%;
  background: var(--white);
`;
const TitleHolder = styled.div`
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  ${small({marginBottom:"5px"})}
  & ul{
    display:flex;
  }
  & .link{
    color:var(--gray);
    font-size:20px;
    margin-left:10px;
  }
`;
const Title = styled.h1`
  color: var(--gray);
  padding:20px;
  font-size:26px;
  ${small({fontSize:"18px"})}
`;
const TitleSpan = styled.span`
  color: var(--gray);
  padding:20px;
  font-size:26px;
  ${small({fontSize:"18px"})}
`;
const ContentHolder = styled.div`
  width:100%;
`;
const Dashboard = () => {
  const navigate = useNavigate();

  const {user} = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(!user.isAdmin){
      navigate("/login");
    }
  }, [user,navigate]);
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
      <Wrapper>
        <TitleHolder>
          <Title>Dashboard</Title>
          <TitleSpan>Welcome {user && user.username}</TitleSpan>
          <ul>
            <li><Link to="/newsletter" className="link">Newsletter</Link></li>
            <li><Link to="/userLetter" className="link">Leserbriefe</Link></li>
            </ul>
        </TitleHolder>
        <ContentHolder>
            <BreakingNews/>
            <DropdownRessorts/>
            <DropdownSport/>
            <DropdownBoerse/>
            <DropdownWetter/>
            <DropdownVideo/>
            <DropdownAudio/>
            <DropdownProgramm/>
            <TopSliderItems/>
            <UkraineNews/>
            <DayLinks/>
            <MainNews/>
            <InlineNews/>
            <ImgSeries/>
            <Videos/>
            <Advertises/>
            <InlineAdvertises/>
            <Partnerservice/>
          </ContentHolder>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Dashboard