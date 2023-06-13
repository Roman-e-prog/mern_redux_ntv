import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector} from "react-redux";
import styled from "styled-components"
import { createSliderItems, getAllSliderItems, deleteSliderItems, reset } from "../../features/topSlider/sliderItemsSlice";
import Spinner from "../Spinner";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import {Link} from "react-router-dom";
import { TopSliderSchema } from "../../validations/TopSliderItemValidation";
import update from 'immutability-helper';
import {small} from '../../responsive';
import { useId } from "react";
const Container = styled.div`
    width:100%;
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
const ContentWrapper = styled.div`
  width:100%;
`;
const CrudForm = styled.form`
    width:100%;
    display:flex;
    flex-wrap:wrap;
`;
const DataHolder = styled.div`
  width:100%;
  padding:10px;
`;
const InputHolder =styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    margin: 0 10px;
    padding:5px;
    ${small({width:"100%"})}
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
  width:20%;
  padding:10px;
  margin:0 10px;
  background: green;
  color: var(--white);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;
  ${small({width:"30%"})}
`;
const DataDeleteButton = styled.button`
  width:20%;
  padding:10px;
  margin:0 10px;
  background: var(--gray);
  color: var(--white);
  border:none;
  cursor: pointer;
  ${small({width:"30%"})}
`;

const TopSliderItems = () => {
  const sliderItems = useSelector((state)=>state.sliderItems.sliderItems);
  const isError = useSelector((state)=>state.sliderItems.isError);
  const isLoading = useSelector((state)=>state.sliderItems.isLoading);
  const message = useSelector((state)=>state.sliderItems.message);
  const uniqueId = useId();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllSliderItems());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);

  const [formdata, setFormdata] = useState(
    {
      title:"",
      body:"",
    }
  )
  const {title,body} = formdata;
     //validation
     const [formerror, setFormerror] = useState({
      title:false,
      body:false,
      error:[],
  })

  const handleChange = (e)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const sliderItemsData = {
        title,
        body,
      }
      // Check the schema if form is valid:
      const isFormValid = await TopSliderSchema.isValid(sliderItemsData, {
        abortEarly: false, // Prevent aborting validation after first error
      })

      if (isFormValid) {
        dispatch(createSliderItems(sliderItemsData));
      } else {
        // If form is not valid, check which fields are incorrect:
        TopSliderSchema.validate(sliderItemsData, { abortEarly: false }).catch((err) => {
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
    [dispatch, title, body]
  )

  const handleDelete = async (id)=>{
   await dispatch(deleteSliderItems(id));
    dispatch(getAllSliderItems());
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <ToastContainer/>
          <CrudTitleHolder>
              <CrudTitle>Top-Slider Inhalte</CrudTitle>
            </CrudTitleHolder>
            <ContentWrapper>
            {sliderItems.length > 0 && <DataHolder>
                {sliderItems.map((item)=>(
                  <div key={item._id}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                    <DataButtonHolder>
                      <DataUpdateButton><Link to={`/topSliderItemsEdit/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>handleDelete(item._id)}>Löschen</DataDeleteButton>
                    </DataButtonHolder>
                  </div>
                ))}
                </DataHolder>}
            </ContentWrapper>
            <CrudForm onSubmit={onSubmit}>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`} required value={title} onChange={handleChange}/>
                <div className='error'>
               {formerror.title && <span>{formerror.title}</span>}
              </div>
                <CrudLabel htmlFor={`${uniqueId} body`}>Inhalt</CrudLabel>
                <CrudInput type="text" name="body" id={`${uniqueId} body`} required value={body} onChange={handleChange}/>
                <div className='error'>
               {formerror.body && <span>{formerror.body}</span>}
             </div>
              </InputHolder>
                <DataButtonHolder>
                  <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default TopSliderItems