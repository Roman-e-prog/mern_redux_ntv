import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {getAllInlineAdvertise, createInlineAdvertise, deleteInlineAdvertise, reset} from "../../features/advertises/inlineAdvertisesSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import Spinner from "../Spinner";
import {small, middle} from '../../responsive';
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
    ${middle({flexDirection:"column"})};
    & #themeWrapper{
      margin: 0 100px;
      display:flex;
      flex-direction:column;
      & h4, h3{
        margin:10px 0;
      }
    }
  }
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
  display:flex;
  align-items:center;
  justify-content:center;
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
  border:none;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
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

const InlineAdvertises = () => {
  const dispatch = useDispatch();
  const inlineAdvertises = useSelector((state)=>state.inlineAdvertises.inlineAdvertises);
  const isError = useSelector((state)=>state.inlineAdvertises.isError);
  const isLoading = useSelector((state)=>state.inlineAdvertises.isLoading);
  const message = useSelector((state)=>state.inlineAdvertises.message);
  const uniqueId = useId();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
      dispatch(getAllInlineAdvertise());

      return ()=>{
        dispatch(reset());
      }
    
  }, [dispatch, isError, message]);
  //text
  const [formdata, setFormdata] = useState(
    {
      theme:"",
      title:"",
      content:"",
    }
  )
  const {theme,title,content} = formdata;
      //validation
      const [formerror, setFormerror] = useState({
        img:"",
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
    const inlineAdvertisesData = new FormData();
    inlineAdvertisesData.append("theme", formdata.theme);
    inlineAdvertisesData.append("title", formdata.title);
    inlineAdvertisesData.append("content", formdata.content);
    inlineAdvertisesData.append("img", fileData);
   
    dispatch(createInlineAdvertise(inlineAdvertisesData));
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
              <CrudTitle>Inline Anzeigen</CrudTitle>
            </CrudTitleHolder>
            <DataWrapper>
            {inlineAdvertises.length > 0 && <DataHolder>
                {inlineAdvertises.map((item)=>(
                  <div key={item._id}>
                    <div id="itemholder">
                      <img src={item.img} alt={item.title}/>
                      <div id="themeWrapper">
                        <h4> Thema: {item.theme}</h4>
                        <h3>Titel: {item.title}</h3>
                      </div>
                      <p>{item.content}</p>
                    </div>
                    <DataButtonHolder>
                      
                      <DataUpdateButton><Link to={`/inlineAdvertisesEdit/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Update</Link></DataUpdateButton>
                      
                      <DataDeleteButton onClick={()=>dispatch(deleteInlineAdvertise(item._id))}>Löschen</DataDeleteButton>
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
                {formerror.img ? <span>{formerror.img}</span> : null}
              </div>
            </InputHolder>
            {
              preview && <img src={preview} alt={preview} title={preview} style={{height:"200px"}}/>
            }
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} theme`}>Thema</CrudLabel>
                <CrudInput type="text" name="theme" id={`${uniqueId} theme`}  value={theme} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.theme ? <span>{formerror.theme}</span> : null}
              </div>
            </InputHolder>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} title`}>Titel</CrudLabel>
                <CrudInput type="text" name="title" id={`${uniqueId} title`}  value={title} onChange={(e)=>handleChange(e)}/>
                <div className='error'>
                {formerror.title ? <span>{formerror.title}</span> : null}
              </div>
            </InputHolder>
            <InputHolder>
                <CrudLabel htmlFor={`${uniqueId} content`}>Werbetext</CrudLabel>
                <CrudTextarea name="content" id={`${uniqueId} content`}  placeholder="Werbetext" value={content} onChange={(e)=>handleChange(e)}></CrudTextarea>
                <div className='error'>
                {formerror.content ? <span>{formerror.content}</span> : null}
              </div>
            </InputHolder>
                <DataButtonHolder>
                  <DataSendButton onClick={onSubmit}>Absenden</DataSendButton>
                </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default InlineAdvertises