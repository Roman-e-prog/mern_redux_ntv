import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUkraineNews } from "../features/ukraineNews/ukraineNewsSlice";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { small, middle } from "../responsive";
const Container = styled.div`
  width:88%;
  background:var(--white);
  margin: 0 auto;
  ${middle({width:"100%", margin:"0"})}
  ${small({width:"100%", margin:"0"})}
`;
const TitleWrapper = styled.div`
  width:100%;
  padding:20px;
`;
const Title = styled.h1`
`;
const ContentWrapper = styled.div`
  width:100%;
  min-height:60vh;
  padding:10px;
`;
const FieldWrapper = styled.div`
  width:100%;
  margin: 10px 0;
`;
const UkraineTitel = styled.div`
  width:100%;
  border-bottom: 1px solid black;
  margin-bottom:5px;
  padding-bottom:2px;
`;
const ItemTitle = styled.h3``;
const UkraineContent = styled.div`
  width:100%;
`;
const UkraineBody = styled.p``;
const Ukraine= () => {
  const dispatch = useDispatch();
    const allUkraineNews = useSelector((state)=>state.ukraineNews.allUkraineNews);
   useEffect(()=>{
    dispatch(getAllUkraineNews())
   },[dispatch]);

   const sortUkraineNews = [...allUkraineNews].sort((a,b)=>a.createdAt < b.createdAt ? 1: -1)
       //mobile
       const [windowWidth, setWindowWidth] = useState(window.innerWidth);

       useEffect(() => {
         const handleResize = () => setWindowWidth(window.innerWidth);
         window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);
  return <Container>
    {windowWidth <= 420 ? <MobileNavbar/>: <Navbar/> }
    <TitleWrapper>
      <Title>Ukraine Krieg Liveticker</Title>
    </TitleWrapper>
    <ContentWrapper>
      {sortUkraineNews && sortUkraineNews.map((item)=>(
        <FieldWrapper key={item._id}>
          <UkraineTitel>
            <ItemTitle>+++{new Date(item.createdAt).toLocaleTimeString("de-De", {
              hour:"2-digit",
              minute:"2-digit"
            })} {item.title}+++</ItemTitle>
          </UkraineTitel>
          <UkraineContent>
            <UkraineBody>{item.text}</UkraineBody>
          </UkraineContent>
        </FieldWrapper>
      ))}
    </ContentWrapper>
     <Footer/>
  </Container>;
};

export default Ukraine;
