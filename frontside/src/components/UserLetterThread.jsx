import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getAllUserLetter, 
        deleteUserLetter,
        incrementLike, 
        incrementDisLike,
        reset,
 } from '../features/userLetter/userLetterSlice';
 import {createComment, 
        getAllComments, 
        deleteUserComment,
        incrementCommentLike,
        incrementCommentDisLike,
    } from '../features/userLetter/userCommentSlice'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
const Container = styled.div`
    width:100%;
    padding:10px;
`;
const FieldWrapper = styled.div`
    width:90%;
    margin:10px auto;
`;
const CommentingUser = styled.span`
    width:100%;
    display:flex;
    align-items:center;
   
`;
const CommentTheme = styled.span`
    width:100%;
    display:flex;
    align-items:center
`;
const UserLetterContent = styled.div`
    width:100%;
`;
const LikeWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;

    & .icons{
        font-size:26px;
        margin:5px 10px;
    }
`;
const UserComments = styled.div`
    width:100%;
`;
const SingleCommentWrapper = styled.div`
    width:100%;
    margin-bottom:10px;
`;
const SingleComment = styled.p`
    width:100%;
`;
const SingleLikeWrapper = styled.div`
    width:100%;
    display:felx;
    align-items:center;
        & .icons{
        font-size:26px;
        margin: 5px 10px;
    }
`;
const CommentForm = styled.form`
    width:100%;
`;
const CommentGroup = styled.div`
 width:100%;
 display:flex;
 align-items:center;
`;
const CommentCreator = styled.textarea`
    flex:5;
`;
const CommentButton = styled.button`
    flex:1;
    margin-left:5px;
    padding:5px;
    background:var(--blue);
    color:var(--white);
`;
const DeleteButtonWrapper = styled.div`
    width:100%;
`;
const DeleteButton = styled.button`
    flex:1;
    margin-left:5px;
    padding:5px;
    background:var(--red);
    color:var(--white);
