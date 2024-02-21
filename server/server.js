const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log("Um usuário se conectou: ", socket.id)

    socket.on('chat message', (message) => {
        io.emit('chat message', message)
        console.log(message)
    })

    socket.on('disconnect', () => {
        console.log('Um usuário desconectou: ', socket.id)
    })
})

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})