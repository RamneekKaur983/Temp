const {Client} = require('pg')

const client = new Client({

    host : "localhost" , 
    port : 5432 , 
    user : "ramkaur", 
    password: "password" , 
    database:"InsightsDB"
})
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://ramkaur:password@127.0.0.1:5432/InsightsDB',
    {
        dialect: 'postgres',
        protocol: 'postgres'
    })

    
console.log("ghyv")
client.on("connect" , ()=>
{
    console.log("Database Connected")
})

client.on("end" , ()=>
{
    console.log("Connection End")
})


module.exports=sequelize