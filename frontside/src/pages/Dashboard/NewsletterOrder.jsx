import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import { deleteNewsletterOrder, getAllNewsletterOrder } from '../../features/newsletter/newsletterSlice';
import Spinner from '../../components/Spinner';
import {AiFillDelete} from 'react-icons/ai';
import emailjs from '@emailjs/browser';
import {small} from '../../responsive';
const Container = styled.div`
    width:88%;
    margin:0 auto;
    ${small({width:"100%", margin:"0"})}
`;
const Wrapper = styled.div`
    width:100%;
    background:var(--white);
`;
const TableWrapper = styled.div`
    width:100%;
    background:var(--white);
    padding:20px;
`;
const Table = styled.table`
    width:100%;

    & th{
        background:var(--blue);
        color:var(--white);
        font-weight:400;
        ${small({fontSize:"15px"})}
    }
    & td{
        border:1px solid var(--blue);
        padding-left:5px;
         ${small({fontSize:"15px"})}
    }
    & #delete{
        border:none;

        & #icon{
            font-size:26px;
            color:var(--blue);
        }
    }
`;
const FormWrapper = styled.div`
    width:100%;
    background:var(--white);
    padding:20px;
`;
const Form = styled.form`
    width:100%;
`;
const FormGroup = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;
const ButtonWrapper = styled.div`
    width:100%;
`;
const SendButton = styled.button`
    padding:5px;
    background:var(--blue);
    color:var(--white);
    border:none;
    cursor:pointer;
`;
const NewsletterOrder = () => {
    const dispatch = useDispatch();
    const allNewsletterOrders = useSelector((state)=>state.newsletter.newsletter);
    const isError = useSelector((state)=>state.newsletter.isError);
    const isLoading = useSelector((state)=>state.newsletter.isLoading);
    const errorMessage = useSelector((state)=>state.newsletter.message);
    const [mail, setMail] = useState([]);
    const [formdata, setFormdata] = useState({
        subject:"",
        message:""
    })
    const {subject, message} = formdata;
    useEffect(()=>{
        if(isError){
            toast.error(errorMessage);
        }
        dispatch(getAllNewsletterOrder());
    },[dispatch, isError, errorMessage]);
    
    useEffect(()=>{
    if(allNewsletterOrders.length){
        setMail(prevMail => prevMail.concat(allNewsletterOrders.map((item)=>item.email)))
    }
},[allNewsletterOrders]);
        const handleChange = (e)=>{
            setFormdata((prevState)=>({
                ...prevState,
                [e.target.name]:e.target.value
            }))
        }

    const handleDelete = (id)=>{
        dispatch(deleteNewsletterOrder(id));
        dispatch(getAllNewsletterOrder());
    }
      //mail
const form = useRef();
const serviceID = process.env.REACT_APP_EMAIL_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;
console.log(form.current);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm( serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          console.log("message sended")
          form.current.reset()
      }, (error) => {
          console.log(error.text);
      });
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
      <Wrapper>
        <TableWrapper>
            <Table>
                <caption>Newsletterbestellungen</caption>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Bestellt am:</th>
                        <th>Löschen</th>
                    </tr>
                </thead>
                <tbody>
                    {allNewsletterOrders.length ? allNewsletterOrders.map((item)=>(
                        <tr key={item._id}>
                            <td>{item.email}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td id="delete" onClick={()=>handleDelete(item._id)}><AiFillDelete id="icon"/></td>
                        </tr>
                    )):null}
                </tbody>
            </Table>
        </TableWrapper>
        <FormWrapper>
                <Form ref={form} onSubmit={sendEmail}> 
                <FormGroup>
                    <label htmlFor="from_name">rr-tv</label>
                    <input type="text" name="from_name" id="from_name" defaultValue="rr-tv"/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor='subject'>Thema</label>
                    <input type="text" name="subject" id="subject" value={subject} placeholder="Thema" onChange={(e)=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor='message'>Inhalt</label>
                    <textarea cols={10} rows={10} name="message" value={message} placeholder="Hier Artikel eingeben" onChange={(e)=>handleChange(e)}></textarea>
                </FormGroup>
                <FormGroup>
                    <label htmlFor='to_mail'>E-Mail</label>
                    <input type="text" name="to_mail" id="mail" defaultValue={mail.join(", ")} title="email"/>
                </FormGroup>
                <ButtonWrapper>
                    <SendButton title="Absenden">Absenden</SendButton>
                </ButtonWrapper>
            </Form>
        </FormWrapper>
      </Wrapper>
    </Container>
  )
}

export default NewsletterOrder
