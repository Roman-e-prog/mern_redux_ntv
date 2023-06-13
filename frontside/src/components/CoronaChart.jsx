import styled from "styled-components";
import { impfdata } from "../data";
import Chart from "./Chart";
import {small, middle} from '../responsive'
const Container = styled.div`
    width:90%;
    height:60vh;
    margin:0 auto;
    padding:40px 0;
    ${small({display:"none"})}
`;
const TitleHolder = styled.div`
    display:flex;
    align-items:center;
    height:34px;
    border-bottom: 4px solid var(--gray);
    width:60%;
`;
const Title = styled.h3`
    background: var(--gray);
    color: var(--white);
    font-size:22px;
    padding: 5px;
    margin-bottom:0;
    ${middle({fontSize:"18px"})}
`;
const SubTitle = styled.h3`
    color: var(--gray);
    font-size:22px;
    margin-left:10px;
    padding:5px; 
    ${middle({fontSize:"18px"})}
`; 
const Headline = styled.h3`
    font-weight:400;
    margin-top:15px;

    & .inlay{
        background:green;
        color:white;
        margin: 0 5px;
        padding: 1px 2px;
        display:inline-block;
    }
`;
const ChartHolder = styled.div``;

const CoronaChart = () => {
  return (
    <Container>
        <TitleHolder>
            <Title>Coronavirus</Title>
            <SubTitle>Das Impftempo in Deutschland</SubTitle>
        </TitleHolder>
        <Headline>Bisher wurden in Deutschland <p className= "inlay">{`${impfdata[0].impfdosen} Impfdosen`}</p>verabreicht. Die Entwicklung der <b>täglich geimpften Personen</b> im Überblick.</Headline>
        <ChartHolder>
            <Chart/>
        </ChartHolder>
    </Container>
  )
}

export default CoronaChart