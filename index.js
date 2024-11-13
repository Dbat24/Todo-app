import express from "express";
import bodyParser from "body-parser";
import pkg from 'pg';
// import pg from "pg";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000; // Use env var for port in production

const { Client } = pkg;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false, // Enable SSL only in production
});

// Connect to the PostgreSQL database
db.connect()
  .then(() => console.log("Connected to PostgreSQL Database"))
  .catch((err) => console.error("Connection error", err.stack));

// Connection to localhost

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "permalist",
//   password: "Atanda@4eva",
//   port: 5432,
// });
// db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For handling JSON requests
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Route handlers
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    const items = result.rows;

    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log("Error fetching items:", err);
    res.status(500).send("An error occurred while fetching items.");
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.log("Error adding item:", err);
    res.status(500).send("An error occurred while adding the item.");
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log("Error updating item:", err);
    res.status(500).send("An error occurred while updating the item.");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log("Error deleting item:", err);
    res.status(500).send("An error occurred while deleting the item.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// import express from "express";
// import bodyParser from "body-parser";
// // import pg from  'pg';
// import pkg from 'pg';
// import 'dotenv/config';

// const app = express();
// const port = 3000;

// const { Client } = pkg;

// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // This ensures that the connection accepts Render’s SSL
//   },
// });

// db.connect()
//   .then(() => console.log("Connected to Render PostgreSQL Database"))
//   .catch((err) => console.error("Connection error", err.stack));

// // const db = new pg.Client({
// //   user: "postgres",
// //   host: "localhost",
// //   database: "permalist",
// //   password: "Atanda@4eva",
// //   port: 5432,
// // });
// // db.connect();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

// app.get("/", async (req, res) => {
//   try {
//     const result = await db.query("SELECT * FROM items ORDER BY id ASC");
//     items = result.rows;

//     res.render("index.ejs", {
//       listTitle: "Today",
//       listItems: items,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/add", async (req, res) => {
//   const item = req.body.newItem;
//   // items.push({ title: item });
//   try {
//     await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
//     res.redirect("/");
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/edit", async (req, res) => {
//   const item = req.body.updatedItemTitle;
//   const id = req.body.updatedItemId;

//   try {
//     await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
//     res.redirect("/");
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/delete", async (req, res) => {
//   const id = req.body.deleteItemId;
//   try {
//     await db.query("DELETE FROM items WHERE id = $1", [id]);
//     res.redirect("/");
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
