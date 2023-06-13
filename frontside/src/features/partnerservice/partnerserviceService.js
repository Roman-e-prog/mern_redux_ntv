import axios from "axios";

const API_URL = "http://localhost:5000/api/partnerservice/";

const createPartnerservice = async (partnerserviceData, token)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.post(API_URL, partnerserviceData, config);
    return response.data;
}
//update
const updatePartnerservice = async (updateData, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.partnerserviceData, config);
    return response.data;
}
//delete
const deletePartnerservice = async (partnerserviceId, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.delete(API_URL + partnerserviceId, config);
    return response.data;
}
//getOne
const getPartnerservice = async (partnerserviceId)=>{
   const fetchUrl = `find/${partnerserviceId}`
    const response = await axios.get(API_URL + fetchUrl);
    return response.data;
}
//getAll
const getAllPartnerservice = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}

const partnerserviceService ={
    createPartnerservice,
    updatePartnerservice,
    deletePartnerservice,
    getPartnerservice,
    getAllPartnerservice,
}
export default partnerserviceService;