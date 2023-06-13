import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getAllPartnerservice} from "../features/partnerservice/partnerserviceSlice";
import {middle} from '../responsive';
const Container = styled.div`
    width:90%;
    margin:0 auto;
    background: var(--lightblue);
`;
const TitleHolder = styled.div`
    width:100%;
    height:40px;
    padding:0 10px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;
const Title = styled.h3`
    font-size:26px;
    color: var(--gray);
    font-weight:400;
    ${middle({fontSize:"20px"})}
`;
const Adv = styled.span`
    width:70px;
    height:30px;
    padding:5px;
    background: var(--gray);
    color: var(--white);
`;
const ContentHolder = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
`;
const InnerWrapper = styled.div`
    padding:20px;
    width:30%;
`;
const ContentTitle = styled.h3`
    font-size:22px;
    color: var(--gray);
    margin-bottom:20px; 
    ${middle({fontSize:"18px"})};
`;
const Ul = styled.ul`
    display:flex;
    flex-direction:column;
`;
const Li = styled.li`
    height:25px;
    display:flex;
    align-items:center;
    padding-bottom:5px;
    border-bottom: 1px solid var(--white);
    margin-bottom:5px;
    cursor: pointer;
    ${middle({height:"32px"})};
`;
const ButtonHolder = styled.div`
    width:100%;
    height:80px;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Button = styled.button`
    height:40px;
    width:200px;
    color: var(--gray);
    font-weight:600;
    border: 2px solid var(--gray);
    padding:5px;
    border-radius:20px;
    background:transparent;
    cursor: pointer;
`;
const Partnerservice = () => {
    const dispatch = useDispatch();
    const partnerservice = useSelector((state)=>state.partnerservice.partnerServices);
    
    useEffect(()=>{
        dispatch(getAllPartnerservice());
    }, [dispatch]);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = ()=>{
        if(isOpen){
            setIsOpen(false);
        } else{
            setIsOpen(true);
        }
    }
  return (
    <Container>
        <TitleHolder>
            <Title>PARTNER-SERVICES</Title>
            <Adv>Anzeige</Adv>
        </TitleHolder>
        <ContentHolder style={isOpen ? {height: "100%"} : {maxHeight:"215px", overflow:"hidden"}}>
            {
                partnerservice.map((service)=>(
                    <InnerWrapper key={service._id}>
                        <ContentTitle>{service.title}</ContentTitle>
                        {
                            service.content.map((con,index)=>(
                                <Ul key={index}>
                                    <Li>{con}</Li>
                                </Ul>
                            ))
                        }
                    </InnerWrapper>
                ))
            }
        </ContentHolder>
        <ButtonHolder>
            <Button onClick={handleClick}>{isOpen ? `Weniger anzeigen` : `Mehr anzeigen`}</Button>
        </ButtonHolder>
    </Container>
  )
}

export default Partnerservice