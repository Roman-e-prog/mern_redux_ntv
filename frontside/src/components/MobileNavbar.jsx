import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {BiLogInCircle, BiSearch} from 'react-icons/bi';
import { createSearch } from '../features/search/searchSlice';
import { logout, reset } from '../features/auth/authSlice';
import { getAllDropdownAudio } from '../features/dropdown/audioSlice';
import { getAllDropdownBoerse } from '../features/dropdown/boerseSlice';
import { getAllDropdownProgramm } from '../features/dropdown/programmSlice';
import { getAllDropdownRessort } from '../features/dropdown/ressortSlice';
import { getAllDropdownSport } from '../features/dropdown/sportSlice';
import { getAllDropdownVideos } from '../features/dropdown/videosSlice';
import { getAllDropdownWetter } from '../features/dropdown/wetterSlice';
import { navlinks } from "../data";
import {BiDownArrowCircle, BiUpArrowCircle} from 'react-icons/bi';
import { MdPlayArrow } from 'react-icons/md';
const Container = styled.div`
    width:100%;
`;
const Navbar = styled.nav`
    width:100%;
    display:flex;
    align-items:center;
    height:10vh;
    background:var(--blue);
    position:sticky;
    top:0;
    z-index:200,
`; 
const HamburgerHolder = styled.div`
    flex:1;
    height:100%;
    background:var(--white);
    display:flex;
    align-items:center;
    justify-content:center;

    & #hamburger{
        font-size:40px; 
    }
`;
const Logo = styled.div`
    flex:1;
    background: var(--red);
    height:100%;
    font-size:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 0 20px;

    & .link{
        color: var(--white);
        display:block;
    }
`;
const NaviRight = styled.div`
    flex:3;
    height:100%;
    display:flex;
    align-items:center;
    position:relative;

    & .icons, .link{
        font-size:18px;
        color:var(--white);
        margin-left:15px;
    }

    & p{
        margin-top:55px;
        padding:2px 30px 48px 30px;
        background:var(--white) ;
        font-size:18px;
    }
`;
const Ul = styled.ul`
    display:flex;
    align-items:center;

    & #logout{
        margin-left:10px;
    }
`;
const Li = styled.li`
`;
const LinkHolder = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px;
    border-bottom: 1px solid var(--blue);

    & .circle{
        color:var(--red);
        font-size:22px;
    }
`;
const SearchField = styled.div`
`;
const SearchForm = styled.form`
    width:300px;
    height:100px;
    background:var(--white);
    position:absolute;
    z-index:201;
    top:10vh;
    right:0;
    padding:5px;
`;
const SearchFormGroup = styled.div`
    display:flex;
    align-items:center;
`;
const SearchInput = styled.input`
    flex:4;
    padding:5px;
`;
const SearchButton = styled.button`
    flex:1;
    background:var(--blue);
    color:var(--white);
    padding:5px;
    border:none;
    margin-left:2px;
    cursor:pointer;
`;
const DropdownWrapper = styled.div`
    width:100%; 
    position:relative;

    & #section{
        display:flex;
        flex-direction:column;
    }
`;
const Dropdown = styled.div`
    width:100%;
    background:var(--white);
    position:absolute;
    z-index:201;
    top:0;
    min-height:50vh;
`;
const ContentHolder = styled.div`
    border-top:1px solid var(--blue);
`;
const FieldWrapper = styled.div`
    width:100%;

    & li{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:10px;
        border-bottom: 1px solid var(--blue); 

        & .arrow{
            color:var(--red);
            font-size:22px;
        }
    }
