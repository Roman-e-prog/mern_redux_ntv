import axios from "axios";

const API_URL = "http://localhost:5000/api/bilderserie/"

const createBilderserie = async (bilderserieData, token)=>{
    const config = {
        headers:{
        'Content-type': 'multipart/form-data',
        token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, bilderserieData, config);
    return response.data;
}
//update
const updateBilderserie = async (updateData, token)=>{
    const config = {
          headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.bilderserieData, config);
    return response.data;
}
//delete
const deleteBilderserie = async (bilderserieId, token)=>{
    const config = {
          headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + bilderserieId, config);
    return response.data;
}
//getOne
const getBilderserie = async (bilderserieId)=>{
   const fetchUrl = `find/${bilderserieId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllBilderserie = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
const bilderserieService = {
    createBilderserie,
    updateBilderserie,
    deleteBilderserie,
    getBilderserie,
    getAllBilderserie,
}
export default bilderserieService