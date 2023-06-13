import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { createBilderserie, getAllBilderserie, deleteBilderserie, reset } from "../../features/bilderserien/bilderserieSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
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
const CrudForm = styled.form`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    
`;
const ContentWrapper = styled.div`
  width:100%;
`;
const DataHolder = styled.div`
  width:100%;
  padding:10px;
  & img{
    width:300px;
    height:200px;
    object-fit:cover;
  }
`;
const FormGroup =styled.div`
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
const CrudTextarea = styled.textarea`
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

const ImgSeries = () => {
  const {bilderserie, isLoading, isError, message} = useSelector((state)=>state.bilderserie);
  const uniqueId = useId();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllBilderserie());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);

  const [formdata, setFormdata] = useState({
    alt:"",
    title:"",
    content:"",
  })
  const {alt,title,content} = formdata;
    //validation
    const [formerror, setFormerror] = useState({
      img:"",
      alt:"",
      title:"",
      content:"",
  })
  const [filedata, setFiledata] = useState({
    img:""
  });
  const {img} = filedata;
  const fileInput = useRef(img);

  const [preview, setPreview] = useState(false);

  const fileChange = ()=>{
    const file = fileInput.current.files[0];
    setFiledata(file);
    handlePreview(file);
  }
  const handlePreview = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setPreview(reader.result);
    }
  }
  const handleChange = (e)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    let errors = {...formerror};
    if(filedata.img === null){
     errors.img = "Sie müssen ein Bild eingeben"
    } else{
      errors.img = "";
    }
    if(formdata.alt === ""){
      errors.theme = "Bitte geben Sie die Bildbeschreibung ein"
    } else{
      errors.theme = "";
    }
    if(formdata.title === ""){
      errors.title = "Bitte geben Sie den Titel ein"
    } else{
      errors.title = "";
    }
    if(formdata.content === ""){
      errors.content = "Bitte geben Sie den Inhalt ein"
    } else{
      errors.content = "";
    }
    if(Object.values(errors).every(x=>x === "")){
    const bilderserieData = new FormData();
    bilderserieData.append("alt", formdata.alt);
    bilderserieData.append("title", formdata.title);
    bilderserieData.append("content", formdata.content);
    bilderserieData.append("img", filedata);
    dispatch(createBilderserie(bilderserieData));
    }
    else{
      return setFormerror(errors);
    }
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
          <CrudTitleHolder>
              <CrudTitle>Bilderserie</CrudTitle>
            </CrudTitleHolder>
            <ContentWrapper>
            {bilderserie.length > 0 && <DataHolder>
                {bilderserie.map((item)=>(
                  <div key={item._id}>
                  <img src={item.img} alt={item.alt} title={item.title}/>
                  <p>{item.content}</p>
                  <DataButtonHolder>
                    <DataUpdateButton><Link to={`/bilderserienEdit/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Update</Link></DataUpdateButton>
                    <DataDeleteButton onClick={()=>dispatch(deleteBilderserie(item._id))}>Löschen</DataDeleteButton>
                  </DataButtonHolder>
                  </div>
                ))}
                </DataHolder>}
            </ContentWrapper>
            <CrudForm onSubmit={onSubmit}>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} img`}>Bild hochladen</CrudLabel>
                <CrudInput type="file" name="img" id={`${uniqueId} img`} 
                style={{background:"var(--blue)", color:"var(--white)"}}
                ref={fileInput} onChange={fileChange}/>
                <div className='error'>
                {formerror.img ? <span>{formerror.img}</span> : null}
              </div>
            </FormGroup>
            {preview && <img src={preview} alt={preview} title={preview} style={{width:"300px", height:"200px"}} />}
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} alt`}>Alt Titel</CrudLabel>
                <CrudInput type="text" name="alt" id={`${uniqueId} alt`} value={alt}  onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.alt ? <span>{formerror.alt}</span> : null}
              </div>
            </FormGroup>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`} value={title}  onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.title ? <span>{formerror.title}</span> : null}
              </div>
            </FormGroup>
            <FormGroup>
              <CrudLabel htmlFor="content">Inhalt</CrudLabel>
            <CrudTextarea name="content" value={content} onChange={(e)=>handleChange(e)} placeholder="Inhalt"></CrudTextarea>
            <div className='error'>
                {formerror.content ? <span>{formerror.content}</span> : null}
              </div>
            </FormGroup>
                <DataButtonHolder>
                    <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default ImgSeries