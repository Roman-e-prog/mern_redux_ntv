import styled from "styled-components"
import {small} from '../responsive';
import { useDispatch } from "react-redux";
import { createNewsletterOrder } from "../features/newsletter/newsletterSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import { useState } from "react";
import { useId } from "react";
const Container = styled.div`
    width:90%;
    margin: 20px auto;
    display:flex;
    ${small({flexDirection:"column"})}
`;
const Left = styled.div`
    flex:2;
`;
const Title = styled.h3`
    margin-bottom:10px;
`;
const Ul = styled.ul`
    margin-bottom:10px;
`;
const Li = styled.li`
    margin-bottom: 2px;
    cursor: pointer;
`;
const Center = styled.div`
    flex:1;
`;

const Right = styled.div`
    flex:1;
`;
const Newsletter = styled.div`
    flex:3;
    padding: 0 20px;
`;
const Content = styled.p``;
const Form = styled.form``;
const InputHolder = styled.div`
    margin-top:20px;
    display:flex;
    justify-content: space-around;
`;
const Input = styled.input`
    padding:5px;
    width:60%;
`;
const Button = styled.button`
    padding:5px;
    background: var(--red);
    color: var(--white);
    font-size:20px;
    border:none;
    cursor: pointer;
`;

const LinkContainer = () => {
    const dispatch = useDispatch();
    const uniqueId = useId();
    const [formdata, setFormdata] = useState({
        email:""
    })
    const {email} = formdata;
    const handleChange = (e)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const newsletterData = {
            email,
        }
        dispatch(createNewsletterOrder(newsletterData))
        toast.success("Danke für die Bestellung unseres Newsletters")
    }
  return (

    <Container>
        <ToastContainer/>
        <Left>
            <Title>rr-tv Nachrichtenfernsehen</Title>
            <Ul>
                <Li>Programm</Li>
                <Li>Mitschnitte</Li>
                <Li>Zuschauerredaktion</Li>
                <Li>Pressestelle</Li>
                <Li>Kontakt</Li>
                <Li>Jobs bei rr-tv</Li>
                <Li>Digital Signage</Li>
            </Ul>
        </Left>
        <Center>
            <Title>rr-tv.de Dienste</Title>
                <Ul>
                    <Li>mobil & apps</Li>
                    <Li>Newsletter</Li>
                </Ul>
                <Title>Software</Title>
                <Ul>
                    <Li>RSS-Feeds</Li>
                </Ul>
        </Center>
        <Right>
            <Title>Social Networks</Title>
            <Ul>
                <Li>Facebook</Li>
                <Li>Twitter</Li>
            </Ul>
            <Title>Kooperationspartner</Title>
            <Ul>
                <Li>Gutscheine</Li>
                <Li>Produktvergleiche</Li>
                <Li>Jobbörse</Li>
                <Li>Autoleasing</Li>
            </Ul>
        </Right>
        <Newsletter>
            <Title>Newsletter</Title>
            <Content>Ich möchte gerne Nachrichten und redaktionelle Artikel von der rr-tv Nachrichtenfernsehen GmbH per E-Mail erhalten.
            </Content>
            <Form onSubmit={onSubmit}>
            <InputHolder>
                <Input type="email" placeholder="E-Mail Adresse" name="email" id={`${uniqueId} email`} value={email} onChange={(e)=>handleChange(e)} required/>
                <Button type="submit">Abonnieren</Button>
            </InputHolder>
            </Form>
        </Newsletter>
    </Container>
  )
}

export default LinkContainer