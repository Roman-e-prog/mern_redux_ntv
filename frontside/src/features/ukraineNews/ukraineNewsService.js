import axios from "axios";

const API_URL = "http://localhost:5000/api/ukraineNews/";

const createUkraineNews = async (ukraineNewsData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'application/json',
        token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ukraineNewsData, config);
    return response.data;
}
//update
const updateUkraineNews = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.ukraineNewsData, config);
    return response.data;
}
//delete
const deleteUkraineNews = async (ukraineNewsId, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
            }
    }
    const response = await axios.delete(API_URL + ukraineNewsId, config);
    return response.data;
}
//getOne
const getUkraineNews = async (ukraineNewsId)=>{
   const fetchUrl = `find/${ukraineNewsId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllUkraineNews = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
const ukraineNewsService = {
    createUkraineNews,
    updateUkraineNews,
    deleteUkraineNews,
    getUkraineNews,
    getAllUkraineNews,
}
export default ukraineNewsService;