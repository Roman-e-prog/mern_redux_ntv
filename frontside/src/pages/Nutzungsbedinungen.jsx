import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {small, middle} from '../responsive';
import MobileNavbar from '../components/MobileNavbar';
import Navbar from '../components/Navbar';
const Container = styled.div`
    width:88%;
    margin: 0 auto;
    background:var(--white);
    min-height:100%;
    ${middle({width:"100%", margin:"0"})}
`;
const AGBWrapper = styled.div`
  width:90%;
  margin:0 auto;
  padding:10px;
  ${small({width:"100%", margin:"0"})}
`;
const Nutzungsbedinungen = () => {
        //mobile
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        useEffect(() => {
          const handleResize = () => setWindowWidth(window.innerWidth);
          window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  return (
    <Container>
       {windowWidth <= 420 ? <MobileNavbar/>: <Navbar/>}
       <AGBWrapper>
       <h1>Allgemeine Geschäftsbedingungen</h1>
        <h2>Geltungsbereich</h2>
        <p>Dies ist eine exemplarische Website und darf ohne Zustimmung von R.A.Rostock werder öffentlich genutzt werden, noch dürfen Inhalte verändert oder sonstwie verwendet werden.</p>
        <p>Geltungsbereich EU + USA</p>
       </AGBWrapper>
    </Container>
  )
}

export default Nutzungsbedinungen