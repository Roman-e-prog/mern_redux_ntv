import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {getAllInlineNews, incrementClicked} from "../features/inlineNews/inlineNewsSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Container = styled.div`
    width:90%;
    margin:0 auto;
`;
const Article = styled.article`
    width:100%;
`;
const ArticleTitle = styled.h2`
    display:none;
`;
const ArticleWrapper = styled.div`
    width:100%;
    display:flex;
    margin-bottom:20px;
    cursor:pointer;
`;
const ImgHolder = styled.div`
    flex:1;
`;
const Image = styled.img`
    width:90%;
    height:120px;
    object-fit:cover;
`;
const ContentHolder = styled.div`
    flex:2;
`;
const Ressort = styled.h5`
    color: var(--gray);
    font-size:14px;
    margin-bottom:5px;
`;
const Theme = styled.h4`
    color: var(--red);
    margin-bottom:10px;
`;
const ContentTitle = styled.h3`
    color: #000;
    font-size:20px;
    margin-bottom:10px;
`;
const Content = styled.p`
    color: #000;
`;
const InLineNews = () => {
    const dispatch = useDispatch();
    const inlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
    
    useEffect(()=>{
        dispatch(getAllInlineNews());
    }, [dispatch]);

    const handleCount = (id)=>{
        const incrementData = {
            id:id
        }
       dispatch(incrementClicked(incrementData));
    }
    
  return <Container>
            <Article>
                <ArticleTitle>InlineNews</ArticleTitle>
                {
                    inlineNews.length && inlineNews.map((item)=>(
                        <Link to={{pathname:`/inlineNewsArticles/${item._id}`}} className="link" key={item._id} onClick={()=>handleCount(item._id)}>
                        <ArticleWrapper key={item._id}>
                            <ImgHolder>
                            <Image src={item.img} alt={item.title} title={item.title}/>
                            </ImgHolder>
                            <ContentHolder>
                                <Ressort>{item.ressort}</Ressort>
                                <Theme>{item.theme}</Theme>
                                <ContentTitle>{item.title}</ContentTitle>
                                <Content>{item.content.slice(0,200)}</Content>
                            </ContentHolder>
                        </ArticleWrapper>
                        </Link>
                    ))
                }
            </Article>
  </Container>;
};

export default InLineNews;
