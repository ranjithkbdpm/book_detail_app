import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, Link } from "react-router-dom"
import {useState, useEffect} from 'react';
import axios from 'axios'



const Books = () => {

//state for books to be displayed
const [books, setBooks] = useState([]);

//After intial render this hook brings data from backend 
useEffect(() => {
  const fetchBooks = async() => {   
    try{
      const res = await axios.get('http://localhost:8800/books')
      console.log(res)
      setBooks(res.data)
    } 
    catch(err) {
      console.log(err)
    }
  }

  fetchBooks();
},[])

const handleDelete = async(id) =>{
  try {
    await axios.delete(`http://localhost:8800/books/${id}`)
    alert("Deleted Successfully")
     window.location.reload()
  }
   catch(err) {
       console.log("delete error:", err)
  }
 }

    const navigate = useNavigate();
    

return (
    <>
      <h1 className="container">Books</h1>   
      <button onClick = {()=>{navigate("/Addbooks")}}>Add book</button> 
      <main style={{display:"flex"}}>   
        { (books.length) 
            ?books.map((book) => {
                return(
                    <Card style={{ width: '18rem' }}  key={book.id}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title> {book.title} </Card.Title>
                            <p><i>{book.author}</i></p> 
                            <Card.Text>
                                    {book.description}
                            </Card.Text>                            
                            <Button variant="primary">
                                <Link to ={`/Books/${book.id}`}>Update</Link>
                            </Button>
                            <Button variant="primary" onClick = {() =>{handleDelete(book.id)}}>Delete</Button>
                        </Card.Body>
                    </Card>

                )  
                }) 
            :<p>no books to show</p>             
        }
        </main>   
       
    </>
  )
}

export default Books;


