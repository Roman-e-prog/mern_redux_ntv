import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import {register, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { RegisterSchema } from "../validations/RegisterValidation";
import update from 'immutability-helper';
import { useId } from "react";
import MobileNavbar from "../components/MobileNavbar";
import {small, middle} from '../responsive';
const Container = styled.div`
  width:88%;
  margin: 0 auto;
  ${middle({width:"100%", margin:"0"})}
`;
const Registerbackground = styled.div`
  width:100%;
  height:75vh;
  background: var(--white);
`;
const RegisterContainer = styled.div`
  height:100%;
  width:80%;
  margin:0 auto;
  background: var(--lightblue);
  display:flex;
  flex-direction:column;
  ${small({width:"100%", margin:"0"})}
`;
const Registerfield = styled.form`
  display:flex;
  flex-wrap:wrap;
  padding:20px;
`;
const RegisterLeft = styled.div`
  width:45%;
  display:flex;
  flex-direction:column;
  margin-right:20px; 
`;
const RegisterRight = styled.div`
  width:45%;
  display:flex;
  flex-direction:column;
`;
const Title = styled.h2`
  color: var(--gray);
  padding:10px;
  font-size:22px;
`;
const Label = styled.label`
  color: var(--gray);
  font-size:18px;
  margin:5px 0;
`;
const Input = styled.input`
  padding:5px;
`;
const ButtonHolder = styled.div`
  width:100%;
`;
const Button = styled.button`
    margin:20px 20px;
    width:80%;
    padding: 10px;
    background: var(--red);
    color: var(--white);
    font-size:20px;
    border:none;
    cursor:pointer;
`;
const Register = () => {
  const uniqueId = useId();
    const [formData, setFormData] = useState({
      vorname: "",
      nachname:"",
      email:"",
      passwort:"",
      passwortValidation:"",
      username:"",
    });
    
    const {vorname, nachname, email, passwort, passwortValidation, username} = formData;
      //validation
  const [formerror, setFormerror] = useState({
    vorname:false,
    nachname:false,
    email:false,
    passwort:false,
    error:[],
})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth);
   
    useEffect(()=>{
      if(isError){
        toast.error(message);
      }
      if(isSuccess || user){
        navigate("/login");
      }
      dispatch(reset());
    }, [ user, isError, isSuccess, message, navigate, dispatch]);
 
    const handleChange = (e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
    const onSubmit = useCallback( async (e)=>{
      e.preventDefault();
      const registerData ={
        vorname,
        nachname,
        email,
        username,
        passwort,
        passwortValidation,
    }
          const userdata = {
              vorname,
              nachname,
              email,
              username,
              passwort,
          }
       
          const isFormValid = await RegisterSchema.isValid(registerData, {
              abortEarly: false, // Prevent aborting validation after first error
            })
          if(isFormValid){
              dispatch(register(userdata))
          }  else {
              // If form is not valid, check which fields are incorrect:
              RegisterSchema.validate(userdata, { abortEarly: false }).catch((err) => {
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
          
      
  },[dispatch,  vorname, nachname, email, username, passwort, passwortValidation]);
      //mobile
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

      useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    if(isLoading){
      return <Spinner/>
    }
  return <Container>
    <ToastContainer/>
          {windowWidth <= 420 ? <MobileNavbar/>: <Navbar/>}
          <Registerbackground>
            <RegisterContainer>
          <Title>REGISTRIERUNG</Title>
                <Registerfield onSubmit={onSubmit}>
                    <RegisterLeft>
                      <Label htmlFor={`${uniqueId} vorname`}>Vorname</Label>
                      <Input type="text" 
                              name="vorname" 
                              id={`${uniqueId} vorname`} 
                              value={vorname}
                              onChange={handleChange}
                             />
                      <div  className="error">
                        {formerror.vorname && <span>{formerror.vorname}</span>}
                      </div>
                      <Label htmlFor={`${uniqueId} nachname`}>Nachname</Label>
                      <Input type="text" 
                              name="nachname" 
                              id={`${uniqueId} nachname`}
                              value={nachname}
                              onChange={handleChange}
                            />
                      <div  className="error">
                        {formerror.nachname && <span>{formerror.nachname}</span>}
                      </div>
                      <Label htmlFor={`${uniqueId} email`}>E-Mail</Label>
                      <Input type="email" 
                              name="email" 
                              id={`${uniqueId} email`}
                              value={email} 
                              onChange={handleChange}
                             />
                        <div  className="error">
                        {formerror.email && <span>{formerror.email}</span>}
                      </div>
                    </RegisterLeft>
                    <RegisterRight>
                      <Label htmlFor={`${uniqueId} passwort`}>Passwort</Label>
                      <Input type="password" 
                              name="passwort" 
                              id={`${uniqueId} passwort`}
                              value={passwort}
                              onChange={handleChange} 
                             />
                      <div  className="error">
                        {formerror.passwort && <span>{formerror.passwort}</span>}
                      </div>
                      <Label htmlFor={`${uniqueId} passwortValidation`}>Passwortbestätigung</Label>
                      <Input type="password" 
                              name="passwortValidation" 
                              id={`${uniqueId} passwortValidation`} 
                              value={passwortValidation}
                              onChange={handleChange}
                              />
                      <div  className="error">
                        {formerror.passswortValidation && <span>{formerror.passswortValidation}</span>}
                    </div>
                      <Label htmlFor="username">Benutzername</Label>
                      <Input type="text" 
                              name="username" 
                              id="username" 
                              value={username}
                              onChange={handleChange}
                             />
                        <div  className="error">
                        {formerror.username && <span>{formerror.username}</span>}
                      </div>
                      <ButtonHolder>
                        <Button type="submit">Registrieren</Button>
                      </ButtonHolder>
                    </RegisterRight>  
                </Registerfield>
              </RegisterContainer>
          </Registerbackground>
          <Footer/>
  </Container>;
};

export default Register;
