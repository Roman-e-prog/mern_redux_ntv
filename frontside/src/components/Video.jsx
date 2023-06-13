import styled from "styled-components";
import {IoIosArrowForward} from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {getAllVideos, incrementClicked} from "../features/video/videoSlice";
import {Link} from "react-router-dom";
import Newsletter from "./Newsletter";
import {middle} from '../responsive';
const Container = styled.div`
    width:90%;
    height:100%;
    border: 1px solid var(--gray);
    padding:10px;
`;
const TitleHolder = styled.div`
    display:flex;
    align-items:center;
`;
const Title = styled.h3`
    color: var(--gray);
    font-size:26px;
    font-weight:400;
`;
const Item = styled.div`
    width:100%;
    height:300px;
    margin: 10px 0;
    ${middle({margin:"2px 0"})}
    & .link{
        width:100%;
        height:150px;
        cursor: pointer;
    }
`;
const Iframe = styled.iframe`
    width:100%;
    height:150px;
    background: var(--lightblue);
    ${middle({width:"150px", height:"80px"})}
`;
const Ressort = styled.h5`
    color: var(--gray);
`;
const Theme = styled.h4`
    color: var(--red);
    margin: 10px 0;
`;
const ContentTitle = styled.h3`
    font-size:22px;
    font-weight:500;
    color: #000;
    ${middle({fontSize:"16px"})}
`;
const ContentHolder = styled.div`

`;
const Video = () => {
    const {videos} = useSelector((state)=>state.videos);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllVideos());
    },[dispatch])
    const handleCount = (id)=>{
        const incrementData = {
            id:id,
        }
       dispatch(incrementClicked(incrementData));
    }
  return (
    <Container>
        <TitleHolder>
            <Title>VIDEOS</Title>
            <IoIosArrowForward style={{fontSize:"26px", color: "var(--gray)"}}/>
        </TitleHolder>
        <ContentHolder>
            {
                videos.map((video)=>(
                    <Item key={video._id}>
                        <Link to={{pathname:`/videosArticles/${video._id}`}} className="link" onClick={()=>handleCount(video._id)}>
                            <Iframe src={video.src} alt={video.ressort} title={video.ressort}/>
                            <Ressort>{video.ressort} {new Date(video.createdAt).toLocaleTimeString("de-De", {hour:"numeric", minute:"numeric"})}</Ressort>
                            <Theme>{video.theme}</Theme>
                            <ContentTitle>{video.title}</ContentTitle>
                        </Link>
                    </Item>
                ))
            }
        </ContentHolder>
        <Newsletter/>
    </Container>
  )
}

export default Video