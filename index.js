const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.broadcast.emit('apa hi hi')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000')
})