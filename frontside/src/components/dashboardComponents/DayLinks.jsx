import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDayLinks, getAllDayLinks, deleteDayLinks, reset } from "../../features/dayLinks/dayLinksSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import {Link} from "react-router-dom"
import Spinner from "../Spinner";
import {small,middle} from '../../responsive';
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

    & .long{
        width:85%;
        display:flex;
        flex-direction:column;
        margin: 0 10px;
        padding:5px;
    }
`;
const ContentWrapper = styled.div`
  width:100%;
`;
const DataHolder =styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-around;
    margin: 0 10px;
    padding:5px;
    ${middle({flexDirection:"column"})}

    & #holder{
      width:300px:
      height:300px;
      display:flex;
      flex-direction:column;

      & img{
        width:280px;
        height:200px;
      }
    }
`;
const FormGroup =styled.div`
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
  padding:10px;
  display:flex;
`;
const DataDeleteButton = styled.button`
  width:100px;
  padding:10px;
  margin: 5px;
  background: var(--gray);
  color: var(--white);
  border: none;
  cursor:pointer;
`;
const DataUpdateButton = styled.div`
  width:100px;
  padding:10px;
  margin: 5px;
  background: green;
  color: var(--white);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
`;
const DataSendButton = styled.button`
  width:20%;
  padding:10px;
  margin: 5px 12px;
  background: var(--red);
  color: var(--white);
  border:none;
  cursor:pointer;
  ${small({width:"30%"})}
`;
const DayLinks = () => {
  const dispatch = useDispatch();
  const dayLinks = useSelector((state)=>state.dayLinks.dayLinks);
  const isError = useSelector((state)=>state.dayLinks.isError);
  const isLoading = useSelector((state)=>state.dayLinks.dayLoading);
  const message = useSelector((state)=>state.dayLinks.message);
  const uniqueId = useId();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllDayLinks());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);
  const [formdata, setFormdata] = useState(
    {
      ident:"",
      title:"",
      content:"",
    }
  )
  const {ident,title,content} = formdata;
      //validation
      const [formerror, setFormerror] = useState({
        img:"",
        ident:"",
        title:"",
        content:"",
    })
  //file
  const [filedata, setFiledata] = useState({
    img:""
  })
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
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    let errors = {...formerror};
    if(filedata.img === ""){
     errors.img = "Sie müssen ein Bild eingeben"
    } else{
      errors.img = "";
    }
    if(formdata.ident === ""){
      errors.ident = "Bitte geben Sie das Ressort ein"
    } else{
      errors.ident = "";
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
    const dayLinksData = new FormData();
    dayLinksData.append("ident", formdata.ident);
    dayLinksData.append("title", formdata.title);
    dayLinksData.append("content", formdata.content);
    dayLinksData.append("img", filedata);
  
    dispatch(createDayLinks(dayLinksData));

    return (()=>{
      dispatch(reset());
    })
  }
  else{
    return setFormerror(errors);
  }  
}
const handleDelete = async (id)=>{
  await dispatch(deleteDayLinks(id));
  dispatch(getAllDayLinks());
}
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <ToastContainer/>
          <CrudTitleHolder>
              <CrudTitle>Tages Links</CrudTitle>
            </CrudTitleHolder>
            <ContentWrapper>
            {dayLinks.length > 0 && <DataHolder>
                {dayLinks.map((dayLink)=>(
                  <div id="holder" key={dayLink._id}>
                      <img src={dayLink.img} alt={dayLink.ident} title={dayLink.ident}/>
                      <span>Erstellt: {new Date(dayLink.createdAt).toLocaleString("de-De")}</span>
                      <h3>Zu verwendende Id: {dayLink.ident}</h3>
                      <h4>{dayLink.title}</h4>
                      <p>{dayLink.content}</p>
                    <DataButtonHolder>
                      <DataUpdateButton><Link to={`/dayLinksEdit/${dayLink._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>handleDelete(dayLink._id)}>Löschen</DataDeleteButton>
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
                ref={fileInput}
                onChange={fileChange}/>
                  <div className='error'>
               {formerror.img ? <span>{formerror.img}</span> : null}
            </div>
            </FormGroup>
            {preview && <img src={preview} alt={preview} title={preview} style={{width:"300px", height:"200px"}}/>}
            <FormGroup>
                <CrudLabel htmlFor="ident">Id</CrudLabel>
                <CrudInput type="text" name="ident" id="ident" value={ident} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
               {formerror.ident && <span>{formerror.ident}</span>}
            </div>
            </FormGroup>
            <FormGroup>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`}value={title} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
               {formerror.title && <span>{formerror.title}</span>}
            </div>
            </FormGroup>
            <FormGroup className="long">
                <CrudLabel htmlFor={`${uniqueId} content`}>Inhalt</CrudLabel>
                <CrudInput type="text" name="content" id={`${uniqueId} content`} value={content} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
               {formerror.content && <span>{formerror.content}</span>}
            </div>
            </FormGroup>
               <DataButtonHolder>
               <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
               </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default DayLinks