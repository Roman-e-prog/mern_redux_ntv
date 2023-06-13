import React from 'react'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import {getInlineNews, updateInlineNews} from "../../../features/inlineNews/inlineNewsSlice";
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
const InlineNewsEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inlineNews = useSelector((state)=>state.inlineNews.inlineNews);
    const isLoading = useSelector((state)=>state.inlineNews.isLoading);
    const isError = useSelector((state)=>state.inlineNews.isError); 
    const message = useSelector((state)=>state.inlineNews.message);
    const {id} = useParams();
    const uniqueId = useId();
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getInlineNews(id));
    }, [isError, message, dispatch, id]);
    //Textfields
    const [formdata, setFormdata] = useState({
        ressort: "",
        theme:"",
        title:"",
        content:"",
    })
    const {ressort, theme, title, content} = formdata;

    useEffect(()=>{
        if(inlineNews){
            setFormdata({
                ressort: inlineNews.ressort,
                theme: inlineNews.theme,
                title: inlineNews.title,
                content: inlineNews.content,
            })
        }
    }, [inlineNews]);
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
        const inlineNewsData = new FormData();
        inlineNewsData.append("ressort", formdata.ressort);
        inlineNewsData.append("theme", formdata.theme);
        inlineNewsData.append("title", formdata.title);
        inlineNewsData.append("content", formdata.content);
        inlineNewsData.append("img", fileData);
    
        const updateData = {id: id, inlineNewsData: inlineNewsData};
   
        dispatch(updateInlineNews(updateData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
            <TitleHolder>
                <Title>Update Inline-News</Title>
            </TitleHolder>
            <FormWrapper>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} img`}>Bild update</Label>
                        <Input type="file" name="img" id={`${uniqueId} img`} style={{background:"var(--blue)", color:"var(--white)", width:"40%"}} ref={fileInput} onChange={fileChange}/>
                        {preview ? <img src={preview} alt="saved" title="saved" style={{width:"300px", height:"200px"}}/> : <img src={inlineNews.img} alt="updated" title="updated" style={{width:"300px", height:"200px"}}/>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} ressort`}>Ressort</Label>
                        <Input type="text" name="ressort" id={`${uniqueId} ressort`} defaultValue={ressort} onChange={(e)=>setFormdata({...formdata, ressort: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} theme`}>Thema</Label>
                        <Input type="text" name="theme" id={`${uniqueId} theme`} defaultValue={theme} onChange={(e)=>setFormdata({...formdata, theme: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} title`}>Titel</Label>
                        <Input type="text" name="title" id={`${uniqueId} title`} defaultValue={title} onChange={(e)=>setFormdata({...formdata, title: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} content`}>Inhalt</Label>
                        <Textarea name="content" id={`${uniqueId} content`} defaultValue={content} onChange={(e)=>setFormdata({...formdata, content: e.target.value})}></Textarea>
                    </FormGroup>
                    <ButtonHolder>
                        <UpdateButton onClick={onSubmit}>Update</UpdateButton>
                    </ButtonHolder>
                </Form>
                <OkayButton onClick={()=>navigate(-1)}>Okay</OkayButton>
            </FormWrapper>
    </Container>
  )
}

export default InlineNewsEdit