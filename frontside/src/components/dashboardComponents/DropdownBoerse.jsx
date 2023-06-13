import styled from "styled-components";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDropdownBoerse, getAllDropdownBoerse, deleteDropdownBoerse,reset } from "../../features/dropdown/boerseSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import {small, middle, large} from '../../responsive';
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
const DataWrapper = styled.div`
  width:100%;
  padding:10px;
`;
const DataHolder = styled.div`
  width:100%;
  margin-bottom:20px;
  & #name{
    font-size:20px;
  }
  & #listenpunkte{
    margin: 10px 0;
    font-weight:500;
  }
`;
const VideoWrapper = styled.div`
  display:flex;
  justify-content:space-around;
  margin-bottom: 10px;
`;
const DataVideoholder = styled.div`
  width:25%;
& video{
  width:200px;
  height:120px;
}
`;
const Themen = styled.div`
  font-weight:500;
  margin-bottom:10px;
`;
const Form = styled.form`
  width:100%;
  height:90%;
  display:flex;
  flex-direction:column;
  padding:10px;
`;
const FormGroup = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Videos = styled.div`
  width:100%;
  display:flex;
  ${middle({flexDirection:"column"})};
`;
const Label = styled.label`
  color: var(--gray);
  font-weight:500;
  margin:5px 0;
`;
const Input = styled.input`
  padding:5px;
  ${large({padding:"1px"})}
`;
const DataButtonHolder = styled.div`
  width:100%;
  display:flex;
`;
const DataSendButton = styled.button`
  width:20%;
  padding:10px;
  margin:0 10px;
  background: var(--red);
  color: var(--white);
  border:none;
  cursor: pointer;
  ${small({width:"30%"})};
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
  ${small({width:"30%"})};
`;

const DropdownBoerse = () => {
  //bring in
  const dispatch = useDispatch();
  const {dropdownBoerse, isLoading, isError, message} = useSelector((state)=>state.dropdownBoerse);
  const uniqueId = useId();
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    dispatch(getAllDropdownBoerse());

    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message]);
