import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { getPartnerservice, updatePartnerservice } from "../../../features/partnerservice/partnerserviceSlice";
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
const PartnerserviceEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uniqueId = useId();
    const {id} = useParams();
    const partnerservice = useSelector((state)=>state.partnerservice.partnerService);
    const isError = useSelector((state)=>state.partnerservice.isError);
    const isLoading = useSelector((state)=>state.partnerservice.isLoading);
    const message = useSelector((state)=>state.partnerservice.message);
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        dispatch(getPartnerservice(id))
    },[dispatch, id, isError, message]);
    const [formdata, setFormdata] = useState({
        title:"",
        content:[""],
    })
    const {title, content} = formdata;

    useEffect(()=>{
        if(partnerservice){
            setFormdata({
                title:partnerservice.title,
                content:partnerservice.content,
            })   
        }
    }, [partnerservice]);
    const onSubmit = (e)=>{
        e.preventDefault();
       const partnerserviceData = {
        title,
        content,
       }
        const updateData = {id: id, partnerserviceData: partnerserviceData};
        dispatch(updatePartnerservice(updateData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
            <TitleHolder>
                <Title>Update Partnerservice</Title>
            </TitleHolder>
            <FormWrapper>
                <Form onSubmit={onSubmit}>
                <FormGroup>
                        <Label htmlFor={`${uniqueId} title`}>Partnerservice Titel</Label>
                        <Input type="text" name="title" id={`${uniqueId} title`} defaultValue={title} onChange={(e)=>setFormdata({...formdata, title: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} content`}>Service Namen</Label>
                        <Input type="text" name="content" id={`${uniqueId} content`} defaultValue={content} onChange={(e)=>setFormdata({...formdata, content:e.target.value})}/>
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

export default PartnerserviceEdit
