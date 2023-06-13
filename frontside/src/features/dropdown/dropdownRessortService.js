import axios from "axios";

const API_URL = "http://localhost:5000/api/dropdownRessort/";

const createDropdownRessort = async (ressortdata, token)=>{
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, ressortdata, config);
    return response.data;
}
//update
const updateDropdownRessort = async (updateDropdownRessortData, token)=>{
    console.log(updateDropdownRessortData);
    const config = {
        headers:{
        'Content-Type': 'multipart/form-data',
        token: `Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + updateDropdownRessortData.id, updateDropdownRessortData.formData, config);
    return response.data;
}
//delete
const deleteDropdownRessort = async (dropdownRessortId, token)=>{
    const config = {
        headers:{
        token: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + dropdownRessortId, config);
    return response.data;
}
//getOne
const getDropdownRessort = async (dropdownRessortId)=>{
   const fetchUrl = `find/${dropdownRessortId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}

const getAllDropdownRessort = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const dropdownRessortService = {
    createDropdownRessort,
    updateDropdownRessort,
    deleteDropdownRessort,
    getDropdownRessort,
    getAllDropdownRessort
}
export default dropdownRessortService;