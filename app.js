 const express  = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", function(socket){
    console.log("connected to socket.io");

    socket.emit("socketId", socket.id);

    socket.on("joinRoom", function(room){
        socket.join(room)
        console.log(`${socket.id} joined room ${room}`);
    })

    socket.on("msg", function(data){
        io.to(data.room).emit("recieve-msg",{id: socket.id, text: data.message})
    })
    
})

app.get("/", (req, res) => {
    res.render("index")
});

server.listen(3000); 

