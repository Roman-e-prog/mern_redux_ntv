import axios from "axios";

const API_URL = "http://localhost:5000/api/boersenwerte/";

const createBoersenwerte = async (boersenwerteData, token)=>{
    const config ={
        headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, boersenwerteData, config);
    return response.data;
}
//update
const updateBoersenwerte = async (boersenwerteId,  boersenwerteData, token)=>{
    const config = {
          headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL + boersenwerteId,  boersenwerteData, config);
    return response.data;
}
//delete
const deleteBoersenwerte = async (boersenwerteId, token)=>{
    const config = {
          headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + boersenwerteId, config);
    return response.data;
}
//getOne
const getBoersenwerte = async (boersenwerteId)=>{
   const fetchUrl = `find/${boersenwerteId}`;
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllBoersenwerte = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}

const boersenwerteService = {
    createBoersenwerte,
    updateBoersenwerte,
    deleteBoersenwerte,
    getBoersenwerte,
    getAllBoersenwerte,
}
export default boersenwerteService;