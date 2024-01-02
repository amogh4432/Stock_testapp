require('dotenv').config()
const axios = require("axios")
const express = require('express')
const app = express()
const stocksSymbol= require("./stockname") 
const cors =require('cors')

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors())
app.use(express.json())
const socketio =require('socket.io')

const server = require('http').Server(app);
const io = socketio(server);


// app.use(express.urlencoded({extended:true}))


app.post('/numberofstocks', async(req, res) => {
  console.log(req.body)
  const numberofstocks=parseInt(req.body.numberofstocks)
  if(numberofstocks >20){
    res.json("Please enter the number less than 20")
  }
  else {
    const result=[]
    for(var i=0; i<numberofstocks;i++){
      const url=`https://api.polygon.io/v1/open-close/${stocksSymbol[i]}/2023-12-29?adjusted=true&apiKey=${process.env.API_KEY}`
      try{  
        const response = await axios({
        method: 'get',
        url:url,
        });
        result.push({
          symbol:response.data.symbol,
          open:response.data.open
        })
      }catch(error){
        console.log(error)
        result.push({
          symbol:stocksSymbol[i],
          errorMessage: error.response.data.message
        })
      }
    }
    res.json(result)
  }
})

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

io.on("connection",(socket) => {
  console.log(`socket ${socket.id} connected`)
  socket.on(`dataChange`,()=> {
    io.emit("hello this is emit")
  })
  socket.on("disconnect", (socket) => {
    console.log(`disconnected ${socket.id}`)

  })
})
