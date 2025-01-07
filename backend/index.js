const express = require("express");
const app = express();

// for verification in /add-website code
const https = require('https');
const cheerio = require('cheerio');

// cors and env file 
require("dotenv").config();
const cors = require('cors');

// database 
const pool = require('./db');

//additional import for jwt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// login code
const SECRET_KEY = process.env.SECRET_KEY // for jwt;

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User does not exist" });
      }
      const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
      if (isValidPassword) {
        const token = jwt.sign(
          { email: user.rows[0].email, role: user.rows[0].role },SECRET_KEY,
          { expiresIn: "30d" }
        );
        return res.status(200).json({ message: "Login success", token });
      } else {
        return res.status(404).json({ message: "Invalid password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging in" });
    }
  });

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




// Unique id for adding website
const crypto = require("crypto");
function UUID() {
  const uuid = crypto.randomUUID(); 
  const alphanumericPart = uuid.replace(/-/g, ""); 
  return alphanumericPart.slice(0, 20); 
}
const web_id = UUID();

// cloudinary imports 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpeg', 'png', 'jpg', 'webp'], 
  },
});
const upload = multer({ storage }).array('images[]', 3); 

// add-website code
app.post("/add-website", upload, async (req, res) => {
  try {
    const {
      category,
      title,
      subcategory,
      price,
      negotiable,
      undisclosed,
      description,
      technical_description,
      assets,
      website_url,
      video_url,
      co_founder,
      funds,
      seller_email,
    } = req.body;

    let verified = false;

      const fetchWebsite = (url) =>
        new Promise((resolve, reject) => {
          https.get(url, (response) => {
            let html = '';
            response.on('data', (chunk) => {
              html += chunk;
            });
            response.on('end', () => {
              try {
                const $ = cheerio.load(html);
                const isVerified = $("small")
                  .filter((_, element) => $(element).text().trim() === "SiteDecors-Verified-Listing")
                  .length > 0;
                resolve(isVerified);
              } catch (error) {
                reject(error);
              }
            });
          }).on('error', (error) => {
            reject(error);
          });
        });

    try {
      verified = await fetchWebsite(website_url);
    if(verified === false){
      return res.json({message : "Lisiting verification failed"})
    }
    } catch (error) {
      console.error(error.message);
      return res.json({message : "Lisiting verification failed"})
    }


    const isValidSeller = await pool.query("SELECT role from users where email = $1", [seller_email]);
    if (isValidSeller.rows.length === 1 && isValidSeller.rows[0].role === "seller") {
      
      const insertWebsite_detailsData = await pool.query(
        "INSERT INTO website_details (web_id, category, subcategory, price, negotiable, undisclosed, video_url, verified, views, seller_email, co_founder, funds) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [web_id, category, subcategory, price, negotiable, undisclosed, video_url, verified, 0, seller_email, co_founder, funds]
      );
      const insertDescriptive_detailsData = await pool.query(
        "INSERT INTO descriptive_details (web_id, title , description , buyer_essentials, assets , website_url) VALUES ($1, $2, $3, $4, $5, $6)",[web_id, title , description , technical_description, JSON.stringify(assets) , website_url]
      );

      const files = req.files || [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadResult = await cloudinary.uploader.upload(file.path); 
        const imageUrl = uploadResult.secure_url;
        const publicId = uploadResult.public_id;
        await pool.query(
          "INSERT INTO website_image (web_id, image_url, public_id) VALUES ($1, $2, $3)",
          [web_id, imageUrl, publicId]
        );
      }

      if (insertWebsite_detailsData.rowCount === 1 && insertDescriptive_detailsData.rowCount === 1) {
        return res.status(201).json({ message: "Listing added successfully" });
      } else {
        return res.status(401).json({ message: "Please try again later" });
      }
    }

    return res.status(400).json({ message: "Unauthorized !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// home page data
app.post("/", async (req, res) => {
  const {
    category,
    subcategory,
    co_founder,
    date,
    five_star_and_up,
    four_star_and_up,
    funds,
    max_price,
    min_price,
    most_viewed,
    negotiable,
    price,
    rating,
    three_star_and_up,
    two_star_and_up,
    undisclosed,
    verified,
    video
  } = req.body;

  let conditions = [];
  let values = [];
  let index = 1;
  let orderBy = [];
  let query = `
    SELECT 
      website_details.web_id, 
      website_details.price,
      website_details.category, 
      website_details.subcategory, 
      website_details.views, 
      website_details.entry_time,
      website_details.verified,
      website_details.undisclosed,
      website_details.negotiable, 
      descriptive_details.title, 
      users.username,
      LEFT(descriptive_details.description, 150) AS description, 
      descriptive_details.website_url,
      (
        SELECT image_url 
        FROM website_image 
        WHERE website_image.web_id = website_details.web_id 
        LIMIT 1
      ) AS image_url
    FROM website_details
    INNER JOIN descriptive_details 
      ON descriptive_details.web_id = website_details.web_id
    INNER JOIN users 
      ON users.email = website_details.seller_email
    `;

  // Add conditions
  if (co_founder) {
    conditions.push(`website_details.co_founder = $${index++}`);
    values.push(co_founder);
  }

  if (undisclosed) {
    conditions.push(`website_details.undisclosed = $${index++}`);
    values.push(undisclosed);
  }

  if (verified) {
    conditions.push(`website_details.verified = $${index++}`);
    values.push(verified);
  }

  if (negotiable) {
    conditions.push(`website_details.negotiable = $${index++}`);
    values.push(negotiable);
  }

  if (funds) {
    conditions.push(`website_details.funds = $${index++}`);
    values.push(funds);
  }

  if (category != undefined) {
    conditions.push(`website_details.category = $${index++}`);
    values.push(category);
  }

  if (subcategory != undefined) {
    conditions.push(`website_details.subcategory = $${index++}`);
    values.push(subcategory);
  }

  if (video) {
    conditions.push(`website_details.video_url IS NOT NULL`);
  }

  if (max_price) {
    conditions.push(`website_details.price <= $${index++}`);
    values.push(parseInt(max_price));
  }

  if (min_price) {
    conditions.push(`website_details.price >= $${index++}`);
    values.push(parseInt(min_price));
  }

  // Add WHERE conditions
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Handle ORDER BY conditions
  if (price === "l_h") {
    orderBy.push("website_details.price ASC");
  }

  if (price === "h_l") {
    orderBy.push("website_details.price DESC");
  }

  if (date === "recent") {
    orderBy.push("website_details.entry_time DESC");
  }

  if (date === "oldest") {
    orderBy.push("website_details.entry_time ASC");
  }

  if (most_viewed) {
    orderBy.push("website_details.views DESC");
  }


  if (orderBy.length > 0) {
    query += ` ORDER BY ${orderBy.join(", ")}`;
  }

  if (most_viewed) {
    query += " LIMIT 1";
  }

  try {
    const data = await pool.query(query, values);

    if (data.rowCount > 0) {
      res.status(200).json({ message: data.rows });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/fetch-product-page', async (req, res) => {
  const { web_id } = req.query;
  try {
    const product_sql = `
    SELECT 
    wd.video_url,
    wd.price,
    wd.category,
    wd.subcategory,
    wd.negotiable,
    wd.co_founder,
    wd.seller_email,
    wd.views,
    wd.funds,
    wd.undisclosed,
    wd.verified,
    dd.description,
    dd.assets,
    dd.buyer_essentials,
    dd.website_url,
    dd.title,
    Array(
      SELECT image_url as images
      FROM website_image 
      WHERE website_image.web_id = wd.web_id 
    ) AS image_url,
    u.username as seller_name,
    u.user_image as seller_image,
    u.created_at as joined_date
  FROM website_details wd
  INNER JOIN descriptive_details dd
    ON wd.web_id = dd.web_id
  INNER JOIN users u
    ON u.email = wd.seller_email
  WHERE wd.web_id = $1
    `;

    const productData = await pool.query(product_sql, [web_id]);

    if (productData.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({message : productData.rows});
  } catch (err) {
    console.error('Error fetching product data:', err);
    return res.status(500).json({ message: 'Failed to fetch product data' });
  }
});

app.post("/fetch-edit-listing",async (req , res)=>{
    const {sellerEmail} = req.body;
    try{
    const listings = await pool.query(`
    SELECT 
    website_details.web_id ,
    website_details.price,
    website_details.category,
    website_details.subcategory,
    website_details.negotiable,
    website_details.co_founder,
    website_details.funds,
    website_details.undisclosed,
    descriptive_details.description,
    descriptive_details.website_url,
    descriptive_details.title,
    (
      SELECT image_url 
      FROM website_image 
      WHERE website_image.web_id = website_details.web_id 
      LIMIT 1
    ) AS image_url
    FROM website_details
    INNER JOIN descriptive_details
    on website_details.web_id = descriptive_details.web_id
    WHERE website_details.seller_email = $1
    ORDER BY website_details.id DESC;
    `,[sellerEmail])

  if(listings.rowCount > 0){
    return res.status(200).json({message : listings.rows})
  }else{
    return res.status(404).json({message : "No lisitngs to show"})
  }
}catch(err){
  return res.status(500).json({message:"Internal server error"})
}
})

app.put("/update-listing", async (req, res) => {
  const data = req.body;
  try {
    const web_result = await pool.query(
      `
      UPDATE website_details
      SET funds = $1,
          undisclosed = $2,
          co_founder = $3,
          negotiable = $4,
          price = $5,
          category = $6,
          subcategory = $7
      WHERE web_id = $8 AND seller_email = $9
      `,
      [data.funds, data.undisclosed, data.co_founder, data.negotiable, data.price, data.category, data.subcategory, data.web_id, data.seller_email]
    );

    const des_result = await pool.query(
      `
      UPDATE descriptive_details
      SET 
          description = $1,
          title = $2,
          website_url = $3
      WHERE web_id = $4
      `,
      [data.description, data.title, data.website_url, data.web_id]
    );

    if (web_result.rowCount > 0 && des_result.rowCount > 0) {
      return res.status(200).json({ message: "Updated Successfully" });
    } else {
      return res.status(404).json({ message: "No records found" });
    }
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({ message: "Please try again later" });
  }
});

app.listen(3008);