`;
const MobileNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth.user);
    //logout
    const onLogout = ()=>{
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }
    //dropdown
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = ()=>{
        if(isOpen){
            setIsOpen(false)
        }
        else{
            setIsOpen(true)
        }
    }
   
    const dropdownRessort = useSelector((state)=>state.dropdownRessort.dropdownRessort);
    const dropdownSport = useSelector((state)=>state.dropdownSport.dropdownSport);
    const dropdownBoerse = useSelector((state)=>state.dropdownBoerse.dropdownBoerse);
    const dropdownWetter = useSelector((state)=>state.dropdownWetter.dropdownWetter);
    const dropdownVideos = useSelector((state)=>state.dropdownVideos.dropdownVideos);
    const dropdownAudio = useSelector((state)=>state.dropdownAudio.dropdownAudios);
    const dropdownProgramm = useSelector((state)=>state.dropdownProgramm.dropdownProgramm);
    useEffect(()=>{
        dispatch(getAllDropdownRessort());
        dispatch(getAllDropdownSport());
        dispatch(getAllDropdownBoerse());
        dispatch(getAllDropdownWetter());
        dispatch(getAllDropdownVideos());
        dispatch(getAllDropdownAudio());
        dispatch(getAllDropdownProgramm());
    },[dispatch]);
//listenunterpunkte
    const [contentOpen, setContentOpen] = useState(new Array(navlinks.length).fill(false));
    const [content, setContent] = useState(new Array(navlinks.length).fill(null));
    const handleContentOpen = (name, index)=>{
       const newContentOpen = [...contentOpen];//Hier ist für jeden navlink ein false drin
        newContentOpen[index] = !newContentOpen[index]; //Damit wird der navlink mit dem jeweiligen index falsch oder wahr je nachdem was er ist
        setContentOpen(newContentOpen); //hier wird also falsch oder wahr gesetzt.
        const newContent = [...content]
        if(newContent[index]){
            newContent[index] = null
        } else{
            if(name === "Ressorts"){
                newContent[index] = dropdownRessort;
            }
            else if(name === "Sport"){
                newContent[index] = dropdownSport;
            }
            else if(name === "Börse"){
                newContent[index] = dropdownBoerse;
            }
            else if(name === "Wetter"){
                newContent[index] = dropdownWetter;
            }
            else if(name === "Video"){
                newContent[index] = dropdownVideos;
            }
            else if(name === "Audio"){
                newContent[index] = dropdownAudio;
            }
            else{ newContent[index] = dropdownProgramm}
        }
            setContent(newContent)
    }
    //search
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearch = ()=>{
        if(searchOpen){
            setSearchOpen(false);
        }
        else{
            setSearchOpen(true);
        }
    }
    const [formdata, setFormdata] = useState({
        searchValue:""
    });
    const {searchValue} = formdata;
    const handleSearchValue = (e)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const searchData ={
            searchValue,
        }
        dispatch(createSearch(searchData))
    }
  return (
    <Container>
      <Navbar>
      <HamburgerHolder>
            <GiHamburgerMenu id="hamburger" onClick={handleOpen}/>
        </HamburgerHolder>
        <Logo><Link to="/" className="link">rr-tv</Link></Logo>
        <NaviRight>
                       <Ul>
                           {user ? 
                           <Li><button onClick={onLogout} id="logout">Logout</button></Li>
                           :
                           <>
                                <Li><Link to="/register" className="link">Register</Link></Li>
                                <Li><Link to="/login" className="link"><BiLogInCircle className="icons" title="Login"/></Link></Li>
                           <Li onClick={handleSearch}>{searchOpen ? <p>X</p>: <BiSearch title="Suche" className="icons"/>}</Li>
                           </>
                       }
                       </Ul>
                       <SearchField>
                        {searchOpen ? <SearchForm onSubmit={onSubmit}>
                                        <SearchFormGroup>
                                            <SearchInput type="text" name="searchValue" id="searchValue" value={searchValue} onChange={(e)=>handleSearchValue(e)}/>
                                                <SearchButton onClick={onSubmit}><Link to="/search" className="link" style={{color:"var(--white)"}}>GO</Link></SearchButton>
                                        </SearchFormGroup>
                                    </SearchForm> : null}
                       </SearchField>
                   </NaviRight>
      </Navbar>
      <DropdownWrapper>
            {isOpen ? <Dropdown>
                <ul>
                {navlinks.map((item, index)=>(
                    <li key={index} id="section">
                        <LinkHolder>
                            <Link to={{pathname:`/${item.link}`}} className='link' key={item.id} style={{color:"black"}} title={item.name}>{item.name}</Link>
                            <span onClick={()=>handleContentOpen(item.name, index)}>{contentOpen[index] ? <BiUpArrowCircle className="circle"/>: <BiDownArrowCircle className="circle"/>}</span>
                            </LinkHolder>
                            <ContentHolder>
                            {content[index] ? <FieldWrapper>
                                <ul>
                                {content[index][0].lis.map((li, index)=>(
                                    <li key={index} onClick={handleOpen}><Link to={{pathname:`/${li.replace(/\s+/g, '')}`}} className="link" style={{color:"black"}} title={li}>{li}</Link><MdPlayArrow className="arrow"/></li>
                                ))}
                                </ul>
                                    </FieldWrapper>: null }    
                            </ContentHolder>
                    </li>
                    ))}
                </ul>
                </Dropdown> : null}
            </DropdownWrapper>
    </Container>
  )
}

export default MobileNavbar
