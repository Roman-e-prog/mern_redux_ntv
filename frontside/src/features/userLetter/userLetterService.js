import axios from 'axios';
const API_URL = "http://localhost:5000/api/userLetters/"

const createUserLetter = async (userLetterData, token)=>{
    const config = {
        headers:{
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, userLetterData, config);
    return response.data;
}

//delete
const deleteUserLetter = async (id, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.delete(API_URL + id, config);
    return response.data;
}
//getAll
const getAllUserLetter = async ()=>{
    const fetchAllUrl = "find/";
    const response = await axios.get(API_URL + fetchAllUrl);
    return response.data;
}
//increment
const incrementLike = async (likeData)=>{
    const response = await axios.post(API_URL + 'incrementLike', likeData);
    return response.data;
}
const incrementDisLike = async (dislikeData)=>{
    const response = await axios.post(API_URL + 'incrementDisLike', dislikeData);
    return response.data;
}

const userLetterService = {
    createUserLetter,
    deleteUserLetter,
    getAllUserLetter,
    incrementLike,
    incrementDisLike,
}
export default userLetterService;

