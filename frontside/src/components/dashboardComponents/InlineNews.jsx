import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import styled from "styled-components"
import { createInlineNews, getAllInlineNews, deleteInlineNews, reset } from "../../features/inlineNews/inlineNewsSlice";
import {Link} from "react-router-dom";
import Spinner from "../Spinner";
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
const ContentHolder = styled.div`
  width:100%;
  display
`;
const CrudForm = styled.form`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    
`;
const DataHolder = styled.div`
  width:100%;
  padding:10px;
  & img{
    width:300px;
    height:200px;
  }
  & .inlineWrapper{
    display:flex;
    align-items:center;
    ${small({flexDirection:"column"})};
    & .titleWrapper{
      margin: 0 30px;
      & h3, h4{
        margin: 10px 0;
      }
    }
  }
  & .contentWrapper{
    height:60px;
    overflow:hidden;
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
const CrudTextarea = styled.textarea`
  margin-left:15px;
  margin-top:10px;
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

const InlineNews = () => {
  const inlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
  const isError = useSelector((state)=>state.inlineNews.isError);
  const message = useSelector((state)=>state.inlineNews.message);
  const isLoading = useSelector((state)=>state.inlineNews.isLoading);
  const uniqueId = useId();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllInlineNews());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);
  const [formdata, setFormdata] = useState(
    {
      ressort:"",
      theme:"",
      title:"",
      content:"",
    }
  )
  const {ressort,theme,title,content} = formdata;
      //validation
      const [formerror, setFormerror] = useState({
        img:"",
        ressort:"",
        theme:"",
        title:"",
        content:"",
    })
  //img
  const [filedata, setFiledata] = useState({
    img:""
  })
  const [preview, setPreview] = useState(false);
  const {img} = filedata;
  const fileInput = useRef(img);
  const fileChange = (e)=>{
    const file = fileInput.current.files[0];
      setFiledata(file); 
    handlePreview(file)
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
  };
  const onSubmit = (e)=>{
    e.preventDefault();
    let errors = {...formerror};
       if(filedata.img === ""){
        errors.img = "Sie müssen ein Bild eingeben"
       } else{
         errors.img = "";
       }
    if(formdata.ressort === ""){
      errors.ressort = "Bitte geben Sie das Ressort ein"
    } else{
      errors.ressort = "";
    }
    if(formdata.title === ""){
      errors.title = "Bitte geben Sie den Titel ein"
    } else{
      errors.title = "";
    }
    if(formdata.theme === ""){
      errors.theme = "Bitte geben Sie das Thema ein"
    } else{
      errors.theme = "";
    }
    if(formdata.content === ""){
      errors.content = "Bitte geben Sie den Inhalt ein"
    } else{
      errors.content = "";
    }
    console.log(errors);
    if(Object.values(errors).every(x=>x === "")){
   const inlineNewsData = new FormData();
   inlineNewsData.append("ressort", formdata.ressort);
   inlineNewsData.append("theme", formdata.theme);
   inlineNewsData.append("title", formdata.title);
   inlineNewsData.append("content", formdata.content);
   inlineNewsData.append("img", filedata)
    dispatch(createInlineNews(inlineNewsData));
  }
    else{
      return setFormerror(errors);
    }
  } 
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <ToastContainer/>
          <CrudTitleHolder>
              <CrudTitle>Inline Nachrichten</CrudTitle>
            </CrudTitleHolder>
            <ContentHolder>
            {inlineNews.length > 0 && <DataHolder>
                {inlineNews.map((item)=>(
                  <div key={item._id}>
                    <div className="inlineWrapper">
                      <img src={item.img} alt={item.title}/>
                      <div className="titleWrapper">
                        <h4>Ressort: {item.ressort}</h4>
                        <h4>Thema: {item.theme}</h4>
                        <h3>Titel: {item.title}</h3>
                      </div>
                      <div className="contentWrapper">
                      <p>{item.content}</p>
                      </div>
                    </div>
                    <DataButtonHolder>
                      
                      <DataUpdateButton><Link to={`/inlineNewsEdit/${item._id}`} className="link" style={{display:"block", color:"var(--white)"}}>Update</Link></DataUpdateButton>     
                      <DataDeleteButton onClick={()=>dispatch(deleteInlineNews(item._id))}>Löschen</DataDeleteButton>
                    </DataButtonHolder>
                  </div>
                ))}
                </DataHolder>}
            </ContentHolder>
            <CrudForm onSubmit={onSubmit}>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} img`}>Bild hochladen</CrudLabel>
                <CrudInput type="file" name="img" id={`${uniqueId} img`}   
                style={{background:"var(--blue)", color:"var(--white)"}}
                ref={fileInput} onChange={fileChange}/>
                <div className='error'>
                  {formerror.img && <span>{formerror.img}</span>}
                </div>
            </InputHolder>
            {preview && <img src={preview} alt={preview} title={preview} style={{width:"300px", height:"200px"}}/>}
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} ressort`}>Ressortzuordnung</CrudLabel>
                <CrudInput type="text" name="ressort" id={`${uniqueId} ressort`}  value={ressort} onChange={(e)=>handleChange(e)}/>
              <div className='error'>
               {formerror.ressort && <span>{formerror.ressort}</span>}
            </div>
            </InputHolder>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} theme`}>Thema</CrudLabel>
                <CrudInput type="text" name="theme" id={`${uniqueId} theme`}  value={theme} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
               {formerror.theme && <span>{formerror.theme}</span>}
            </div>
            </InputHolder>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`}  value={title} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
               {formerror.title && <span>{formerror.title}</span>}
            </div>
            </InputHolder>
            <InputHolder>
              <CrudTextarea cols="50" 
              rows="10" 
              name="content" 
              id={`${uniqueId} content`} 
              placeholder="Inhalt" 
              value={content} 
              onChange={(e)=>handleChange(e)}></CrudTextarea>
              <div className='error'>
                {formerror.content && <span>{formerror.content}</span>}
              </div>
            </InputHolder>
                <DataButtonHolder>
                  <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                  </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default InlineNews