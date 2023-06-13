import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownVideos/";

const createDropdownVideos = async (dropdownVideosData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, dropdownVideosData, config);
    return response.data;
}
//update
const updateDropdownVideos = async (dropdownVideosData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + dropdownVideosData.id, dropdownVideosData.formData, config);
    return response.data;
}
//delete
const deleteDropdownVideos = async (dropdownVideosId, token)=>{
    const config = {
        headers:{
        token:`Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + dropdownVideosId, config);
    return response.data;
}
//getOne
const getDropdownVideos = async (dropdownVideosId)=>{
   const fetchUrl = `find/${dropdownVideosId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDropdownVideos = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownVideosService = {
    createDropdownVideos,
    updateDropdownVideos,
    deleteDropdownVideos,
    getDropdownVideos,
    getAllDropdownVideos,
}
export default dropdownVideosService;