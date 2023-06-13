import React from "react";
import styled from "styled-components";
import Clocks from "./Clocks";
import { BiLogInCircle, BiSearch } from "react-icons/bi";
import {FaRegRegistered} from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { navlinks } from "../data";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
import {getAllDropdownAudio} from "../features/dropdown/audioSlice";
import {getAllDropdownBoerse} from "../features/dropdown/boerseSlice";
import {getAllDropdownProgramm} from "../features/dropdown/programmSlice";
import {getAllDropdownRessort} from "../features/dropdown/ressortSlice";
import {getAllDropdownSport} from "../features/dropdown/sportSlice";
import {getAllDropdownVideos} from "../features/dropdown/videosSlice";
import {getAllDropdownWetter} from "../features/dropdown/wetterSlice";
import { createSearch } from "../features/search/searchSlice";
import {middle, large} from "../responsive";
const Container = styled.nav`
    width:100%;
    height:15vh;
    background: var(--blue);
    position:sticky;
    top:0;
    z-index:200;
    display:flex;
`;
const Logo = styled.div`
    flex:1;
    background: var(--red);
    color: var(--white);
    height:100%;
    font-size:40px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 0 20px;
    ${large({fontSize:"30px"})}
`;
const Menue = styled.div`
    flex:7;
    display:flex;
    flex-direction:column;
    position:relative;
`;
const DataTime = styled.div`
    width:100%;
    height:20%;
`;
const Navi = styled.div`
    width:100%;
    height:80%;
    display:flex;
    align-items:center;
`;
const NaviLeft =styled.div`
    flex:2;
    height:100%;
    display:flex;
    align-items:center;
`;
const Ul = styled.ul`
    list-style:none;
    display:flex;
    align-items:center;
    height:100%;
    width:100%;
`;
const Li = styled.li`
    margin-left:10px;
    font-size:18px;
    cursor: pointer;
    height:80%;
    display:flex;
    align-items:center;
    padding:25px 10px 38px 10px;
    ${large({marginLeft: "5px"})}
     ${middle({marginLeft: "2px"})}
    
    & .link{
        color: var(--white);
        font-size:18px;
        height:80%;
        display:flex;
        align-items:center;
        margin-top:15px;
        padding:35px 10px 48px 10px;
        ${large({fontSize:"16px", padding:"35px 5px 48px 5px"})}
        ${middle({padding: "35px 2px 48px 2px", fontSize:"15px"})}
    }
    & .link:hover{
        color: var(--red);
        background: var(--white);
    }
`;
const NaviRight = styled.div`
    flex:1;
    position:relative;
    height:100%;
    display:flex;
    align-items:center;
    & li, .link{
        font-size:20px;
        margin-left:10px;
        color:var(--white);
        ${large({fontSize:"16px"})}
    }

    & p{
        margin-top:55px;
        padding:2px 30px 48px 30px;
        background:var(--white);
        color:black;
        font-weight:bold;
        font-size:18px;
    }
`;
const DropDown = styled.div`
    width:110.5%;
    height:77vh;
    background: var(--white);
    position:absolute;
    z-index:201;
    top:15vh;
    right:0;
    display:flex;
    padding-top:5px;
    ${middle({width:"114%"})}
`;
const DropDownLeft = styled.div`
    flex:1;
    margin-right:5px;
`;
const DropDownUl = styled.div`
`;
const DropDownLi = styled.li`
    font-size:13px;
    font-weight:600;
    margin-bottom:5px;
    padding:2px 0 2px 2px;
    cursor:pointer;
    border-bottom: 2px solid var(--gray);
    &:last-of-type{
        border:none;
    }
`;
const DropdownRight = styled.div`
    flex:3;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`;
