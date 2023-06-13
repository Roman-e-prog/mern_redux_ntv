import React from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from '../../../components/Spinner';
import {middle} from '../../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVideos, updateVideos } from '../../../features/video/videoSlice';
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
const VideoEdit = () => {
    const dispatch = useDispatch();
    const video = useSelector((state)=>state.videos.video);
    const isError = useSelector((state)=>state.videos.isError);
    const message = useSelector((state)=>state.videos.message);
    const isLoading = useSelector((state)=>state.videos.isLoading);
    const navigate = useNavigate();
    const {id} = useParams();
    const uniqueId = useId();
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        dispatch(getVideos(id));
    },[dispatch, id, isError, message]);
    const [formdata, setFormdata] = useState({
        ressort:"",
        theme:"",
        title:""
    })
    const {ressort, theme, title} = formdata;
    const [filedata, setFiledata] = useState({
        src:"",
    })
    useEffect(()=>{
        if(video){
            setFormdata({
                ressort:video.ressort,
                theme:video.theme,
                title:video.title,
            })
        }
    },[video])
    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setFiledata(file)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const videodata = new FormData();
        videodata.append("ressort", formdata.ressort);
        videodata.append("theme", formdata.theme);
        videodata.append("title", formdata.title);
        videodata.append("src", filedata.src);
        const updateData = {
            id:id,
            videodata: videodata,
        }
        dispatch(updateVideos(updateData));
    }
  
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
      <ToastContainer/>
      <TitleHolder>
        <Title>Update Video</Title>
      </TitleHolder>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label htmlFor={`${uniqueId} src`}>Video hochladen</Label>
                <Input type="file" name="src" id={`${uniqueId} src`} onChange={handleFileChange}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor={`${uniqueId} ressort`}>Ressort</Label>
                <Input type="text" name="ressort" id={`${uniqueId} ressort`} defaultValue={ressort} onChange={(e)=>setFormdata({...formdata, ressort:e.target.value})}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor={`${uniqueId} theme`}>Thema</Label>
                <Input type="text" name="theme" id={`${uniqueId} theme`} defaultValue={theme} onChange={(e)=>setFormdata({...formdata, theme:e.target.value})}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor={`${uniqueId} title`}>Titel</Label>
                <Input type="text" name="title" id={`${uniqueId} title`} defaultValue={title} onChange={(e)=>setFormdata({...formdata, title:e.target.value})}/>
            </FormGroup>
            <ButtonHolder>
                <UpdateButton>Update</UpdateButton>
            </ButtonHolder>
        </Form>
        <OkayButton onClick={()=>navigate(-1)}>Okay</OkayButton>
      </FormWrapper>
    </Container>
  )
}

export default VideoEdit
