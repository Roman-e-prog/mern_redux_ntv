import React from 'react'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import {getBilderserie, updateBilderserie} from "../../../features/bilderserien/bilderserieSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from '../../../components/Spinner';
import {middle} from '../../../responsive';
import { useId } from 'react';
const Container = styled.div`
    width:80%;
    margin: 0 auto;
    background: var(--white);
    ${middle({width:"100%", margin:"0"})}
`;
const TitleHolder = styled.div`
    width:100%;
    padding:10px;
`;
const Title = styled.h1`
    height:22px;
    color: var (--gray);
`;
const FormWrapper = styled.div`
    width:100%;
    padding:10px;
`;
const Form = styled.form``;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
`;
const Label = styled.label`
    font-weight:600;
    margin-bottom:5px;
`;
const Input = styled.input`
    padding:5px;
    margin-bottom: 5px;
`;
const Textarea = styled.textarea`
    padding:5px;
    margin-bottom:5px;
`;
const ButtonHolder = styled.div`
    margin-top:10px;
    display:flex;
`;
const UpdateButton = styled.button`
 width:200px;
    background:green;
    padding:5px;
    color: var(--white);
    border:none;
    cursor: pointer;
    box-shadow: -1px 13px 16px -7px rgba(0,0,0,0.81);
-webkit-box-shadow: -1px 13px 16px -7px rgba(0,0,0,0.81);
-moz-box-shadow: -1px 13px 16px -7px rgba(0,0,0,0.81);
`;
const OkayButton = styled.button`
background:var(--white);
color:var(--blue);
margin-top:5px;
padding:5px;
border:none;
cursor:pointer;
`;
const BilderserienEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bilderserie = useSelector((state)=>state.bilderSerie.bilderSerie);
    const isError = useSelector((state)=>state.bilderSerie.isError);
    const isLoading = useSelector((state)=>state.bilderSerie.isLoading);
    const message = useSelector((state)=>state.bilderSerie.message);
    const {id} = useParams();
    const uniqueId = useId();
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getBilderserie(id));
    }, [isError, message, dispatch, id]);
    //Textfields
    const [formdata, setFormdata] = useState({
        alt:"",
        title:"",
        content:"",
    })
    const {alt, title, content} = formdata;

    useEffect(()=>{
        if(bilderserie){
            setFormdata({
                alt: bilderserie.alt,
                title: bilderserie.title,
                content: bilderserie.content,
            })
        }
    }, [bilderserie]);
    
    //file
    const [fileData, setFileData] = useState({
        img:"",
    });
    const fileInput = useRef();
    const fileChange = (e)=>{
        const file = fileInput.current.files[0];
        setFileData(file);
        handlePreview(file);
    }
    const [preview, setPreview] = useState(false);
    const handlePreview = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPreview(reader.result);
        }
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const bilderserieData = new FormData();
        bilderserieData.append("ressort", formdata.ressort);
        bilderserieData.append("theme", formdata.theme);
        bilderserieData.append("title", formdata.title);
        bilderserieData.append("content", formdata.content);
        bilderserieData.append("img", fileData);
    
        const updateData = {id: id, bilderserieData: bilderserieData};
  
        dispatch(updateBilderserie(updateData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
            <TitleHolder>
                <Title>Update Bilderserie</Title>
            </TitleHolder>
            <FormWrapper>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} img`}>Bild update</Label>
                        <Input type="file" name="img" id={`${uniqueId} img`} style={{background:"var(--blue)", color:"var(--white)", width:"40%"}} ref={fileInput} onChange={fileChange}/>
                        {preview ? <img src={preview} alt="saved" title="saved" style={{width:"300px", height:"200px"}}/> : <img src={bilderserie.img} alt="updated" title="updated"  style={{width:"300px", height:"200px"}}/>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} alt`}>Thema</Label>
                        <Input type="text" name="alt" id={`${uniqueId} alt`} defaultValue={alt} onChange={(e)=>setFormdata({...formdata, alt: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} title`}>Titel</Label>
                        <Input type="text" name="title" id={`${uniqueId} title`} defaultValue={title} onChange={(e)=>setFormdata({...formdata, title: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} content`}>Inhalt</Label>
                        <Textarea name="content" id={`${uniqueId} content`} defaultValue={content} onChange={(e)=>setFormdata({...formdata, content: e.target.value})} placeholder='Inhalt'></Textarea>
                    </FormGroup>
                    <ButtonHolder>
                        <UpdateButton onClick={onSubmit}>Update</UpdateButton>
                    </ButtonHolder>
                </Form>
                <OkayButton onClick={()=>navigate(-1)}></OkayButton>
            </FormWrapper>
    </Container>
  )
}

export default BilderserienEdit