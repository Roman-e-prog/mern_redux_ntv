import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownSport/";

const createDropdownSport = async (dropdownSportData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, dropdownSportData, config);
    return response.data;
}
//update
const updateDropdownSport = async (updateDropdownSportData, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token:`Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + updateDropdownSportData.id, updateDropdownSportData.formData, config);
    return response.data;
}
//delete
const deleteDropdownSport = async (dropdownSportId, token)=>{
    const config = {
        headers:{
        token:`Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + dropdownSportId, config);
    return response.data;
}
//getOne
const getDropdownSport = async (dropdownSportId)=>{
   const fetchUrl = `find/${dropdownSportId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllDropdownSport = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownSportService = {
    createDropdownSport,
    updateDropdownSport,
    deleteDropdownSport,
    getDropdownSport,
    getAllDropdownSport,
}
export default dropdownSportService;