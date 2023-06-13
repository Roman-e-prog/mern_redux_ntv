import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import { useSelector, useDispatch} from "react-redux";
import {getAllMainNews} from "../features/news/newsSlice";
import {getAllInlineNews} from "../features/inlineNews/inlineNewsSlice";
import { useEffect } from "react";
import Table from "./Table";

const Container = styled.div`
  width:90%;
  margin:0 auto;
`;
const TitleHolder = styled.div`
  width:100%;
  height:40px;
  display:flex;
  align-items:center;
`;
const Title = styled.h3`
  font-size:26px;
  color: var(--gray);
  font-weight:400;
`;
const ContentHolder = styled.div``;

const MostRead = () => {
  const dispatch = useDispatch();
  const mainnews = useSelector((state)=>state.mainnews.allMainNews);
  const inlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
  useEffect(()=>{
    dispatch(getAllMainNews());
    dispatch(getAllInlineNews());
  }, [dispatch]);


  return <Container>
            <TitleHolder>
                <Title>MEISTGELESEN</Title>
                <IoIosArrowForward style={{fontSize:"26px", color: "var(--gray)"}}/>
            </TitleHolder>
            <ContentHolder>
                  <Table 
                  mainnews={mainnews}
                  inlineNews={inlineNews}
                  />
            </ContentHolder>
  </Container>;
};

export default MostRead;
