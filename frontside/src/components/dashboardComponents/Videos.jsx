import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createVideos, getAllVideos, deleteVideos, reset } from "../../features/video/videoSlice";
import Spinner from "../Spinner";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import {small} from '../../responsive';
import { Link } from "react-router-dom";
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

  & video{
    width:200px;
    height:120px;
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
    color:var(--white);
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

const Videos = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state)=>state.videos.videos);
  const isError = useSelector((state)=>state.videos.isError);
  const isLoading = useSelector((state)=>state.videos.isLoading);
  const message = useSelector((state)=>state.videos.message);
  const uniqueId = useId();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllVideos());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);

  const [formdata, setFormdata] = useState({
    ressort:"",
    theme:"",
    title:"",
  })
  const {ressort,theme,title} = formdata;
    //validation
    const [formerror, setFormerror] = useState({
      src:"",
      ressort:"",
      theme:"",
      title:"",
  })

  const [filedata, setFiledata] = useState({
    src:""
  })
  const {src} = filedata;
  const fileInput = useRef(src);

  const fileChange = ()=>{
    const file = fileInput.current.files[0];
    setFiledata(file);
  }
 
  const handleChange = (e)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    let errors = {...formerror};
    if(filedata.src === ""){
     errors.src = "Sie müssen ein Video hochladen"
    } else{
      errors.src = "";
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
    
    if(Object.values(errors).every(x=>x === "")){
   const videosData = new FormData();
   videosData.append("ressort", formdata.ressort);
   videosData.append("theme", formdata.theme);
   videosData.append("title", formdata.title);
   videosData.append("src", filedata);
    dispatch(createVideos(videosData));
    dispatch(getAllVideos());
  }
   else{
  return setFormerror(errors);
  }
}
  const handleDelete = async (id)=>{
   await dispatch(deleteVideos(id))
    dispatch(getAllVideos());
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <ToastContainer/>
          <CrudTitleHolder>
              <CrudTitle>Videos</CrudTitle>
            </CrudTitleHolder>
            <ContentWrapper>
            {videos.length > 0 && <DataHolder>
                {videos.map((item)=>(
                  <div key={item._id}>
                    <div>
                    <video src={item.src} title={item.title}></video>
                    <h4>{item.ressort}</h4>
                    <h4>{item.theme}</h4>
                    <h3>{item.title}</h3>
                    </div>
                    <DataButtonHolder>
                      <DataUpdateButton><Link to={{pathname:`/videosEdit/${item._id}`}} className="link">Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>handleDelete(item._id)}>Löschen</DataDeleteButton>
                    </DataButtonHolder>
                  </div>
                ))}
                </DataHolder>}
            </ContentWrapper>
            <CrudForm onSubmit={onSubmit}>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} src`}>Video hochladen</CrudLabel>
                <CrudInput type="file" name="src" id={`${uniqueId} src`}  
                style={{background:"var(--blue)", color:"var(--white)"}}
                ref={fileInput} onChange={fileChange}/>
                  <div className='error'>
               {formerror.src && <span>{formerror.src}</span>}
            </div>
            </FormGroup>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} ressort`}>Ressortzuordnung</CrudLabel>
                <CrudInput type="text" name="ressort" id={`${uniqueId} ressort`} value={ressort} onChange={(e)=>handleChange(e)}/>
                  <div className='error'>
                {formerror.ressort && <span>{formerror.ressort}</span>}
              </div>
            </FormGroup>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} theme`}>Thema</CrudLabel>
                <CrudInput type="text" name="theme" id={`${uniqueId} theme`} value={theme} onChange={(e)=>handleChange(e)}/>
                  <div className='error'>
                {formerror.theme && <span>{formerror.theme}</span>}
              </div>
            </FormGroup>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`} value={title} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
               {formerror.title && <span>{formerror.title}</span>}
            </div>
            </FormGroup>
                <DataButtonHolder>
                  <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default Videos