import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {  getAllAdvertise } from "../features/advertises/advertiseSlice";
import { getAllInlineAdvertise } from "../features/advertises/inlineAdvertisesSlice";
import { useEffect } from "react";
import LargeAnounce from "./LargeAnounce";
import SmallAnounce from "./SmallAnounce";
const Container = styled.div`
    width:90%;
    margin: 0 auto;
    display:flex;
`;
const AdvertiseHolder = styled.div`
    flex:1;
`;
const InlineAdvertiseHolder = styled.div`
    flex:1;
`;
const Advertise = () => {
    const {advertises} = useSelector((state)=>state.advertises);
    const {inlineAdvertises} = useSelector((state)=>state.inlineAdvertises)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllAdvertise());
        dispatch(getAllInlineAdvertise());
    }, [dispatch])
   
   return (
    <Container>
        <AdvertiseHolder>
            <LargeAnounce state={advertises}/>
        </AdvertiseHolder>
        <InlineAdvertiseHolder>
            <SmallAnounce state={inlineAdvertises}/>
        </InlineAdvertiseHolder>
    </Container>
  )
}

export default Advertise