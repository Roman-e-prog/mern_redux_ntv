import styled from "styled-components"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementClicked } from "../features/advertises/advertiseSlice";
const Container = styled.div`
    width:100%;
`;
const AnounceHolder = styled.div`
    width:90%;
    margin:20px auto;
`;
const Img = styled.img`
    width:90%;
    height:200px;
    margin: 5px auto;
    object-fit:cover;
`;
const Adv = styled.span`
    width:50px;
    height:20px;
    background: var(--gray);
    color: var(--white);
    padding:5px;
`;
const Theme = styled.h4`
    color: var(--red);
    margin: 10px 0;
`;
const Title = styled.h3`
    font-size:22px;
    margin-bottom:5px;

`;
const Content = styled.p`
    width:90%;
`;
const LargeAnounce = ({state}) => {
    const dispatch = useDispatch();
    const handleCount = (id)=>{
        const incrementData = {
            id:id,
        }
       dispatch(incrementClicked(incrementData));
    }
  return (
    <Container>
        {
            state.map((item)=>(
                <AnounceHolder key={item._id}>
                    <Link to="/Sales&Services" className="link" style={{color:"var(--fontColor)"}} onClick={()=>handleCount(item._id)}>
                        <Img src={item.img} alt={item.title} title={item.title}/>
                        <Adv>{item.adv}</Adv>
                        <Theme>{item.theme}</Theme>
                        <Title>{item.title}</Title>
                        <Content>{item.content.slice(0,200)}</Content>
                    </Link>
                </AnounceHolder>
            ))
        }
    </Container>
  )
}

export default LargeAnounce