import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBreakingNews, updateBreakingNews} from "../../../features/breakingNews/breakingNewsSlice";
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
const BreakingNewsEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const breakingNews = useSelector((state)=>state.breakingNews.breakingNews);
    const isError = useSelector((state)=>state.breakingNews.isError);
    const isLoading = useSelector((state)=>state.breakingNews.isLoading);
    const message = useSelector((state)=>state.breakingNews.message);
    const {id} = useParams();
    const uniqueId = useId();
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getBreakingNews(id));
    }, [isError, message, dispatch, id]);
    //Textfields
    const [formdata, setFormdata] = useState({
        content:""
    })
    const {content} = formdata;

    useEffect(()=>{
        if(breakingNews){
            setFormdata({
                content:breakingNews.content
            })   
        }
    }, [breakingNews]);

    const onSubmit = (e)=>{
        e.preventDefault();
       const breakingNewsData = {
        content,
       }
        const updateData = {id: id, breakingNewsData: breakingNewsData};
        dispatch(updateBreakingNews(updateData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
            <TitleHolder>
                <Title>Update Breaking News</Title>
            </TitleHolder>
            <FormWrapper>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} news`}>Breakingnews</Label>
                        <Input type="text" name="news" id={`${uniqueId} news`} defaultValue={content} onChange={(e)=>setFormdata({...formdata, content: e.target.value})}/>
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

export default BreakingNewsEdit