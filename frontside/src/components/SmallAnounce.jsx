import styled from "styled-components"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementClicked } from "../features/advertises/inlineAdvertisesSlice";
const Container = styled.div`
    width:100%;
`;
const Wrapper = styled.div`
    display:flex;
    width:100%;
    margin-top: 20px ;
`;
const ImgHolder = styled.div`
    padding:5px;
`;
const Img = styled.img`
    width:200px;
    height:120px;
    object-fit:cover;
`;
const ConHolder = styled.div`
    padding:5px;
`;
const Adv = styled.span`
    width:50px;
    height:30px;
    margin: 5px 0;
    padding:0 5px;
    color: var(--white);
    font-size:16px;
    background: var(--gray);
`;
const Theme = styled.h4`
    color: var(--red);
    margin:10px 0;
`;
const Title = styled.h3`
    font-size:22px;
    margin-bottom:10px;
`;
const Content = styled.p``;
const SmallAnounce = ({state}) => {
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
                <Wrapper key={item._id}>
                    <Link to="/Sales&Services" className="link" style={{color:"var(--fontColor)"}} onClick={()=>handleCount(item._id)}>
                        <ImgHolder>
                        <Img src={item.img} alt={item.title} title={item.title}/>
                        </ImgHolder>
                        <ConHolder>
                            <Adv>{item.adv}</Adv>
                            <Theme>{item.theme}</Theme>
                            <Title>{item.title}</Title>
                            <Content>{item.content.slice(0,200)}</Content>
                        </ConHolder>
                    </Link>
                </Wrapper>
            ))
        }
    </Container>
  )
}

export default SmallAnounce