`;
const UserLetterThread = () => {
    const user = useSelector((state)=>state.auth.user);
    const loggedInId = user._id;
    const dispatch = useDispatch();
    const allUserLetters = useSelector((state)=>state.userLetter.allUserLetters);
    const allComments = useSelector((state)=>state.userLetterComment.allUserLetterComments);
  
    useEffect(()=>{
        dispatch(getAllUserLetter());
        dispatch(getAllComments());
    },[dispatch])
      
    const [createdComments, setCreatedComments] = useState([]);
    
//likes
const [likeColor, setLikeColor] = useState({});
const [dislikeColor, setDislikeColor] = useState({});
const [likedUserLetter, setLikedUserLetter] = useState([]);
const [disLikedUserLetter, setDisLikedUserLetter] = useState([]);

const handleLike = (userId,id)=>{
    if(userId !== loggedInId && 
        !likedUserLetter.includes(id)){
        const likeData = {
            id:id,
        }
        dispatch(incrementLike(likeData));
        dispatch(getAllUserLetter());
        dispatch(getAllComments());
        setLikeColor((prevColors) => ({ ...prevColors, [id]: "green" }));
    }
    setLikedUserLetter([...likedUserLetter, id])
}
const handleDisLike = (userId,id)=>{
    if(userId !== loggedInId && 
        !disLikedUserLetter.includes(id)){
            const dislikeData = {
                id:id
            }
       dispatch(incrementDisLike(dislikeData));
        dispatch(getAllUserLetter());
        dispatch(getAllComments());
        setDislikeColor((prevColors) => ({ ...prevColors, [id]: "red" }));
    }
    setDisLikedUserLetter([...disLikedUserLetter, id])
}
const handleComment = (index, value)=>{
    const newCreatedComments = [...createdComments];
    newCreatedComments[index] = value;
    setCreatedComments(newCreatedComments);
}
const handleCommentLike = (commentSenderId, id)=>{
    if(commentSenderId !== loggedInId && 
        !likedUserLetter.includes(id)){
            const commentLikeData = {
                id:id
            }
        dispatch(incrementCommentLike(commentLikeData));
        dispatch(getAllUserLetter());
        dispatch(getAllComments());
        setLikeColor((prevColors) => ({ ...prevColors, [id]: "green" }));
    }
    setLikedUserLetter([...likedUserLetter, id])
}
const handleCommentDisLike = (commentSenderId,id)=>{
    if(commentSenderId !== loggedInId && 
        !disLikedUserLetter.includes(id)){
            const commentDislikeData = {
                id:id
            }
        dispatch(incrementCommentDisLike(commentDislikeData));
        dispatch(getAllUserLetter());
        dispatch(getAllComments());
        setDislikeColor((prevColors) => ({ ...prevColors, [id]: "red" }));
    }
    setDisLikedUserLetter([...disLikedUserLetter, id])
}
const handleDelete = (id)=>{
    dispatch(deleteUserLetter(id));
    dispatch(getAllUserLetter());
    dispatch(getAllComments());
}
const handleCommentDelete = (id)=>{
    dispatch(deleteUserComment(id));
    dispatch(getAllUserLetter());
    dispatch(getAllComments());
}
  return (
    <Container>
      {allUserLetters.length && allUserLetters.map((item, index)=>{
           const filteredComments = allComments.filter(comment => comment.userLetterId === item._id);
            const onSubmit = (e)=>{
                e.preventDefault();
                const userLetterCommentData = {
                    comment:createdComments[index],
                    commentSenderId:loggedInId,
                    commentSenderName:user.username,
                    userLetterId: item._id
                }
                dispatch(createComment(userLetterCommentData))
                dispatch(getAllUserLetter())
                dispatch(getAllComments());
                dispatch(reset())
            }
            return (
        <FieldWrapper key={item._id}>
            <CommentingUser>{item.sendUserName}</CommentingUser>
            <CommentTheme>{item.commentTheme}</CommentTheme>
            <UserLetterContent>{item.userAnswer}</UserLetterContent>
            <DeleteButtonWrapper>
                {user.isAdmin && <DeleteButton onClick={()=>handleDelete(item._id)}>Beitrag Löschen</DeleteButton>}
            </DeleteButtonWrapper>
            <LikeWrapper>
                <span>{item.likes > 0 && item.likes}</span><AiFillLike onClick={()=>handleLike(item.sendUserId, item._id)}  className="icons" style={{ color: likeColor[item._id]}}/>
                <span>{item.disLikes > 0 && item.disLikes}</span><AiFillDislike onClick={()=>handleDisLike(item.sendUserId, item._id)} className="icons" style={{color: dislikeColor[item._id]}}/>
                </LikeWrapper>
                <UserComments>
                    <SingleCommentWrapper>
                        {filteredComments.length ? filteredComments.map((item)=>(
                            <React.Fragment key={item._id}>
                                <CommentingUser>{item.commentSenderName}</CommentingUser>
                                <SingleComment>{item.comment}</SingleComment>
                                <SingleLikeWrapper>
                                    <span>{item.likes > 0 && item.likes}</span><AiFillLike onClick={()=>handleCommentLike(item.commentSenderId, item._id)} className="icons" style={{color: likeColor[item._id]}}/>
                                    <span>{item.disLikes > 0 && item.disLikes}</span><AiFillDislike onClick={()=>handleCommentDisLike(item.commentSenderId, item._id)} className="icons" style={{color: dislikeColor[item._id]}}/>
                                </SingleLikeWrapper>
                                <DeleteButtonWrapper>
                                    {user.isAdmin && <DeleteButton onClick={()=>handleCommentDelete(item._id)}>Beitrag Löschen</DeleteButton>}
                                </DeleteButtonWrapper>
                            </React.Fragment>
                        )): null}
                    <CommentForm onSubmit={onSubmit}>
                        <CommentGroup>
                            <CommentCreator
                                cols={5}
                                rows={5}
                                name="createdComment"
                                id="createdComment"
                                placeholder='Scheiben Sie etwas dazu'
                                value={createdComments[index] || ""}
                                onChange={(e)=>handleComment(index, e.target.value)}
                            ></CommentCreator>
                            <CommentButton>Absenden</CommentButton>
                        </CommentGroup>
                    </CommentForm>
                </SingleCommentWrapper>
            </UserComments>
        </FieldWrapper>
        )
    })}
    </Container>
  )
}

export default UserLetterThread
