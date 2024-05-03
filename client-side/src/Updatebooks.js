import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

const Updatebooks = () => {
  const [book, setBook] = useState({
    title: '',    
    description: '',
    author: '',
    cover: '',
    price: null
    }
  )

  const navigate = useNavigate();

  const id = useParams();
  console.log(id.id)

  const handleChange = (e) => {
    setBook((previousState)=>({...previousState , [e.target.name]: e.target.value}))
    console.log(book)
  } 

  const handleSubmit = async (id) =>{ 
    try {
      console.log("param:",id)
      await axios.put(`http://localhost:8800/books/${id}`, book);
      if(!(Object.entries(book).length === 0)) {
        navigate("/")
      }
      
    }
    catch (err){
      console.log(err)
    }

  }
  

  return (
    <div className="mb-3">
    <h1>Update Book</h1>
    
    <input 
      type="text" 
      className="form-control" 
      name="title" 
      id="title" 
      aria-describedby="helpId" 
      placeholder="Title" 
      required
      onChange={handleChange}
    />
    
    <input 
        type="text" 
        className="form-control" 
        name="description" 
        id="description" 
        aria-describedby="helpId" 
        placeholder="Description" 
        required
        onChange={handleChange}
    />

    <input 
        type="text" 
        class="form-control" 
        name="author" 
        id="author" 
        aria-describedby="helpId" 
        placeholder="Author" 
        required
        onChange={handleChange}
    />

    <input 
        type="text" 
        className="form-control" 
        name="cover" 
        id="cover" 
        aria-describedby="helpId" 
        placeholder="Cover" 
        required
        onChange={handleChange}
    />

    <input 
        type="text" 
        className="form-control" 
        name="price" 
        id="price" 
        aria-describedby="helpId" 
        placeholder="Price" 
        required
        onChange={handleChange}
    />

    <button onClick = {()=>{handleSubmit(id.id)}} type="submit"> Sumbit</button>
    
    
 
    
  </div>
)
}


export default Updatebooks