import styled from "styled-components"
import {IoIosArrowForward} from "react-icons/io";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {getAllMainNews } from "../features/news/newsSlice";
import { getAllInlineNews} from "../features/inlineNews/inlineNewsSlice";
import {small} from '../responsive';
const Container = styled.div`
    width:90%;
    margin:0 auto;
    ${small({width:"100%"})}
`;
const TitleHolder = styled.div`
    height:20%;
    display:flex;
    align-items:center;
`;
const Title = styled.h3`
    font-size:26px;
    color: var(--gray);
    font-weight:400;
`;
const ContentHolder = styled.div`
    height:80%;
    display:flex;
    flex-wrap: wrap;
    ${small({flexDirection:"column", width:"100%"})};

    & .link{
        width:23%;
        margin: 5px 5px;
        ${small({width:"100%"})}
    }
`;
const Card = styled.div`
    display: ${props=>props.index > 7  && "none"};
   
`;
const Img = styled.img`
    width:100%;
    height:150px;
    ${small({width:"90%"})}
`;
const Ressort = styled.h5`
    color: var(--gray);
`;
const Theme = styled.h4`
    color: var(--red);
    margin: 5px 0;
`;
const ContentTitle = styled.h3`
    color: #000;
`;
const DasBeste = () => {
    const dispatch = useDispatch();
    const mainnews = useSelector((state)=>state.mainnews.allMainNews);
    const inlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
    
    useEffect(()=>{
        dispatch(getAllMainNews());
        dispatch(getAllInlineNews())
    }, [dispatch]);
   
    const concatState = mainnews.concat(inlineNews);
    const sorted = concatState.sort((a,b)=>(a.stars < b.stars) ? 1 : -1);
  return (
    <Container>
        <TitleHolder>
            <Title>DAS BESTE</Title>
            <IoIosArrowForward style={{fontSize:"26px", color:"var(--gray"}}/>
        </TitleHolder>
        <ContentHolder>
            {
               sorted.length && sorted.map((item, index)=>(
                    <Link to={{pathname: `/${mainnews.some(news=>news._id === item._id)? 'mainNewsArticles': 'inlineNewsArticles'}/${item._id}`}} className="link" key={item._id} title={item.ressort}>
                    <Card key={item._id} index={index}>
                        <Img src={item.img} alt={item.ressort} title={item.theme}/>
                        <Ressort>{item.ressort}</Ressort>
                        <Theme>{item.theme}</Theme>
                        <ContentTitle>{item.title}</ContentTitle>
                    </Card>
                    </Link>
                ))
            }
        </ContentHolder>
    </Container>
  )
}

export default DasBeste