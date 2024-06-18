import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
const port = 8800;

//connecting to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
})

//if any error suthetication error occurs use the following code in your mysql local server
//alter user 'root'@'localhost' identified with mysql_native_password by 'izhai1992';

//this allows you to send any json filefrom the client
app.use(express.json());

//this is to let the axios / react to access the backend api
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello, this is your Express server on port 8800!');
});

//this is to get data from the database and send response to backend server
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("An error occurred while fetching data");
        }
        return res.json(result);       
    })
})

//this post data from client as a request and post it to database
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `author`, `cover`, `price`) VALUES(?)";
    const values = [
        req.body.title, req.body.description, req.body.author, req.body.cover, req.body.price 
    ];
    db.query(q, [values], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
             res.json(err)            
        }

        return res.json('data submitted successfully');       
    })
})




//this post data from client as a request and post it to database
app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE books SET `title` = ?, `description` = ?, `author` = ?, `cover` = ?, `price` = ? WHERE `id` = ? "
    const values = [
        req.body.title, req.body.description, req.body.author, req.body.cover, req.body.price 
    ];
    db.query(q, [...values, id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
             res.json(err)            
        }

        return res.json('data submitted successfully');       
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = 'DELETE FROM books WHERE id=?';    
    db.query(q,[bookId], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);            
        }
        return res.json("book successfully deleted");       
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port} successfully`);
});
