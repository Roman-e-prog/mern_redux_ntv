import styled, {css} from "styled-components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { coronadata_gesamt, coronadata_erst, coronadata_zweit, coronadata_auffrischung, coronaheader } from "../data";
import { useState, useCallback } from "react";
const Container = styled.div`
    width:100%;
    padding:20px;
    position:relative;
    height:100%;
`;
const HeaderHolder = styled.div`
    display:flex;
    border-bottom: 1px solid var(--gray);
    width:30%;
    height:20px;
`;
const Header = styled.h3.attrs(()=>({className:"open"}))`
    margin-right: 10px;
    color: var(--gray);
    border: 1px solid var(--gray);
    padding:2px;
    background: var(--leightgray);
    opacity:0.5;
    cursor: pointer;
    ${props=>props.open && css`
    &.open{
        border: 1px solid var(--gray);
        border-bottom: none;
        opacity:1;
        height:20px;
        background: var(--white);
        z-index:10;
    }
    `}  
`;
const CardHolder = styled.div`
    width:100%;
    padding:10px;
    position:absolute;
    top:50px;
    left:0;
    & .responsive{
        width: 80%;
        aspect-ratio: 4 / 1;
    }
`;

const Chart = () => {
        const [defaultValue, setDefaultValue] = useState("Gesamt");
        const [gesamtOpen, setGesamtOpen] = useState(true);
        const [erstOpen, setErstOpen] = useState(false);
        const [zweitOpen, setZweitOpen] = useState(false);
        const [auffrischungOpen, setAuffrischungOpen] = useState(false);

        const select = useCallback((e)=>{
            setDefaultValue(e.target.id);
        }, []);

        const headers = coronaheader.map((header)=>(
            <Header key={header} id={header} onClick={()=>handleClick(header)} open={header === defaultValue}>{header}</Header>
        ));

   const handleClick = (name)=>{
        if(name === "Gesamt"){
            setGesamtOpen(true);
            setErstOpen(false);
            setZweitOpen(false);
            setAuffrischungOpen(false);
        }
        else if(name === "Erst**"){
            setErstOpen(true);
            setGesamtOpen(false);
            setZweitOpen(false);
            setAuffrischungOpen(false);
        }
        else if(name === "Zweit"){
            setZweitOpen(true);
            setErstOpen(false);
            setGesamtOpen(false);
            setAuffrischungOpen(false);
        }
        else{
            setZweitOpen(false);
            setErstOpen(false);
            setGesamtOpen(false);
            setAuffrischungOpen(true);

        }
   }

  return (
    <Container>
    <HeaderHolder id="headerHolder" onClick={select}>
    {
        headers
    }
    </HeaderHolder>
       
        <CardHolder>
        {
            gesamtOpen &&
        <ResponsiveContainer className="responsive">
            <AreaChart data={coronadata_gesamt}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name" stroke="gray"/>
                <YAxis/>
                <Tooltip/>
                <Area
                    type="monotone"
                    dataKey="uv"
                    fill="green"
                />
                 <Area
                    type="monotone"
                    dataKey="pv"
                    fill="gray"
                />
            </AreaChart>
        </ResponsiveContainer>
        }
        {
            erstOpen &&
        <ResponsiveContainer className="responsive">
            <AreaChart data={coronadata_erst}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name" stroke="gray"/>
                <YAxis/>
                <Tooltip/>
                <Area
                    type="monotone"
                    dataKey="uv"
                    fill="green"
                />
               
            </AreaChart>
        </ResponsiveContainer>
        }
        {
            zweitOpen &&
        <ResponsiveContainer className="responsive">
            <AreaChart data={coronadata_zweit}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name" stroke="gray"/>
                <YAxis/>
                <Tooltip/>
                <Area
                    type="monotone"
                    dataKey="uv"
                    fill="green"
                />
                 <Area
                    type="monotone"
                    dataKey="pv"
                    fill="gray"
                />
            </AreaChart>
        </ResponsiveContainer>
        }
        {
            auffrischungOpen &&
        <ResponsiveContainer className="responsive">
            <AreaChart data={coronadata_auffrischung}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name" stroke="gray"/>
                <YAxis/>
                <Tooltip/>
                <Area
                    type="monotone"
                    dataKey="uv"
                    fill="green"
                />
                 <Area
                    type="monotone"
                    dataKey="pv"
                    fill="gray"
                />
            </AreaChart>
        </ResponsiveContainer>
        }
        </CardHolder>
    </Container>
  )
}

export default Chart