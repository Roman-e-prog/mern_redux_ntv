import axios from 'axios';

const API_URL = "http://localhost:5000/api/inlineNews/";

const createInlineNews = async (inlineNewsData, token)=>{
    const config = {
        headers:{
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, inlineNewsData, config);
    return response.data;
}

//update
const updateInlineNews = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.inlineNewsData, config);
    return response.data;
}
//delete
const deleteInlineNews = async (inlineNewsId, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.delete(API_URL + inlineNewsId, config);
    return response.data;
}
//getOne
const getInlineNews = async (inlineNewsId)=>{
   const fetchUrl = `find/${inlineNewsId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllInlineNews = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
//increment
const incrementClicked = async (incrementData)=>{
    const response = await axios.post(API_URL + 'increment', incrementData);
    return response.data;
}
const incrementStars = async (evaluateData)=>{
    const response = await axios.post(API_URL + 'evaluate', evaluateData);
    return response.data;
}
const inlineNewsService = {
    createInlineNews,
    updateInlineNews,
    deleteInlineNews,
    getInlineNews,
    getAllInlineNews,
    incrementClicked,
    incrementStars,
}
export default inlineNewsService;