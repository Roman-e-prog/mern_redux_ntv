import axios from 'axios';
import '../axios-interceptors';
const API_URL = "http://localhost:5000/api/mainNews/";

const createMainNews = async (mainnewsData, token)=>{
    const config = {
        headers: {
            'Content-Type' : 'multipart/form-data',
             token: `Bearer ${token}`,
          },
    }
    const response = await axios.post(API_URL, mainnewsData, config);
    return response.data;
}

//update
const updateMainNews = async (updateData, token)=>{
    const config = {
        headers:{
            // 'Content-Type':'multipart/form-data',
            token: `Bearer ${token}`}
    }
    const response = await axios.put(API_URL + updateData.id, updateData.mainnewsData, config);
    return response.data;
}
//delete
const deleteMainNews = async (mainNewsId, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.delete(API_URL + mainNewsId, config);
    return response.data;
}
//getOne
const getMainNews = async (mainNewsId)=>{
   const fetchUrl = `find/${mainNewsId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllMainNews = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
//increment
const incrementClicked = async (incrementData)=>{
    try{
    const response = await axios.post(API_URL + 'increment', incrementData);
    return response.data;
    } catch(error){
        throw new Error(error)
    }
}
const incrementStars = async (evaluateData)=>{
    const response = await axios.post(API_URL + 'evaluate', evaluateData);
    return response.data;
}
const mainnewsService = {
    createMainNews,
    updateMainNews,
    deleteMainNews,
    getMainNews,
    getAllMainNews,
    incrementClicked,
    incrementStars,
}
export default mainnewsService;