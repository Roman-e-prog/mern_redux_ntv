import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getAllMainNews, incrementClicked} from "../features/news/newsSlice";
import { useEffect } from "react";
const Container = styled.div`
    width:90%;
    margin: 0 auto;
    padding-top:20px;
`;
const Hr = styled.hr`
    color: var(--lightgray);
    align: center;
    size:0.5px;
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
const News = () => {
    const dispatch = useDispatch();
   const mainnews = useSelector((state)=>state.mainnews.allMainNews);

   useEffect(()=>{
       dispatch(getAllMainNews());
   }, [dispatch]);
   const handleCount = (id)=>{;
    const incrementData = {
        id:id
    }
   dispatch(incrementClicked(incrementData));
}
  return <Container>
            <Hr/>
            <NewsTitleHolder>
                <NewsTitle>NACHRICHTEN</NewsTitle>
                <IoIosArrowForward style={{fontSize:"26px", color: "var(--gray)"}}/>
            </NewsTitleHolder>
            <ArticleHolder>
                {
                    mainnews.length && mainnews.map((item)=>(
                        <Link to={{pathname: `/mainNewsArticles/${item._id}`}} className="link" key={item._id} onClick={()=>handleCount(item._id)} >
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
                    ))
                }
            </ArticleHolder>
  </Container>;
};

export default News;
