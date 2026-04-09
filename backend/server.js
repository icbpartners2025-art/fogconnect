const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB().then(async () => {
  const User = require("./models/userModel");
  const Role = require("./models/roleModel");

  const userExists = await User.findOne({ email: "symphonytone@gmail.com" });
  if (!userExists) {
    let adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) {
      adminRole = await Role.create({ name: "Admin", permissions: ["all"] });
    }
    let superAdminRole = await Role.findOne({ name: "Super Admin" });
    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: "Super Admin",
        permissions: ["all"],
      });
    }
    let prophetRole = await Role.findOne({ name: "Prophet" });
    if (!prophetRole) {
      prophetRole = await Role.create({
        name: "Prophet",
        permissions: ["add", "edit", "delete"],
      });
    }
    let bishopRole = await Role.findOne({ name: "Bishop" });
    if (!bishopRole) {
      bishopRole = await Role.create({
        name: "Bishop",
        permissions: ["add", "edit", "delete"],
      });
    }
    let archBishopRole = await Role.findOne({ name: "Arch Bishop" });
    if (!archBishopRole) {
      archBishopRole = await Role.create({
        name: "Arch Bishop",
        permissions: ["add", "edit", "delete"],
      });
    }
    let pastorRole = await Role.findOne({ name: "Pastor" });
    if (!pastorRole) {
      pastorRole = await Role.create({
        name: "Pastor",
        permissions: ["add", "edit", "delete"],
      });
    }

    await User.create({
      name: "FogTech",
      email: "symphonytone@gmail.com",
      password: "Shalom7$",
      role: adminRole._id,
    });
    console.log("Default user created");
  }
});

const cors = require("cors");
const app = express();

// CORS configuration - allows requests from frontend with Authorization header
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", "https://frontend-k8yn.onrender.com"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/churches", require("./routes/churchRoutes"));
app.use("/api/zones", require("./routes/zoneRoutes"));
app.use("/api/homegroups", require("./routes/homeGroupRoutes"));
app.use("/api/taskforces", require("./routes/taskforceRoutes"));
app.use("/api/pledges", require("./routes/pledgeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    // This allows both your local dev and your Render frontend
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", "https://frontend-k8yn.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
