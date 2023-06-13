import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import {small} from '../../responsive';
import { useId } from "react";
import update from 'immutability-helper';
import { PartnerserviceSchema } from '../../validations/PartnerserviceValidation';
import { createPartnerservice, deletePartnerservice, getAllPartnerservice } from '../../features/partnerservice/partnerserviceSlice';

const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;
const CrudTitleHolder = styled.div`
  width:100%;
  height:60px;
  display:flex;
  align-items:center;
  background: var(--blue);
`;
const CrudTitle = styled.div`
  color:var(--white);
  font-size: 24px;
  margin-left:20px;
`;
const ContentHolder = styled.div`
  width:100%;
`;
const DataHolder =styled.div`
    width:100%;
    display:flex;
    margin: 0 10px;
    padding:5px;
  ${small({flexDirection:"column"})};
    & #fieldwrapper{
      width:30%;
      display:flex;
      margin:0 2px;
      flex-direction:column;
      min-height:400px;
      position:relative;
      ${small({width:"90%", margin:"0 auto"})}

      & span{
        position:absolute;
        width:100%;
        height:50px;
        bottom:0;
        display:flex;
        align-items:center;
        justify-content:space-around;
      }
    }
`;
const CrudForm = styled.form`
    width:100%;
`;
const InputHolder =styled.div`
    width:90%;
    display:flex;
    flex-direction:column;
    margin: 0 auto;
    padding:5px;
`;
const CrudLabel = styled.label`
    color: var(--gray);
    font-weight:500;
    margin: 5px 0;
`;
const CrudInput = styled.input`
    padding:2px;
    width:90%;
    margin: 2px 0;
`;
const DataButtonHolder = styled.div`
  width:100%;
  height:50px;
  display:flex;
  align-items:center;
`;
const DataSendButton = styled.button`
  width:20%;
  padding:10px;
  margin:0 10px;
  background: var(--red);
  color: var(--white);
  border:none;
  cursor: pointer;
  ${small({width:"30%"})}
`;
const DataUpdateButton = styled.div`
  flex:1;
  background: green;
  color: var(--white);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;

  & .link{
    padding:10px;
    color:var(--white);
    display:block;
  }
`;
const DataDeleteButton = styled.button`
  flex:1;
  padding:10px;
  margin:0 10px;
  background: var(--gray);
  color: var(--white);
  border:none;
  cursor: pointer;
`;
const Partnerservice = () => {
  const uniqueId = useId();
  const dispatch = useDispatch();
  const partnerServices = useSelector((state)=>state.partnerservice.partnerServices);
  const isLoading = useSelector((state)=>state.partnerservice.isLoading);
  const isError = useSelector((state)=>state.partnerservice.isError);
  const message = useSelector((state)=>state.partnerservice.isError);
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllPartnerservice());
  },[dispatch, isError, message]);

  const handleDelete = async (id)=>{
    await dispatch(deletePartnerservice(id));
    dispatch(getAllPartnerservice());
  }
  const [formdata, setFormdata] = useState(
    {
      title:"",
      content:[],
    }
  )
  const { title, content } = formdata;
  const [formerror, setFormerror] = useState({
    title:false,
    content:false,
    error:[],
  });
  const handleChange = (e)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const partnerserviceData = {
                title,
                content,
            }
      // Check the schema if form is valid:
      const isFormValid = await PartnerserviceSchema.isValid(partnerserviceData, {
        abortEarly: false, // Prevent aborting validation after first error
      })

      if (isFormValid) {
        dispatch(createPartnerservice(partnerserviceData))
      } else {
        // If form is not valid, check which fields are incorrect:
        PartnerserviceSchema.validate(partnerserviceData, { abortEarly: false }).catch((err) => {
          const errors = err.inner.reduce((acc, error) => {
            return {
              ...acc,
              [error.path]: error.errors,
            }
          }, {})
            console.log(errors);
          // Update form errors state:
          setFormerror((prevErrors) =>
            update(prevErrors, {
              $set: errors,
            })
          )
        })
      }
    },
    [dispatch, content, title]
  )
  if(isLoading){
    return <Spinner/>
  }
    return (
        <Container>
          <ToastContainer/>
              <CrudTitleHolder>
                  <CrudTitle>Partnerservices</CrudTitle>
                </CrudTitleHolder>
                <ContentHolder>
                {partnerServices.length > 0 && <DataHolder>
                    {partnerServices.map((item)=>(
                      <div key={item._id} id="fieldwrapper">
                          <h3>{item.title}</h3>
                          <ul>{item.content && item.content.map((c, index)=>(
                            <li key={index}>{c}</li>
                          ))}</ul>
                          <span>
                           <DataUpdateButton><Link to={{pathname: `/partnerserviceEdit/${item._id}`}} className="link">Update</Link></DataUpdateButton>
                           <DataDeleteButton onClick={()=>handleDelete(item._id)}>Löschen</DataDeleteButton>
                          </span>
                      </div>
                    ))}    
                  </DataHolder> }
                </ContentHolder>
                <CrudForm onSubmit={onSubmit}>
                <InputHolder>
                      <CrudLabel htmlFor={`${uniqueId} title`}>Title</CrudLabel>
                      <CrudInput type="text" name="title" required id={`${uniqueId} title`} value={title} onChange={(e)=>handleChange(e)}/>
                      <div className="error">{formerror.title && <span>{formerror.title}</span>}</div>
                    </InputHolder>
                  <InputHolder>
                      <CrudLabel htmlFor={`${uniqueId} content`}>Service Namen</CrudLabel>
                      <CrudInput type="text" name="content" required id={`${uniqueId} content`} value={content} onChange={(e)=>handleChange(e)}/>
                      <div className="error">{formerror.content && <span>{formerror.content}</span>}</div>
                    </InputHolder>
                    <DataButtonHolder>
                        <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                        </DataButtonHolder>
                </CrudForm>
        </Container>
  )
}

export default Partnerservice
