import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import {getAllVideos} from "../features/video/videoSlice";
import VideoSlider from "./VideoSlider";
import { useEffect } from "react";
import {small} from "../responsive";
const Container = styled.div`
    width:90%;
    margin: 20px auto;
    height:60vh;
    padding: 20px 0;
    overflow:hidden;
    ${small({display:"none"})}
`;
const TitleHolder = styled.div``;
const Title = styled.h3`
    font-size: 26px;
    color: var(--gray);
    font-weight:400;
    margin-bottom: 10px;
`;
const ContentHolder = styled.div``;
const MostSeen = () => {
const {videos} = useSelector((state)=>state.videos);
const dispatch = useDispatch();
useEffect(()=>{
    dispatch(getAllVideos());
}, [dispatch]);
const stateVideos = [...videos];
  return (
    <Container>
        <TitleHolder>
            <Title>VIDEOS MEISTGESEHEN</Title>
        </TitleHolder>
        <ContentHolder>
            <VideoSlider state={stateVideos}/>
        </ContentHolder>
    </Container>
  )
}

export default MostSeen