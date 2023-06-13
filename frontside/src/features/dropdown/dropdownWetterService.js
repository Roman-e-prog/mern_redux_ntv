import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownWetter/";

const createDropdownWetter = async (dropdownWetterData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, dropdownWetterData, config);
    return response.data;
};
//update
const updateDropdownWetter = async (updateDropdownWetterData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + updateDropdownWetterData.id,updateDropdownWetterData.formData, config);
    return response.data;
}
//delete
const deleteDropdownWetter = async (dropdownWetterId, token)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + dropdownWetterId, config);
    return response.data;
}
//getOne
const getDropdownWetter = async (dropdownWetterId)=>{
   const fetchUrl = `find/${dropdownWetterId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDropdownWetter = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownWetterService = {
    createDropdownWetter,
    updateDropdownWetter,
    deleteDropdownWetter,
    getDropdownWetter,
    getAllDropdownWetter,
};
export default dropdownWetterService;