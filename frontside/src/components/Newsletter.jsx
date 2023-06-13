import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewsletterOrder } from "../features/newsletter/newsletterSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import {middle, large} from '../responsive'
import { useId } from "react";
const Container = styled.div`
    width:80%;
    height:auto;
    background: var(--lightblue);
    padding:10px;
    ${large({width:"100%"})}
`;
const Title = styled.h3`
    font-size:26px;
    color: var(--gray);
    margin-bottom:10px;
`;
const Text = styled.p`
    font-weight:400;
    font-size:18px;
`;
const Form = styled.form`
`;
const InputHolder = styled.div`
    display:flex;
    margin-top:20px;
    ${middle({flexDirection:"column"})}
`;
const Input = styled.input`
    width: 145px;
    height:40px;
    margin-right:5px;
    padding:5px;
`;
const Button = styled.button`
    width:130px;
    height:40px;
    padding:5px;
    background: var(--red);
    color: var(--white);
    font-weight:500;
    cursor:pointer;
    border:none;
    ${middle({marginTop:"10px"})}
`;

const Newsletter = () => {
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
        <Title>NEWSLETTER</Title>
        <Text>Ich möchte gerne Nachrichten und redaktionelle Artikel von der rr-tv Nachrichtenfernsehen GmbH per E-Mail erhalten.</Text>
        <Form onSubmit={onSubmit}>
            <InputHolder>
                <Input type="email" name="email" id={`${uniqueId} email`} value={email} placeholder="E-Mail Adresse" required onChange={(e)=>handleChange(e)}/>
                <Button type="submit">Abonnieren</Button>
            </InputHolder>
        </Form>
    </Container>
  )
}

export default Newsletter