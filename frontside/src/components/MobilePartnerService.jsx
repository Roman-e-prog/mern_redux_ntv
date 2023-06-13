import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getAllPartnerservice} from "../features/partnerservice/partnerserviceSlice";
import styled from 'styled-components';
import {BiDownArrowCircle, BiUpArrowCircle} from 'react-icons/bi';
const Container = styled.div`
    width:90%;
    margin:0 auto;
    background: var(--lightblue);
`;
const Wrapper = styled.div`
    width:100%;
`;
const Header = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px;
    & .icons{
        font-size:26px;
    }
`;
const Body = styled.div`
    width:100%;
    border-bottom:1px solid black;
    & li{
        padding:10px;
        font-size:20px;
        border-bottom:1px solid black;
    }
`;
const MobilePartnerService = () => {
    const dispatch = useDispatch();
    const partnerservice = useSelector((state)=>state.partnerservice.partnerServices);
    
    useEffect(()=>{
        dispatch(getAllPartnerservice());
    }, [dispatch]);
    const [isOpen, setIsOpen] = useState(new Array(partnerservice.length).fill(false));
    const [content, setContent] = useState(new Array(partnerservice.length).fill(null));
    const handleOpen = (index)=>{
        const newOpen = [...isOpen];
        newOpen[index] = !newOpen[index]
        setIsOpen(newOpen)
        const newContent = [...content];
        if(newContent[index]){
            newContent[index] = null;
        }
        else{
           newContent[index] = partnerservice[index].content 
        }
        setContent(newContent);
    }
  return (
    <Container>
        <Wrapper>
            {partnerservice.length && partnerservice.map((item, index)=>(
                <ul key={item._id}>
                    <li>
                        <Header>
                        <span>{item.title}</span>
                        <span onClick={()=>handleOpen(index)}>{isOpen[index] ? <BiUpArrowCircle className='icons'/>: <BiDownArrowCircle className='icons'/>}</span>
                        </Header>
                        <Body>{content[index] ? <ul>{content[index].map((item, index)=>(
                            <li key={index}>{item}</li>
                        ))}</ul>: null}</Body>
                    </li>
                </ul>
            ))}
        </Wrapper>
      
    </Container>
  )
}

export default MobilePartnerService
