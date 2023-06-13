import axios from "axios";

const API_URL ="http://localhost:5000/api/daylinks/";

//create
const createDayLinks = async (dayLinksData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'multipart/form-data',
        token: `Bearer ${token}` 
        }
    }
    const response = await axios.post(API_URL, dayLinksData, config);
    return response.data;
}
//update
const updateDayLinks = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.dayLinksData, config);
    return response.data;
}
//delete
const deleteDayLinks = async (dayLinksId, token)=>{
    const config = {
         headers:{
        token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + dayLinksId, config);
    return response.data;
}
//getOne
const getDayLinks = async (dayLinksId)=>{
   const fetchUrl = `find/${dayLinksId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDayLinks = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
const dayLinksService = {
    createDayLinks,
    updateDayLinks,
    deleteDayLinks,
    getDayLinks,
    getAllDayLinks,
}

export default dayLinksService;