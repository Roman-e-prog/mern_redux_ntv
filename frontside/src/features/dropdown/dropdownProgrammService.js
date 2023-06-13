import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownProgramm/";

const createDropdownProgramm = async (dropdownProgrammData, token)=>{
    const config = {
        headers:{
            'Content_type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, dropdownProgrammData, config);
    return response.data;
}
//update
const updateDropdownProgramm = async (updateDropdownProgrammData, token)=>{
    const config = {
        headers:{
            'Content-type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + updateDropdownProgrammData.id, updateDropdownProgrammData.formData, config);
    return response.data;
}
//delete
const deleteDropdownProgramm = async (dropdownProgrammId, token)=>{
    const config = {
        headers:{
        token:`Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + dropdownProgrammId, config);
    return response.data;
}
//getOne
const getDropdownProgramm = async (dropdownProgrammId)=>{
   const fetchUrl = `find/${dropdownProgrammId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDropdownProgramm = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownProgrammService = {
    createDropdownProgramm,
    updateDropdownProgramm,
    deleteDropdownProgramm,
    getDropdownProgramm,
    getAllDropdownProgramm
}
export default dropdownProgrammService;