import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUkraineNews, updateUkraineNews} from "../../../features/ukraineNews/ukraineNewsSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from '../../../components/Spinner';
import {middle} from '../../../responsive';
import { useId } from "react";
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
const CoronaNewsEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ukraineNews = useSelector((state)=>state.ukraineNews.ukraineNews);
    const isLoading = useSelector((state)=>state.ukraineNews.isLoading);
    const isError = useSelector((state)=>state.ukraineNews.isError); 
    const message = useSelector((state)=>state.ukraineNews.message);
    const {id} = useParams();
    const uniqueId = useId();
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getUkraineNews(id));
    }, [isError, message, dispatch, id]);
    //Textfields
    const [formdata, setFormdata] = useState({
        title:"",
        text:"",
    })
    const {title, text} = formdata;

    useEffect(()=>{
        if(ukraineNews){
            setFormdata({
                title:ukraineNews.title,
                text:ukraineNews.text,
            })   
        }
    }, [ukraineNews]);
    const onSubmit = (e)=>{
        e.preventDefault();
       const ukraineNewsData = {
        title,
        text,
       }
        const updateData = {id: id, ukraineNewsData: ukraineNewsData};
        dispatch(updateUkraineNews(updateData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
            <TitleHolder>
                <Title>Update Ukraine Liveticker</Title>
            </TitleHolder>
            <FormWrapper>
                <Form onSubmit={onSubmit}>
                <FormGroup>
                        <Label htmlFor={`${uniqueId} title`}>Ukraine Titel</Label>
                        <Input type="text" name="title" id={`${uniqueId} title`} defaultValue={title} onChange={(e)=>setFormdata({...formdata, title: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} text`}>Ukraine Text</Label>
                        <Input type="text" name="text" id={`${uniqueId} text`} defaultValue={text} onChange={(e)=>setFormdata({...formdata, text: e.target.value})}/>
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

export default CoronaNewsEdit