import React from 'react'
import  { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi'
// import { getPost } from './api/PostApi'

const Post = () => {
    const [myData,setMyData]=useState([])
    
     const getPostData=async()=>{
      const res=await getPost();
      // const res=res.json();
      setMyData(res.data);
      
     }
        useEffect(()=>{
          getPostData()
        },[])

    const handleDeleteButton=async(id)=>{
       try{
        const res=await deletePost(id);
       console.log(res);
       if(res.status===200){
        const newUpdatedPost=myData.filter((curPost)=>{
            return curPost.id!==id;
        })
        setMyData(newUpdatedPost)
       }
       }
       catch(error){
        console.log(error);
        
       }
       
    }

  return (
    <>
    

    
       
         <ol>
            {
                myData.map((post)=>{
                    const {id,title,body}=post;
                    return(
                        <li key={id}>
                            <p>{title}</p>
                            <p>{body}</p>
                            <button style={{margin:5}}>Edit</button>
                            <button style={{margin:5}} onClick={()=>handleDeleteButton(id)}>Delete</button>
                        </li>
                    );
                })
            }
         </ol>
         </>
  )
}

export default Post