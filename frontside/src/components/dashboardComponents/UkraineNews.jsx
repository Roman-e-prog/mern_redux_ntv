import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUkraineNews, getAllUkraineNews, deleteUkraineNews, reset } from "../../features/ukraineNews/ukraineNewsSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import {small} from '../../responsive';
import { useId } from "react";
import { UkraineNewsSchema } from "../../validations/UkraineNewsValidation";
import update from 'immutability-helper';
const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
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
const CrudForm = styled.form`
    width:100%;
`;
const ContentHolder = styled.div`
  width:50%;
`;
const DataHolder =styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    margin: 0 10px;
    padding:5px;

    & p{
      font-weight:20px;
      color: var(--gray);
      font-weight:500;
    }
`;
const InputHolder =styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    margin: 0 10px;
    padding:5px;
    ${small({width:"100%"})};
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
  display:flex;
  padding:10px;
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
  width:200px;
  padding:10px;
  margin:0 10px;
  background: green;
  color: var(--white);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;
`;
const DataDeleteButton = styled.button`
  width:200px;
  padding:10px;
  margin:0 10px;
  background: var(--gray);
  color: var(--white);
  border:none;
  cursor: pointer;
`;

const UkraineNews = () => {
  const allUkraineNews = useSelector((state)=>state.ukraineNews.allUkraineNews);
  const isError = useSelector((state)=>state.ukraineNews.isError);
  const isLoading = useSelector((state)=>state.ukraineNews.isLoading);
  const message = useSelector((state)=>state.ukraineNews.message);
  const dispatch = useDispatch();
  const uniqueId = useId();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllUkraineNews());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);
  const [formdata, setFormdata] = useState(
    {
      title:"",
      text:"",
    }
  )
  const { title, text } = formdata;
  const [formerror, setFormerror] = useState({
    title:false,
    text:false,
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
      const ukraineNewsData = {
                title,
                text,
            }
      // Check the schema if form is valid:
      const isFormValid = await UkraineNewsSchema.isValid(ukraineNewsData, {
        abortEarly: false, // Prevent aborting validation after first error
      })

      if (isFormValid) {
        dispatch(createUkraineNews(ukraineNewsData))
      } else {
        // If form is not valid, check which fields are incorrect:
        UkraineNewsSchema.validate(ukraineNewsData, { abortEarly: false }).catch((err) => {
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
    [dispatch, text, title]
  )
  const handleDelete = (id)=>{
    dispatch(deleteUkraineNews(id));
    dispatch(getAllUkraineNews());
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <ToastContainer/>
          <CrudTitleHolder>
              <CrudTitle>Ukraine Liveticker</CrudTitle>
            </CrudTitleHolder>
            <ContentHolder>
            {allUkraineNews.length > 0 && <DataHolder>
                {allUkraineNews.map((item)=>(
                  <div key={item._id}>
                    <span>{new Date(item.createdAt).toLocaleString("de-De")}</span>
                    <p>{item.title}</p>
                    <p>{item.text}</p>
                    <DataButtonHolder>
                      <DataUpdateButton><Link to={`/ukraineNewsEdit/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>handleDelete(item._id)}>Löschen</DataDeleteButton>
                  </DataButtonHolder>
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
                  <CrudLabel htmlFor={`${uniqueId} text`}>Text</CrudLabel>
                  <CrudInput type="text" name="text" required id={`${uniqueId} text`} value={text} onChange={(e)=>handleChange(e)}/>
                  <div className="error">{formerror.text && <span>{formerror.text}</span>}</div>
                </InputHolder>
                <DataButtonHolder>
                    <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                    </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default UkraineNews