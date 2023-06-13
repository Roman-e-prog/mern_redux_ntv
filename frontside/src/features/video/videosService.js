import axios from "axios";

const API_URL = "http://localhost:5000/api/videos/";
//create
const createVideos = async (videosData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'multipart/form-data',
        token: `Bearer ${token}` 
        }
    }
    const response = await axios.post(API_URL, videosData, config);
    return response.data;
}
//update
const updateVideos = async (updateData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.videodata, config);
    return response.data;
}
//delete
const deleteVideos = async (VideosId, token)=>{
    const config = {
         headers:{
        token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + VideosId, config);
    return response.data;
}
//getOne
const getVideos = async (videosId)=>{
   const fetchUrl = `find/${videosId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllVideos = async ()=>{
    const fetchAllUrl = "find";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
//increment
const incrementClicked = async (incrementData)=>{
    const response = await axios.post(API_URL + 'increment', incrementData);
    return response.data;
}
const videosService = {
    createVideos,
    updateVideos,
    deleteVideos,
    getVideos,
    getAllVideos,
    incrementClicked,
}
export default videosService;