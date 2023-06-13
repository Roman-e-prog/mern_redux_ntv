import axios from "axios";

const API_URL = "http://localhost:5000/api/inlineAdvertises/";
//create
const createInlineAdvertise = async (inlineAdvertisesData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'multipart/form-data',
        token: `Bearer ${token}` 
        }
    }
    const response = await axios.post(API_URL, inlineAdvertisesData, config);
    return response.data;
}
//update
const updateInlineAdvertise = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.inlineAdvertisesData, config);
    return response.data;
}
//delete
const deleteInlineAdvertise = async (inlineAdvertiseId, token)=>{
    const config = {
         headers:{
        token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + inlineAdvertiseId, config);
    return response.data;
}
//getOne
const getInlineAdvertise = async (inlineAdvertiseId)=>{
    const fetchUrl = `find/${inlineAdvertiseId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllInlineAdvertise = async ()=>{
    const fetchAllUrl = "find/"
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
//increment
const incrementClicked = async (incrementData)=>{
    const response = await axios.post(API_URL + 'increment', incrementData);
    return response.data;
}
const inlineAdvertisesService = {
    createInlineAdvertise,
    updateInlineAdvertise,
    deleteInlineAdvertise,
    getInlineAdvertise,
    getAllInlineAdvertise,
    incrementClicked,
}
export default inlineAdvertisesService;