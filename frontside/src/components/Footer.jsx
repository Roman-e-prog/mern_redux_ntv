import styled from "styled-components";
import {FaFacebookF, FaTwitter, FaInstagram, FaRss, FaRegCopyright} from "react-icons/fa";
import { Link } from "react-router-dom";
import {middle} from '../responsive';
const Container = styled.div`
    width:100%;
    height:30vh;
    background: var(--blue);
    display:flex;
    flex-direction:column;
    ${middle({height:"60vh"})}
`;
const MenueContainer = styled.div`
    width:100%;
    height:20%;
    display:flex;
    align-items:center;
    justify-content:center;
    ${middle({marginTop:"40px"})}
`;
const Ul = styled.ul`
  display:flex;
  ${middle({flexDirection:"column"})}
`;
const Li =styled.li`
  margin-right:5px;
  cursor:pointer;
  ${middle({margin:"5px 0"})}
  & .link{
    color: var(--white);
  }
`;
const SocialMediaContainer = styled.div`
  display:flex;
  width:100%;
  height:30%;
  align-items:center;
  justify-content:center;
`;
const SocialIcon = styled.span`
  width:50px;
  height:50px;
  border: 3px solid var(--white);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-right:10px;
  cursor: pointer;
  ${middle({width:"30px", height:"30px"})}
    & .icon{
      color: var(--white);
      font-size:26px;
      ${middle({fontSize:"20px"})}
    }
`;
const Copyright = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;

  & .icon{
      color: var(--white);
      font-size:20px;
      margin-right:5px;
    }
`;
const P = styled.p`
  color: var(--white);
`;

const Footer = () => {
  return (
    <Container>
        <MenueContainer>
            <Ul>
                  <Li><Link to="/impressum"  className="link" title="Impressum">Impressum |</Link></Li>
                  <Li><Link to="/datenschutzerklaerung" className="link" title="Datenschutzerklärung">Datenschutzerklärung |</Link></Li>
                  <Li><Link to="/privacyCenter" className="link" title="Privacy Center">Privacy Center |</Link></Li>
                  <Li><Link to="/nutzungsbedingungen" className="link" title="Nutzungsbedingungen">Nutzungsbedingungen |</Link></Li>
                  <Li><a href="https://www.nachrichtenmanufaktur.de/" className="link" style={{color:"var(--white)"}} title="Nachrichtenmanufaktur">Nachrichtenmanufaktur</a></Li>
            </Ul>
        </MenueContainer>
        <SocialMediaContainer>
              <SocialIcon>
                  <a href="https://facebook.com/" className="link" style={{color:"var(--white)"}} title="facebook"><FaFacebookF className="icon"/></a> 
              </SocialIcon>
              <SocialIcon>
              <a href="https://twitter.com/" className="link" style={{color:"var(--white)"}} title="twitter"><FaTwitter className="icon"/></a>
              </SocialIcon>
              <SocialIcon>
              <a href="https://www.instagram.com/" className="link" style={{color:"var(--white)"}} title="Instagram"><FaInstagram className="icon"/></a>
              </SocialIcon>
              <SocialIcon>
             <FaRss className="icon"/>
              </SocialIcon>
        </SocialMediaContainer>
        <Copyright>
              <FaRegCopyright className="icon"/>
              <P>Roman Armin Rostock 2022</P>
        </Copyright>
    </Container>
  )
}

export default Footer