import { useEffect, useState } from "react";
import styled from "styled-components";
import {small, middle, large} from "../responsive";
const Container = styled.div`
    width:80%;
    height:100%;
    margin-left:20%;
    display:flex;
    align-items:center;
    justify-content:space-around;
    ${large({marginLeft:"5px"})} 
`;
const German = styled.div`
    font-size:16px;
    ${large({fontSize:"12px"})} 
`;
const GermanDate = styled.span`
    color: var(--lightgray);
`;
const RegionalTime = styled.span`
    color: var(--lightgray);
    margin-left:5px;
`;
const TimeText = styled.span`
    color: var(--lightgray);
    margin-left:5px;
`;
const England = styled.div`
    font-size:16px;  
    ${large({fontSize:"12px"})}
    ${middle({display:"none"})} 
`;
const USA = styled.div`
    font-size:16px; 
     ${large({fontSize:"12px"})}
     ${small({fontSize:"10px"})} 
     
`;
const Japan = styled.div`
    font-size:16px; 
    ${large({fontSize:"12px"})}
    ${small({display:"none"})} 
`;
const Clocks = () => {

    const [date, setDate] = useState(new Date());

    useEffect(()=>{
        const interval = setInterval(()=>setDate(new Date()), 1000);

        return ()=>{
            clearInterval(interval);
        }
    }, [setDate]);

  return <Container>
      <German>
          <GermanDate>
              {
                  date.toLocaleDateString("de-DE", {
                      weekday:"long",
                      day:"numeric",
                      month:"long",
                      year:"numeric",
                  })
              }
          </GermanDate>
          <RegionalTime>
              {
                  date.toLocaleTimeString("de-De", {
                      hour:"numeric",
                      minute:"numeric",
                  })
              }
          </RegionalTime>
          <TimeText>Uhr</TimeText>
          <TimeText>Frankfurt |</TimeText>
      </German>
      <England>
          <RegionalTime>
              {
                  date.toLocaleTimeString("de-De", {
                      timeZone: "Europe/London",
                      hour:"numeric",
                      minute:"numeric",
                  })
              }
              <TimeText>Uhr</TimeText>
              <TimeText>London |</TimeText>
          </RegionalTime>
      </England>
      <USA>
      <RegionalTime>
              {
                  date.toLocaleTimeString("de-De", {
                      timeZone: "america/New_York",
                      hour:"numeric",
                      minute:"numeric",
                  })
              }
              <TimeText>Uhr</TimeText>
              <TimeText>New York |</TimeText>
          </RegionalTime>
      </USA>
      <Japan>
      <RegionalTime>
              {
                  date.toLocaleTimeString("de-De", {
                      timeZone: "Asia/Tokyo",
                      hour:"numeric",
                      minute:"numeric",
                  })
              }
              <TimeText>Uhr</TimeText>
              <TimeText>Tokio</TimeText>
          </RegionalTime>
      </Japan>
  </Container>;
};

export default Clocks;
