import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getAllMainNews } from '../features/news/newsSlice';
import { getAllInlineNews } from '../features/inlineNews/inlineNewsSlice';
import { useNavigate } from 'react-router-dom';
import { createUserLetter, reset } from '../features/userLetter/userLetterSlice';
import UserLetterThread from '../components/UserLetterThread';
const Container = styled.div`
width:88%;
background:var(--white);
margin:0 auto;
`;
const Wrapper = styled.div`
width:100%;
`;
const TitleHolder = styled.div`
    width:100%;
    padding:10px;
`;
const Title = styled.h1`
    font-size:26px;

`;
const TableWrapper = styled.div`
    width:100%;
`
const Table = styled.table`
    width:90%;
    margin:0 auto;

    & th{
        background:var(--blue);
        color:var(--white);
        font-weight:400;
    }
    & td{
        border:1px solid var(--blue);
        padding:2px;
    }
`;
const CommentWrapper = styled.div`
    width:100%;
`;
const CommentSection = styled.div`
    width:100%;
    padding:10px;
`;
const CommentTheme = styled.div`
    width:100%;
`;
const Theme = styled.h3``;
const UserAnswer = styled.div`
`;
const User = styled.span``;
const AnswerForm = styled.form`
`;
const FormGroup = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;
const Label = styled.label``;
const Textarea = styled.textarea`
    padding:1px;
`;
const Button = styled.button`
    padding:5px;
    margin-top:5px;
    background:var(--blue);
    color:var(--white);
    font-weight:400;
    border:none;
    cursor:pointer;
`;
const LettersListWrapper = styled.div`
    width:100%;
`;

const UserComments = () => {
    const user = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const allMainnews = useSelector((state)=>state.mainnews.allMainNews);
    const allInlineNews = useSelector((state)=>state.inlineNews.allInlineNews);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate("/");
        }
        dispatch(getAllMainNews());
        dispatch(getAllInlineNews());
    },[dispatch, navigate, user])

    const allNews = allMainnews.concat(allInlineNews);
    const [commentTheme, setCommentTheme] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    console.log(userAnswer);
    const handleClick = (title)=>{
        setCommentTheme(title);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const UserLetterData = {
            sendUserId: user._id,
            sendUserName: user.username,
            commentTheme,
            userAnswer,
        }
        dispatch(createUserLetter(UserLetterData))
        return ()=>{
            dispatch(reset())
        }
    }
  return (
    <Container>
      <Wrapper>
        <TitleHolder>
            <Title>Leser Kommentare</Title>
        </TitleHolder>
        <TableWrapper>
            <Table>
                <caption>Unere aktuellen Artikel - Klicken Sie bitte in eine Reihe um den Artikel zu kommentieren</caption>
                <thead>
                    <tr>
                        <th>Ressort</th>
                        <th>Thema</th>
                        <th>Titel</th>
                    </tr>
                </thead>
                <tbody>
                    {allNews.length ? allNews.map((item)=>(
                        <tr key={item._id} onClick={()=>handleClick(item.title)}>
                            <td>{item.ressort}</td>
                            <td>{item.theme}</td>
                            <td>{item.title}</td>
                        </tr>
                    )) : null}
                </tbody>
            </Table>
        </TableWrapper>
        <CommentWrapper>
            <CommentSection>
                <CommentTheme>
                    <Theme>{commentTheme}</Theme>
                </CommentTheme>
                <UserAnswer>
                    <User>Kommentar von: {user.username}</User>
                    <AnswerForm onSubmit={onSubmit}>
                        <FormGroup>
                           <Label htmlFor="userAnswer">Leserbrief</Label> 
                           <Textarea 
                           cols={10} 
                           rows={10}
                           name="userAnswer" 
                           id="userAnswer" 
                           placeholder="Bitte geben Sie Ihren Kommentar hier ein"
                           value={userAnswer} 
                           onChange={(e)=>setUserAnswer(e.target.value)}></Textarea>
                        </FormGroup>
                        <Button>Absenden</Button>
                    </AnswerForm>
                </UserAnswer>
            </CommentSection>
        </CommentWrapper>
        <LettersListWrapper>
          <UserLetterThread/>
        </LettersListWrapper>
      </Wrapper>
    </Container>
  )
}

export default UserComments
