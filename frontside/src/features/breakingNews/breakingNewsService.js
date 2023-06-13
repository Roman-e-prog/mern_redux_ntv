import axios from "axios";

const API_URL = "http://localhost:5000/api/breakingNews/";

const createBreakingNews = async (breakingNewsData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'application/json',
        token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, breakingNewsData, config);
    return response.data;
}
//update
const updateBreakingNews = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.breakingNewsData, config);
    return response.data;
}
//delete
const deleteBreakingNews = async (breakingNewsId, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
            }
    }
    const response = await axios.delete(API_URL + breakingNewsId, config);
    return response.data;
}
//getOne
const getBreakingNews = async (breakingNewsId)=>{
   const fetchUrl = `find/${breakingNewsId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllBreakingNews = async ()=>{
    const fetchAllUrl = "find";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
const breakingNewsService = {
    createBreakingNews,
    updateBreakingNews,
    deleteBreakingNews,
    getBreakingNews,
    getAllBreakingNews,
}
export default breakingNewsService;