//bring out
  const [formdata, setFormdata] = useState(
    {
      lis:[],
      videos:[
        {
          ressort:"",
          theme:"",
          title:"",
        },
        {
          ressort:"",
          theme:"",
          title:"",
        },
        {
          ressort:"",
          theme:"",
          title:"",
        },
      ],
      themen:[],
    }
  );
    const {lis ,ressort,theme, title, themen} = formdata;
     //validation
     const [formerror, setFormerror] = useState({
      lis:"",
      iframe0:"",
      iframe1:"",
      iframe2:"",
      ressort0:"",
      ressort1:"",
      ressort2:"",
      theme0:"",
      theme1:"",
      theme2:"",
      title0:"",
      title1:"",
      title2:"",
      themen:"",
  })
    const [filedata, setFiledata] = useState({
      iframe:[]
    })
    const handleFileChange = (index, e) => {
      const file = e.target.files[0];
      setFiledata((prevState) => {
      const newIframe = [...prevState.iframe];
      newIframe[index] = file;
      return {
        ...prevState,
        iframe: newIframe,
      };
    });
  };
    const handleVideoChange = (index, e)=>{
      setFormdata((prevState)=>{
        const videos = [...prevState.videos];
        videos[index] = {
          ...videos[index],
          [e.target.name]: e.target.value
        }
        return {
          ...prevState,
          videos,
        };
      });
    }
    const handleChange = (e)=>{
      setFormdata((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const onSubmit = async (e)=>{
      e.preventDefault();
      let errors = {...formerror};
      if(filedata.iframe === null){
       errors.iframe0 = "Sie müssen ein Video eingeben"
      } else{
        errors.iframe0 = "";
      }
      if(filedata.iframe === null){
        errors.iframe1 = "Sie müssen ein Video eingeben"
       } else{
         errors.iframe1 = "";
       }
       if(filedata.iframe === null){
        errors.iframe2 = "Sie müssen ein Video eingeben"
       } else{
         errors.iframe2 = "";
       }
      if(formdata.videos[0].ressort === ""){
        errors.ressort0 = "Bitte geben Sie das Ressort ein"
      } else{
        errors.ressort0 = "";
      }
      if(formdata.videos[0].title === ""){
        errors.title0 = "Bitte geben Sie den Titel ein"
      } else{
        errors.title0 = "";
      }
      if(formdata.videos[0].theme === ""){
        errors.theme0 = "Bitte geben Sie das Thema ein"
      } else{
        errors.theme0 = "";
      }
      if(formdata.videos[1].ressort === ""){
        errors.ressort1 = "Bitte geben Sie das Ressort ein"
      } else{
        errors.ressort1 = "";
      }
      if(formdata.videos[1].title === ""){
        errors.title1 = "Bitte geben Sie den Titel ein"
      } else{
        errors.title1 = "";
      }
      if(formdata.videos[1].theme === ""){
        errors.theme1 = "Bitte geben Sie das Thema ein"
      } else{
        errors.theme1 = "";
      }
      if(formdata.videos[2].ressort === ""){
        errors.ressort2 = "Bitte geben Sie das Ressort ein"
      } else{
        errors.ressort2 = "";
      }
      if(formdata.videos[2].title === ""){
        errors.title2 = "Bitte geben Sie den Titel ein"
      } else{
        errors.title2 = "";
      }
      if(formdata.videos[2].theme === ""){
        errors.theme2 = "Bitte geben Sie das Thema ein"
      } else{
        errors.theme2 = "";
      }
      if(formdata.themen === ""){
        errors.themen = "Bitte geben Sie den Inhalt ein"
      } else{
        errors.themen = "";
      }
      if(Object.values(errors).every(x=>x === "")){
      const dropdownBoerse = new FormData();
      dropdownBoerse.append("lis",JSON.stringify(formdata.lis));
      dropdownBoerse.append("themen",JSON.stringify(formdata.themen));
      dropdownBoerse.append("videos",JSON.stringify(formdata.videos));
      filedata.iframe.forEach((file, index)=>{
        dropdownBoerse.append(`iframe${index}`, file);
      })
      await dispatch(createDropdownBoerse(dropdownBoerse))
      dispatch(getAllDropdownBoerse());
    }
    else{
      return setFormerror(errors);
    }
  }
    const handleDelete = async (id)=>{
      await dispatch(deleteDropdownBoerse(id))
      dispatch(getAllDropdownBoerse());
    }
    if(isLoading){
      return <Spinner/>
    }
  return (
    <Container>
      <ToastContainer/>
            <CrudTitleHolder>
              <CrudTitle>Dropdown Menü Boerse</CrudTitle>
            </CrudTitleHolder>
            <DataWrapper>
            {dropdownBoerse.length > 0 && <DataHolder>
                {dropdownBoerse.map((item, index)=>(
                  <div key={IDBIndex}>
                        <h4 id="name">{item.name}</h4>
                      <div id="listenpunkte">Menüpunkte: {item.lis.join(", ")}<span style={{color:"var(--red)"}}> Bitte nur nach Absprache verändern.</span></div>
                      <VideoWrapper>
                        {item.videos && item.videos.map((item, index)=>(
                           <DataVideoholder key={index}>
                           <video src={item.iframe} title={item.title}></video>
                           <h4>{item.ressort}</h4>
                           <h4>{item.theme}</h4>
                           <p>{item.title}</p>
                         </DataVideoholder>
                        ))}
                        </VideoWrapper>
                        <Themen>Themen: {item.themen.join(", ")}</Themen>
                        <DataButtonHolder>
                      <DataUpdateButton><Link to={`/dropdownboerseedit/${item._id}`} className="link" style={{color:"white"}}>Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>handleDelete(item._id)}>Löschen</DataDeleteButton>
                    </DataButtonHolder>
                  </div>
                ))}
                </DataHolder>}
            </DataWrapper>

            <Form onSubmit={onSubmit}>
                <FormGroup className="menupoints">
                  <Label htmlFor={`${uniqueId} lis`}>Menüpunkte Börse</Label>
                  <Input type="text" name="lis" id={`${uniqueId} lis`} value={lis} onChange={(e)=>handleChange(e)}/>
                  <span style={{color:"var(--red)"}}> Bitte nur nach Absprache verändern.</span>
                  <div className='error'>
                {formerror.lis? <span>{formerror.lis}</span> : null}
              </div>
                </FormGroup>
                <Videos onChange={(e)=>handleVideoChange(0,e)}>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} iframe0`}>Videos</Label>
                        <Input type="file" name="iframe0" id={`${uniqueId} iframe0`} onChange={(e)=>handleFileChange(0,e)}/>
                        <div className='error'>
                        {formerror.iframe0 ? <span>{formerror.iframe0}</span> : null}
                      </div>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} ressort0`}>Video Ressort</Label>
                        <Input type="text" name="ressort" id={`${uniqueId} ressort0`} value={ressort}/>
                        <div className='error'>
                        {formerror.ressort0 ? <span>{formerror.ressort0}</span> : null}
                      </div>
                      </FormGroup>
                    <FormGroup>
                        <Label htmlFor={`${uniqueId} theme0`}>Video Theme</Label>
                        <Input type="text" name="theme" id={`${uniqueId} theme0`} value={theme}/>
                        <div className='error'>
                        {formerror.theme0 ? <span>{formerror.theme0}</span> : null}
                      </div>
                      </FormGroup>
                        <FormGroup>
                        <Label htmlFor={`${uniqueId} title0`}>Video Titel</Label>
                        <Input type="text" name="title" id={`${uniqueId} title0`} value={title}/>
                        <div className='error'>
                        {formerror.title0 ? <span>{formerror.title0}</span> : null}
                      </div>
                      </FormGroup>
                    </Videos>
                    <Videos onChange={(e)=>handleVideoChange(1,e)}>
                        <FormGroup>
                          <Label htmlFor={`${uniqueId} iframe1`}>Videos</Label>
                          <Input type="file" name="iframe1" id={`${uniqueId} iframe1`} onChange={(e)=>handleFileChange(1,e)}/>
                          <div className='error'>
                        {formerror.iframe1 ? <span>{formerror.iframe1}</span> : null}
                      </div>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor={`${uniqueId} ressort1`}>Video Ressort</Label>
                          <Input type="text" name="ressort" id={`${uniqueId} ressort1`} value={ressort}/>
                          <div className='error'>
                        {formerror.ressort1 ? <span>{formerror.ressort1}</span> : null}
                      </div>
                        </FormGroup>
                      <FormGroup>
                          <Label htmlFor={`${uniqueId} theme1`}>Video Theme</Label>
                          <Input type="text" name="theme" id={`${uniqueId} theme1`} value={theme}/>
                          <div className='error'>
                        {formerror.theme1 ? <span>{formerror.theme1}</span> : null}
                      </div>
                        </FormGroup>
                          <FormGroup>
                          <Label htmlFor={`${uniqueId} title1`}>Video Titel</Label>
                          <Input type="text" name="title" id={`${uniqueId} title1`} value={title}/>
                          <div className='error'>
                        {formerror.title1 ? <span>{formerror.title1}</span> : null}
                      </div>
                        </FormGroup>
                      </Videos>
                      <Videos onChange={(e)=>handleVideoChange(2,e)}>
                        <FormGroup>
                          <Label htmlFor={`${uniqueId} iframe2`}>Videos</Label>
                          <Input type="file" name="iframe2" id={`${uniqueId} iframe2`} onChange={(e)=>handleFileChange(2,e)}/>
                          <div className='error'>
                        {formerror.iframe2 ? <span>{formerror.iframe2}</span> : null}
                      </div>
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor={`${uniqueId} ressort2`}>Video Ressort</Label>
                          <Input type="text" name="ressort" id={`${uniqueId} ressort2`} value={ressort}/>
                          <div className='error'>
                        {formerror.ressort2 ? <span>{formerror.ressort2}</span> : null}
                      </div>
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor={`${uniqueId} theme2`}>Video Theme</Label>
                          <Input type="text" name="theme" id={`${uniqueId} theme2`} value={theme}/>
                          <div className='error'>
                        {formerror.theme2 ? <span>{formerror.theme2}</span> : null}
                      </div>
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor={`${uniqueId} title2`}>Video Titel</Label>
                          <Input type="text" name="title" id={`${uniqueId} title2`}value={title}/>
                          <div className='error'>
                        {formerror.title2 ? <span>{formerror.title2}</span> : null}
                      </div>
                        </FormGroup>
                        </Videos>
                        <FormGroup>
                            <Label htmlFor={`${uniqueId} themen`}>Themen</Label>
                            <Input type="text" name="themen" id={`${uniqueId} themen`} value={themen} onChange={(e)=>handleChange(e)}/>
                            <div className='error'>
                        {formerror.themen ? <span>{formerror.themen}</span> : null}
                      </div>
                        </FormGroup>
                        <DataButtonHolder>
                            <DataSendButton type="submit">Absenden</DataSendButton>
                        </DataButtonHolder>
                    </Form>
    </Container>
  )
}

export default DropdownBoerse