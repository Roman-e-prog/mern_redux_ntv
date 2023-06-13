import axios from "axios";

const API_URL = "http://localhost:5000/api/sliderItem/";

const createSliderItems = async (sliderItemsData, token) =>{
    const config = {
        headers:{
            'Content-type':'application/json',
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.post(API_URL, sliderItemsData, config);
    return response.data;
}
//update
const updateSliderItems = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.sliderItemsData, config);
    return response.data;
}
//delete
const deleteSliderItems = async (sliderItemsId, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
             }
    }
    const response = await axios.delete(API_URL + sliderItemsId, config);
    return response.data;
}
//getOne
const getSliderItems = async (sliderItemId)=>{
   const fetchUrl = `find/${sliderItemId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllSliderItems = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
const sliderItemsService = {
    createSliderItems,
    updateSliderItems,
    deleteSliderItems,
    getSliderItems,
    getAllSliderItems
}
export default sliderItemsService;