import axios from 'axios';

const API_URL = 'http://localhost:5000/api/userComments/';

const createComment = async (userLetterCommentData, token)=>{
    console.log(userLetterCommentData)
    const config ={
        headers:{
            'Content-Type': 'application/json',
            token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL , userLetterCommentData, config);
    return response.data;
}
const deleteUserComment = async (id, token)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
             }
    }
    const response = await axios.delete(API_URL + id, config);
    return response.data;
}
const getAllComments = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
}
const incrementCommentLike = async (commentLikeData)=>{
    const response = await axios.post(API_URL + 'incrementCommentLike', commentLikeData);
    return response.data;
}
const incrementCommentDisLike = async (commentDislikeData)=>{
    const response = await axios.post(API_URL + 'incrementCommentDisLike', commentDislikeData);
    return response.data;
}
const userCommentService ={
    createComment,
    deleteUserComment,
    getAllComments,
    incrementCommentLike,
    incrementCommentDisLike,
}
export default userCommentService;