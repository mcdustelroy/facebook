const express = require("express");
const connectDB = require("./config/db");
const path = require("path");


const app = express();

// connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => {
// 	res.json({ msg: "welcome to the contact keeper api" });
// });



// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/comments", require("./routes/comments"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
