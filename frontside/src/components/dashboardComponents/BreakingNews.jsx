import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createBreakingNews, deleteBreakingNews, getAllBreakingNews } from '../../features/breakingNews/breakingNewsSlice';
import { Link } from 'react-router-dom';
import {small} from '../../responsive';
import { useId } from 'react';
const Container = styled.div`
    width:100%;
`;
const CrudTitleHolder = styled.div`
  width:100%;
  height:60px;
  display:flex;
  align-items:center;
  background: var(--blue);
`;
const CrudTitle = styled.div`
  color:var(--white);
  font-size: 24px;
  margin-left:20px;
`;
const CrudForm = styled.form`
    width:100;
`;
const ContentHolder = styled.div`
  width:50%;
`;
const DataHolder =styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    margin: 0 10px;
    padding:5px;
    ${small({width:"100%"})}

    & p{
      font-weight:20px;
      color: var(--gray);
      font-weight:500;
    }
`;
const InputHolder =styled.div`
    width:80%;
    display:flex;
    flex-direction:column;
    margin: 0 10px;
    padding:5px;
`;
const CrudLabel = styled.label`
    color: var(--gray);
    font-weight:500;
    margin: 5px 0;
`;
const CrudInput = styled.input`
    padding:2px;
    width:90%;
    margin: 2px 0;
`;
const DataButtonHolder = styled.div`
  width:100%;
  display:flex;
  padding:10px;
`;
const DataSendButton = styled.button`
  padding:10px;
  margin:0 10px;
  background: var(--red);
  color: var(--white);
  border:none;
  cursor: pointer;
`;
const DataUpdateButton = styled.div`
  padding:10px;
  margin:0 10px;
  background: green;
  color: var(--white);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;
`;
const DataDeleteButton = styled.button`
  padding:10px;
  margin:0 10px;
  background: var(--gray);
  color: var(--white);
  border:none;
  cursor: pointer;
`;

const BreakingNews = () => {
    const dispatch = useDispatch();
    const allBreakingNews = useSelector((state)=>state.breakingNews.allBreakingNews);
    const uniqueId = useId();
    const [formdata, setFormdata] = useState({
        content:"",
    })
    useEffect(()=>{
        dispatch(getAllBreakingNews());
    },[dispatch])
    const {content} = formdata;
    const [formError, setFormError] = useState("");

    const handleChange = (e)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const breakingNewsData = {
            content,
        }
        if(content === ""){
            setFormError("Sie müssen den Inhalt der BreakingNews eingeben");
        }
        else{
            dispatch(createBreakingNews(breakingNewsData))
            dispatch(getAllBreakingNews());
        }
    }
    const handleDelete = async (id)=>{
      await dispatch(deleteBreakingNews(id));
      dispatch(getAllBreakingNews());
    }
  return (
    <Container>
      <CrudTitleHolder>
        <CrudTitle>Breaking News</CrudTitle>
      </CrudTitleHolder>
      <ContentHolder>
            {allBreakingNews.length > 0 && <DataHolder>
                {allBreakingNews.map((item)=>(
                  <div key={item._id}>
                    <span>{new Date(item.createdAt).toLocaleString("de-De")}</span>
                    <p>{item.content}</p>
                    <DataButtonHolder>
                      <DataUpdateButton><Link to={`/breakingNewsEdit/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}}>Update</Link></DataUpdateButton>
                      <DataDeleteButton onClick={()=>handleDelete(item._id)}>Löschen</DataDeleteButton>
                  </DataButtonHolder>
                  </div>
                ))}
              </DataHolder> }
            </ContentHolder>
            <CrudForm onSubmit={onSubmit}>
              <InputHolder>
                  <CrudLabel htmlFor={`${uniqueId} content`}>Breaking News</CrudLabel>
                  <CrudInput type="text" name="content" id={`${uniqueId} content`} value={content} onChange={(e)=>handleChange(e)}/>
                  <div className='error'>{formError && <p>{formError}</p>}</div>
                </InputHolder>
                <DataButtonHolder>
                    <DataSendButton type="submit">Absenden</DataSendButton>
                </DataButtonHolder>
            </CrudForm>
    </Container>
  )
}

export default BreakingNews
