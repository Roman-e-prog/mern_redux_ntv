import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownAudio/";

//create
const createDropdownAudio = async (dropdownAudioData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, dropdownAudioData, config);
    return response.data;
};
//update
const updateDropdownAudio = async (updateDropdownAudioData, token)=>{
    const config = {
          headers:{
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + updateDropdownAudioData.id, updateDropdownAudioData.formData, config);
    return response.data;
}
//delete
const deleteDropdownAudio = async (dropdownAudioId, token)=>{
    const config = {
          headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + dropdownAudioId, config);
    return response.data;
}
//getOne
const getDropdownAudio = async (dropdownAudioId)=>{
   const fetchUrl = `find/${dropdownAudioId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDropdownAudio = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownAudioService = {
    createDropdownAudio,
    updateDropdownAudio,
    deleteDropdownAudio,
    getDropdownAudio,
    getAllDropdownAudio,
}
export default dropdownAudioService;