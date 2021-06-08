const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors({
    origin: 'http://localhost:3000',
  }),)
server.use(express.json())

const TaskRoutes = require('./routes/TaskRoutes')
server.use('/task', TaskRoutes)

server.listen(3333, () => {
  console.log('listening on port 3333, API ONLINE')
})
