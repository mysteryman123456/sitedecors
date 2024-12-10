const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "MacBookAir",
  port: 5432,
});
const SECRET_KEY = process.env.SECRET_KEY;
app.use(cors());
app.use(bodyParser.json());

// signup code
app.post("/signup", async (req, res) => {
    const { username, email , password , role } = req.body;
    if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || !["seller", "buyer"].includes(role)) {
        return res.status(400).json({ message: "Fields can't be empty" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      await pool.query(
        "INSERT INTO users (username, password , email , role) VALUES ($1, $2 , $3  , $4)",
        [username, hashedPassword , email , role]
      );
      res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message : "Error registering user" });
    }
});

// login code
app.post("/login", async (req, res) => {
    const {email , password} = req.body;
    const user = await pool.query("Select * from users where email = $1",[email,])
    if(user.rows.length === 0){
        return res.status(404).json({message : "User doesnot exist"})
    }
    const isValidPassword = await bcrypt.compare(password , user.rows[0].password);
    if(isValidPassword == true){
        return res.status(200).json({message : "Login success"})
    }else{
        return res.status(404).json({message:"Invalid password"})
    }
  });



app.listen(3008, () => {
    console.log('Server is running on http://localhost:3008');
  });
