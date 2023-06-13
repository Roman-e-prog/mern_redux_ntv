import styled from "styled-components"
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {reset, updateDropdownSport, getDropdownSport} from "../../../features/dropdown/sportSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import Spinner from "../../../components/Spinner";
import Footer from "../../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useId } from "react";

const Container = styled.div`
    width:100%;
    background: var(--white);
`;
const TitleHolder = styled.div`
    width:100%;
    padding:10px;
`;
const Title = styled.h2``;
const ContentHolder = styled.div`
    width:100%;
    padding:10px;
`;
const UpdateForm = styled.form`

`;
const Label = styled.label``;
const Input = styled.input`
    width:100%;
    height:40px;
    border:none;
    margin: 5px 0;
    font-size:14px;
`;

const DataHolder = styled.div`
`;
const VideoWrapper = styled.div``;
const VideoSection = styled.section``;
const FormGroup = styled.div``;
const ButtonHolder = styled.div``;
const UpdateButton = styled.button`
    background:var(--blue);
    color:var(--white);
    padding:5px;
    border:none;
    cursor:pointer;
`;
const OkayButton = styled.button`
background:var(--white);
color:var(--blue);
padding:5px;
border:none;
cursor:pointer;
`;
const DropdownSportEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const uniqueId = useId();
    const singleDropdownSport = useSelector((state)=>state.dropdownSport.singleDropdownSport);
    const isLoading = useSelector((state)=>state.dropdownSport.isLoading);
    const isError = useSelector((state)=>state.dropdownSport.isError);
    const message = useSelector((state)=>state.dropdownSport.message);
    const [formdata, setFormdata] = useState({
        lis: [""],
        videos:[
                {
                    iframe:"",
                    ressort:"",
                    theme:"",
                    title:"",
                },
                {
                    iframe:"",
                    ressort:"",
                    theme:"",
                    title:"",
                },
                {
                    iframe:"",
                    ressort:"",
                    theme:"",
                    title:"",
                }, 
        ],
        themen:[""],
    })
    const {lis, videos, themen} = formdata;

    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
            dispatch(getDropdownSport(id));
            return ()=>{
                dispatch(reset());
            }
        
    }, [dispatch, isError, message, id]);
    
    useEffect(()=>{
            if(singleDropdownSport){
                setFormdata({...singleDropdownSport})
            }
    },[singleDropdownSport]);
    const [filedata, setFiledata] = useState({
        iframe:[]
    });

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
        [e.target.name.replace(/\d+$/, '')]: e.target.value
      }
      const newState = {
        ...prevState,
        videos,
      };
      return newState;
    });
  }
    console.log(lis, themen);
      const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('lis', JSON.stringify(lis));
        formData.append('themen', JSON.stringify(themen));
        formData.append('videos', JSON.stringify(videos));
        filedata.iframe.forEach((file, index) => {
            formData.append(`iframe${index}`, file);
          });
        const updateDropdownSportData = {
            formData,
            id:id
        }
        dispatch(updateDropdownSport(updateDropdownSportData));
      }

    if(isLoading){
        return <Spinner/>
    }
  return (
   
    <Container>
    <ToastContainer/>
        <TitleHolder>
            <Title>Update DropdownSport</Title>
        </TitleHolder>
        <ContentHolder>
            <UpdateForm onSubmit={onSubmit}>
            <section className="menupoints">
                  <Label htmlFor={`${uniqueId} lis`}>Menüpunkte Sport</Label>
                  <Input type="text" name="lis" id={`${uniqueId} lis`} defaultValue={lis} onChange={(e)=>setFormdata({...formdata, lis:e.target.value})}/>
                </section>
                <VideoWrapper>
                    <DataHolder>
                        {formdata.videos?.map((video, index)=>(
                            <div key={index}>
                                 <VideoSection onChange={(e)=>handleVideoChange(index,e)}>
                                    <FormGroup>
                                        <Label htmlFor={`iframe${index}`}>{`Video ${index +1}`}</Label>
                                        <Input type="file" name={`iframe${index}`} id={`${uniqueId} iframe${index}`} 
                                         onChange={(e)=>handleFileChange(index, e)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor={`ressort${index}`}>{`Video ${index +1} Ressortzuordnung`}</Label>
                                        <Input type="text" name={`ressort${index}`} id={`${uniqueId} ressort${index}`} defaultValue={video.ressort}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor={`theme${index}`}>{`Video ${index +1} Themenzuordnung`}</Label>
                                        <Input type="text" name={`theme${index}`} id={`${uniqueId} theme${index}`} defaultValue={video.theme}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor={`title${index}`}>{`Video ${index +1} Titelzuordnung`}</Label>
                                        <Input type="text" name={`title${index}`} id={`${uniqueId} title${index}`} defaultValue={video.title}/>
                                    </FormGroup>
                                </VideoSection>
                            </div>
                        ))}
                        </DataHolder>
                </VideoWrapper>
                <section className="themen">
                  <Label htmlFor={`${uniqueId} themen`}>Themen</Label>
                  <Input type="text" name="themen" id={`${uniqueId} themen`} defaultValue={themen} onChange={(e)=>setFormdata({...formdata, themen:e.target.value})}/>
                </section>
                        <ButtonHolder>
                            <UpdateButton type="submit">Update</UpdateButton>
                        </ButtonHolder> 
 
            </UpdateForm>
            <OkayButton onClick={()=>navigate(-1)}>Okay</OkayButton>
        </ContentHolder>
        <Footer/>
    </Container>
  )
}

export default DropdownSportEdit