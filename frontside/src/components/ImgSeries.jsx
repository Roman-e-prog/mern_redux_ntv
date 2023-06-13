import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import { Link } from "react-router-dom";
import { BiImages } from "react-icons/bi"

const Container = styled.div`
    width:90%;
    height:90vh;
    margin: 0 auto;
`;
const TitleHolder = styled.div`
    height:10%;
    display:flex;
    align-items:center;
`;
const Title = styled.h3`
    color: var(--gray);
    font-size:26px;
    font-weight:400;
`;
const ContentHolder = styled.div`
    height:90%;

    & .link{
        width:100%;
        height:100%;
        cursor:pointer;
        position:relative;

        & .imgSeriesIcon{
            position: absolute;
            bottom:50px;
            left:20px;
            color: var(--gray);
            font-size:60px;
            z-index:2;
        }
    }
`;
const Img = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    
`;

const ImgSeries = () => {
   
  return (
    <Container>
        <TitleHolder>
            <Title>BILDERSERIEN</Title>
            <IoIosArrowForward style={{color:"var(--gray)", fontSize:"26px"}}/>
        </TitleHolder>
        <ContentHolder>
            <Link to="/bilderserien" className="link">
            <Img src="../img/football_1.jpg" alt="Quaterback" title="So dramatisch war der Superbowl"/>
            <BiImages className="imgSeriesIcon"/>
            </Link>
        </ContentHolder>

    </Container>
  )
}

export default ImgSeries