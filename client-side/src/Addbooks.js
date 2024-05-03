import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Addbooks = () => {

  const [book, setBook] = useState({
    title: '',    
    description: '',
    author: '',
    cover: '',
    price: null
    }
  )

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((previousState)=>({...previousState , [e.target.name]: e.target.value}))
    console.log(book)
  } 

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(book)
  
    try {
      await axios.post('http://localhost:8800/books', book);
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
      <h1>Add Books</h1>
      
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

      <button onClick = {handleSubmit} type="submit"> Sumbit</button>
      
      
   
      
    </div>
  )
};

export default Addbooks