import styled from "styled-components";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getMainNews, updateMainNews, reset} from "../../../features/news/newsSlice";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../../../components/Spinner";
import { useRef } from "react";
import {middle} from '../../../responsive';
import { useId } from "react";

const Container = styled.div`
    width:80%;
    margin:0 auto;
    background: var(--white);
    ${middle({width:"100%", margin:"0"})}

    & .form{
        padding:10px;
    }
`;
const TitleHolder = styled.div`
    width:100%;
    padding:10px;
`;
const Title = styled.h1`
    height:22px;
    color: var (--gray);
`;
const MainNewsForm = styled.form`
    padding:10px;
`;
const Formgroup = styled.div`
    display:flex;
    flex-direction: column;

    & .input{
        padding:5px;
        margin-bottom:5px;
    }
`;
const Input = styled.input`
    padding:5px;
    margin-bottom:5px;
`;
const Textarea = styled.textarea`
    padding:5px;
    margin-bottom:5px;
`;
const Label = styled.label`
    font-weight:600;
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
const MainnewsEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mainnews = useSelector((state)=>state.mainnews.mainNews);
    const isLoading = useSelector((state)=>state.mainnews.isLoading);
    const isError = useSelector((state)=>state.mainnews.isError); 
    const message = useSelector((state)=>state.mainnews.message);
    const {id} = useParams();
    const uniqueId = useId();
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getMainNews(id))
    }, [isError, message, dispatch,id]);
    const savedData = {
        ressort:"",
        theme:"",
        title:"",
        content:"",
    }
    const [data, setData] = useState(savedData);
    useEffect(()=>{
        if(mainnews){
            setData({ 
                ressort: mainnews.ressort,
                theme: mainnews.theme,
                title: mainnews.title,
                content:mainnews.content,
            })     
        }
    }, [mainnews]);
    
    //img
    const [fileData, setFileData] = useState({img:""})
    const fileInput = useRef();
    
    const fileChange = (e)=>{
        const file = fileInput.current.files[0];
          setFileData(file); 
        handlePreview(file)
      }
      const [preview, setPreview] = useState(false)
      const handlePreview = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
          setPreview(reader.result);
        }
      }

    const {ressort, theme, title, content} = data;
    const onSubmit = (e)=>{
        e.preventDefault();
        const mainnewsData = new FormData();
        mainnewsData.append("ressort", data.ressort);
        mainnewsData.append("theme", data.theme);
        mainnewsData.append("title", data.title);
        mainnewsData.append("content", data.content);
        mainnewsData.append("img", fileData);
       const updateData = {id: id, mainnewsData: mainnewsData}
        dispatch(updateMainNews(updateData));

        return ()=>{
            dispatch(reset());
        }
    }

    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
        <TitleHolder>
            <Title>Update Mainnews</Title>
        </TitleHolder>
        <MainNewsForm onSubmit={onSubmit}>
            <Formgroup>
                <Label htmlFor={`${uniqueId} img`}>Image</Label>
                <Input type="file" name="img" id={`${uniqueId} img`} style={{background:"var(--blue)", color:"var(--white)"}} accept=".png, .jpg" onChange={fileChange} ref={fileInput}/>
                {preview ? <img src={preview} alt={preview} title={preview} style={{height:"200px", width:"400px"}}/> :
               <img src={mainnews.img} alt="savedImg" title="savedImg" style={{height:"200px", width:"300px"}}/>}
            </Formgroup>
            <Formgroup>
                <Label htmlFor={`${uniqueId} ressort`}>Ressort</Label>
                <Input type="text" name="ressort" id={`${uniqueId} ressort`} defaultValue={ressort} onChange={(e)=>setData({...data, ressort: e.target.value})}/>
            </Formgroup>
            <Formgroup>
                <Label htmlFor={`${uniqueId} theme`}>Theme</Label>
                <Input type="text" name="theme" id={`${uniqueId} theme`} defaultValue={theme} onChange={(e)=>setData({...data, theme: e.target.value})}/>
            </Formgroup>
            <Formgroup>
                <Label htmlFor={`${uniqueId} title`}>Title</Label>
                <Input type="text" name="title" id={`${uniqueId} title`} defaultValue={title} onChange={(e)=>setData({...data, title: e.target.value})}/>
            </Formgroup>
            <Formgroup>
                <Label htmlFor="content">Content</Label>
                <Textarea type="text" name="content" id={`${uniqueId} content`} defaultValue={content} required onChange={(e)=>setData({...data, content: e.target.value})}></Textarea>
            </Formgroup>
            <ButtonHolder>
                <UpdateButton onClick={onSubmit}>Update</UpdateButton>
            </ButtonHolder>
        </MainNewsForm>
        <OkayButton onClick={()=>navigate(-1)}>Okay</OkayButton>
    </Container>
  )
}

export default MainnewsEdit