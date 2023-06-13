import axios from 'axios';

const API_URL = 'http://localhost:5000/api/newsletterOrder/';

const createNewsletterOrder = async (newsletterData)=>{
    const config ={
        headers:{
            'Content-Type':'application/json',
        }
    }
    const response = await axios.post(API_URL, newsletterData, config);
    return response.data;
}
const getAllNewsletterOrder = async (token)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'find', config);
    return response.data;
}
const deleteNewsletterOrder = async (id,token)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config);
    return response.data;
}
const newsletterService = {
    createNewsletterOrder,
    getAllNewsletterOrder,
    deleteNewsletterOrder,
}
export default newsletterService;