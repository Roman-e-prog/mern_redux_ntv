import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { LoginSchema } from "../validations/LoginValidation";
import update from 'immutability-helper';
import { useId } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import {small,middle} from '../responsive';
import MobileNavbar from "../components/MobileNavbar";
const Container = styled.div`
  width:88%;
  margin: 0 auto;
  ${middle({width:"100%", margin:"0"})}
`;
const Registerbackground = styled.div`
  width:100%;
  height:75vh;
  background: var(--white);
`
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
  flex-direction:column;
  padding:20px;
  width:60%;
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
    padding: 10px;
    background: var(--red);
    color: var(--white);
    font-size:20px;
    border:none;
    cursor:pointer;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uniqueId = useId();
  const {user, isLoading, isError, message} = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    if(user?.isAdmin){
      navigate("/dashboard");
      return;
    }
    else if(user){
      navigate("/userLetter")
    }
    return ()=> {
      dispatch(reset());
    }
  }, [ user, navigate, dispatch, isError, message]);

    const [formData, setFormData] = useState({
      email:"",
      passwort:"",
      username:"",
    });
    const {email, passwort, username} = formData;
  //validation
  const [formerror, setFormerror] = useState({
    username:false,
    email:false,
    passwort:false,
    error:[],
})
    const handleChange = (e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
    const onSubmit = useCallback(
      async (e) => {
        e.preventDefault()
        const loginData = {
                  username,
                  email,
                  passwort,
              }
        // Check the schema if form is valid:
        const isFormValid = await LoginSchema.isValid(loginData, {
          abortEarly: false, // Prevent aborting validation after first error
        })
  
        if (isFormValid) {
          dispatch(login(loginData))
        } else {
          // If form is not valid, check which fields are incorrect:
          LoginSchema.validate(loginData, { abortEarly: false }).catch((err) => {
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
      [dispatch, email, passwort, username]
    )
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
          <Title>Login</Title>
                <Registerfield onSubmit={onSubmit}>
                      <Label htmlFor={`${uniqueId} email`}>E-Mail</Label>
                      <Input type="email" 
                              name="email" 
                              id={`${uniqueId} email`}
                              value={email} 
                              onChange={handleChange}
                             />    
                             <div className='error'>
                             {formerror.email && <span>{formerror.email}</span>}
                            </div>

                      <Label htmlFor={`${uniqueId} username`}>Benutzername</Label>
                      <Input type="text" 
                              name="username" 
                              id={`${uniqueId} username`}
                              value={username}
                              onChange={handleChange}
                             />
                        <div className='error'>
                        {formerror.username && <span>{formerror.username}</span>}
                      </div>
                        <Label htmlFor={`${uniqueId} passwort`}>Passwort</Label>
                        <Input type="password" 
                              name="passwort" 
                              id={`${uniqueId} passwort`}
                              value={passwort}
                              onChange={handleChange} 
                             />
                        <div className='error'>
                        {formerror.passwort && <span>{formerror.passwort}</span>}
                        </div>
                        <ButtonHolder>
                          <Button type="submit">Login</Button>
                        </ButtonHolder>
                </Registerfield>
              </RegisterContainer>
          </Registerbackground>
          <Footer/>
  </Container>;
};

export default Login;

