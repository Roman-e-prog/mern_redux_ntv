import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { createMainNews, getAllMainNews, deleteMainNews, reset } from "../../features/news/newsSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../Spinner";
import {small} from "../../responsive";
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
const DataWrapper = styled.div`
  width:100%;
  padding:10px;
`;
const DataHolder = styled.div`
  width:100%;
    padding:10px;
  & img{
    width:300px;
    height:200px;
  }
  & #itemholder{
    display:flex;
    align-items:center;
    justify-content:space-around;
    ${small({flexDirection:"column"})};
    & #themeWrapper{
      margin: 0 100px;
      display:flex;
      flex-direction:column;
      & h4, h3{
        margin:10px 0;
      }
    }
  }
  & .contentHolder{
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
  & .link{
    display:block;
  }
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

const MainNews = () => {
  const dispatch = useDispatch();
  const mainnews = useSelector((state)=>state.mainnews.allMainNews);
  const isError = useSelector((state)=>state.mainnews.isError);
  const message = useSelector((state)=>state.mainnews.message);
  const isLoading = useSelector((state)=>state.mainnews.isLoading);
  const uniqueId = useId();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
      dispatch(getAllMainNews());

      return ()=>{
        dispatch(reset());
      }
    
  }, [dispatch, isError, message]);
  //text
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
  //file
  const [fileData, setFileData] = useState({
    img:""
  })
  const {img} = fileData;
  const fileInput = useRef(img);
  //change and preview
  const [preview, setPreview] = useState("");

  const fileChange = (e)=>{
    const file = fileInput.current.files[0];
      setFileData(file); 
    handlePreview(file)
  }
  const handlePreview = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setPreview(reader.result);
    }
  } 
  //text
  const handleChange = (e)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    let errors = {...formerror};
    if(fileData.img === null){
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
    if(Object.values(errors).every(x=>x === "")){
      const mainnewsData = new FormData();
      mainnewsData.append("ressort", formdata.ressort);
      mainnewsData.append("theme", formdata.theme);
      mainnewsData.append("title", formdata.title);
      mainnewsData.append("content", formdata.content);
      mainnewsData.append("img", fileData);
      dispatch(createMainNews(mainnewsData));
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
              <CrudTitle>Hauptnachrichten</CrudTitle>
            </CrudTitleHolder>
            <DataWrapper>
            {mainnews.length > 0 && <DataHolder>
                {mainnews.map((item)=>(
                  <div key={item._id}>
                    <div id="itemholder">
                      <img src={item.img} alt={item.title}/>
                      <div id="themeWrapper">
                        <h4>Ressort: {item.ressort}</h4>
                        <h4> Thema: {item.theme}</h4>
                        <h3>Titel: {item.title}</h3>
                      </div>
                      <div className="contentHolder">
                      <p>{item.content}</p>
                      </div>
                    </div>
                    <DataButtonHolder>
                      <DataUpdateButton><Link to={`/mainnewsEdit/${item._id}`} className="link" style={{color:"white"}}>Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>dispatch(deleteMainNews(item._id))}>Löschen</DataDeleteButton>
                    </DataButtonHolder>
                  </div>
                ))}
                </DataHolder>
              }
            </DataWrapper>
            <CrudForm onSubmit={onSubmit}>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} img`}>Bild hochladen</CrudLabel>
                <CrudInput type="file" name="img" id={`${uniqueId} img`} 
                style={{background:"var(--blue)", color:"var(--white)"}}
                accept=".jpeg, .png"
              ref={fileInput} onChange={fileChange}/>
               <div className='error'>
               {formerror.img && <span>{formerror.img}</span>}
            </div>
            </InputHolder>
            {
              preview && <img src={preview} alt={preview} title={preview} style={{height:"200px"}}/>
            }
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} ressort`}>Ressortzuordnung</CrudLabel>
                <CrudInput type="text" name="ressort" id={`${uniqueId} ressort`} value={ressort} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.ressort ? <span>{formerror.ressort}</span> : null}
            </div>
            </InputHolder>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} theme`}>Thema</CrudLabel>
                <CrudInput type="text" name="theme" id={`${uniqueId} theme`} value={theme} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.theme ? <span>{formerror.theme}</span> : null}
            </div>
            </InputHolder>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`} value={title} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.title ? <span>{formerror.title}</span> : null}
            </div>
            </InputHolder>
            <CrudTextarea placeholder="Inhalt" cols="50" rows="10" name="content" value={content} onChange={(e)=>handleChange(e)}></CrudTextarea>
            <div className='error'>
                {formerror.content ? <span>{formerror.content}</span> : null}
            </div>
                <DataButtonHolder>
                  <DataSendButton type="submit">Absenden</DataSendButton>
                </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default MainNews