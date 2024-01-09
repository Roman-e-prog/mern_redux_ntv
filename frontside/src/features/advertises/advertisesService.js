import axios from "axios";

const API_URL = "http://localhost:5000/api/advertises/";

const createAdvertises = async (advertiseData, token)=>{
    const config = {
        headers:{
        'Content-Type': 'multipart/form-data',
        token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, advertiseData, config);
    return response.data;
}
//update
const updateAdvertise = async (updateData, token)=>{
    const config = {
         headers:{
        token: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.advertisesData, config);
    return response.data;
}
//delete
const deleteAdvertise = async (advertiseId, token)=>{
    const config = {
         headers:{
        token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + advertiseId, config);
    return response.data;
}
//getOne
const getAdvertise = async (advertiseId)=>{
   const fetchUrl = `find/${advertiseId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllAdvertise = async ()=>{
   const fetchAllUrl = "find/"
    const response = await axios.get(API_URL + fetchAllUrl);
    console.log(response.data)
    return response.data;
}
//increment
const incrementClicked = async (incrementData)=>{
    const response = await axios.post(API_URL + 'increment', incrementData);
    return response.data;
}
const advertisesService = {
    createAdvertises,
    updateAdvertise,
    deleteAdvertise,
    getAdvertise,
    getAllAdvertise,
    incrementClicked,
}
export default advertisesService;