const DropDownVideos = styled.div`
    display:flex;
`;
const DropDownVideo = styled.div`
    margin-right:5px;
`;
const Iframe = styled.iframe`
    background: var(--lightblue);
    ${large({width:"200px", height:"120px"})}
    ${middle({width:"150px", height:"80px"})}
`;
const Timestampholder = styled.div`
    display:flex;
    justify-content:space-between;
    margin: 2px 0 5px 0;
`;
const Timestamp = styled.span`
    color: var(--gray);
    margin-right:4px;
`;
const H5 = styled.h5`
    color: var(--gray);
    margin-left:2px;
`;
const H4 = styled.h4`
    color: var(--red);
    margin-bottom:10px;
`;
const H3 = styled.h3`
    color: var(--gray);
    font-size:18px;
`
const DropDownTheme = styled.div`
    height:40px;
    display:flex;
    align-items:center;
    border-top: 1px solid var(--gray);
`;
const Theme = styled.p`
    margin: 0 5px;
`;
const ThemeItems = styled.p`
    margin-right:5px;
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

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);
    //dropdown
        const [isOpen, setIsOpen] = useState(false);
        const [content, setContent] = useState();
       
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
    const handleEnter= (name)=>{
        setIsOpen(true);
        if(name === "Ressorts"){
            setContent(dropdownRessort);
        }
        else if(name === "Sport"){
            setContent(dropdownSport);
        }
        else if(name === "Börse"){
            setContent(dropdownBoerse);
        }
        else if(name === "Wetter"){
            setContent(dropdownWetter);
        }
        else if(name === "Video"){
            setContent(dropdownVideos);
        }
        else if(name === "Audio"){
            setContent(dropdownAudio);
        }
        else{ setContent(dropdownProgramm)}
    };       
    const handleLeave = ()=>{
        setIsOpen(false);
    }
    const onLogout = ()=>{
        dispatch(logout());
        dispatch(reset());
        navigate("/");
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
        console.log("Hallo");
        const searchData ={
            searchValue,
        }
        console.log(searchData)
        dispatch(createSearch(searchData))
    }
  return <Container>
            <Link to="/" className="link">
            <Logo>rr-tv</Logo>
            </Link>
            <Menue>
                <DataTime>
                    <Clocks/>
                </DataTime>
                <Navi>
                   <NaviLeft>
                       <Ul>
                           {
                               navlinks.map((item,index)=>(
                                       <Li onMouseEnter={()=>handleEnter(item.name)} key={index}><Link to={{pathname:`/${item.link}`}} className="link" key={item.id}>{item.name}</Link></Li> 
                               ))
                           } 
                       </Ul>
                   </NaviLeft>
                   <NaviRight>
                       <Ul>
                           {user ? 
                           <li><button onClick={onLogout}>Logout</button></li>
                           :
                           <>
                                <li><Link to="/register" className="link"><FaRegRegistered title="Registrierung"/></Link></li>
                                <li><Link to="/login" className="link"><BiLogInCircle className="icons" title="Login"/></Link></li>
                           <li onClick={handleSearch} id="search">{searchOpen ? <p>X</p>: <BiSearch title="Suche" className="icons"/>}</li>
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
                </Navi>
                {isOpen ? <DropDown onMouseLeave={handleLeave}>
                    {
                      content.map((item, index)=>(
                          <React.Fragment key={index}>
                          <DropDownLeft key={index}>
                            <DropDownUl>
                                <ul>
                            {
                                item.lis.map((li, index)=>(
                                    <DropDownLi key={index}><MdPlayArrow style={{fontSize:"14px", color:"var(--red)", marginRight:"5px"}}/><Link to={{pathname:`/${li.replace(/\s+/g, '')}`}} className="link" style={{color:"black"}}>{li}</Link></DropDownLi>
                                ))
                            }
                            </ul>
                            </DropDownUl>
                        </DropDownLeft>
                        <DropdownRight>
                        <DropDownVideos>
                        {
                          item.videos.map((video, index)=>(
                            <DropDownVideo key={index}>
                                <Iframe src={video.iframe} alt={video.name} title={video.title}/>
                                <Timestampholder>
                                <H5>{video.ressort}</H5>
                                <Timestamp>{new Date(item.createdAt).toLocaleTimeString("de-De", {hour:"numeric", minute:"numeric"})}</Timestamp>
                                </Timestampholder>
                                <H4>{video.theme}</H4>
                                <H3>{video.title}</H3>
                            </DropDownVideo>
                          ))  
                        }   
                            </DropDownVideos>
                            <DropDownTheme>
                            <Theme>Themen:</Theme>
                            {
                                item.themen.map((thema)=>(
                                    <React.Fragment key={thema}>
                                    <ThemeItems>{thema}</ThemeItems>
                                    </React.Fragment>
                                ))
                            }
                            </DropDownTheme>
                        </DropdownRight>
                        </React.Fragment>
                      ))
                    }
                </DropDown> : null}
            </Menue>
  </Container>;
};

export default Navbar;
