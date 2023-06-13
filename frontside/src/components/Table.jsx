import styled from "styled-components";
import { Link } from "react-router-dom";
import {small, middle} from '../responsive';
const Container = styled.div`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  ${small({flexDirection:"column"})};

  .link{
    width:47%;
    margin:10px 5px;
    ${small({width:"100%", margin:"10px 0"})};
  }
`;
const RankHolder = styled.div`
  width:100%;
  display:flex;
  justify-content:space-around;
  display: ${props=>props.index > 9 && "none"};
  cursor:pointer;
`;
const Number = styled.p`
  color: var(--gray);
  font-size:16px;
  font-weight:500;
  ${middle({width:"30px"})}
`;
const Img = styled.img`
    width:180px;
    height:120px;
    object-fit:cover;
    ${middle({margin:"0 2px", width:"160px", height:"110px"})}  
`;
const ContentHolder = styled.div`
  width:200px;
  ${small({width:"190px"})}
`;
const Ressort = styled.h5`
  color: var(--gray);
  margin-bottom:5px;
  ${small({fontSize:"16px"})}
`;
const Theme = styled.h4`
  color: var(--red);
  margin-bottom:5px;
  ${small({fontSize:"16px"})}
`;
const Title = styled.h3`
  margin-bottom:5px;
  color: #000;
  ${small({fontSize:"18px"})}
`;
const Table = ({mainnews, inlineNews}) => {
  const state = mainnews.concat(inlineNews);
  const sorted = state.sort((a,b)=>(a.clicked < b.clicked) ? 1 : -1);
  
  return <Container>
        {
           sorted.length && sorted.map((rank, index)=>(
              <Link to={{pathname: `/${mainnews.some((news)=>news._id === rank._id)? 'mainNewsArticles' : 'inlineNewsArticles'}/${rank._id}`}} className="link" key={rank._id} title={rank.ressort}>
              <RankHolder key={rank._id} index={index}>
                <Number>{index +1}</Number>
                <Img src={rank.img} alt={rank.ressort} title={rank.ressort}/>
                <ContentHolder>
                    <Ressort>{rank.ressort}</Ressort>
                    <Theme>{rank.theme}</Theme>
                    <Title>{rank.title}</Title>   
                </ContentHolder>
            </RankHolder>
            </Link>
            ))
            
        }
  </Container>;
};

export default Table;
