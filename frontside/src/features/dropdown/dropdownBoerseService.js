import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownBoerse/"
//create
const createDropdownBoerse = async (dropdownBoerseData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, dropdownBoerseData, config);
    return response.data;
}
//update
const updateDropdownBoerse = async (updateDropdownBoerseData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'multipart/form-data',
        token:`Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + updateDropdownBoerseData.id, updateDropdownBoerseData.formData, config);
    return response.data;
}
//delete
const deleteDropdownBoerse = async (dropdownBoerseId, token)=>{
    const config = {
        headers:{
        token:`Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + dropdownBoerseId, config);
    return response.data;
}
//getOne
const getDropdownBoerse = async (dropdownBoerseId)=>{
   const fetchUrl = `find/${dropdownBoerseId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDropdownBoerse = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownBoerseService = {
    createDropdownBoerse,
    updateDropdownBoerse,
    deleteDropdownBoerse,
    getDropdownBoerse,
    getAllDropdownBoerse,
}
export default dropdownBoerseService;