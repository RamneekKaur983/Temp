const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize')
const sequelize = require('./database')


let InsightModel =   sequelize.define('Comment', {
  
    
    user_id: Sequelize.INTEGER , 
    commentor_id : Sequelize.INTEGER , 
    document_id: INTEGER , 
    time: Sequelize.DATE 
});

const func =async () =>
{
   // await client.connect();
    
    
    for(var i=0;i<5;i++)
    {
        var x =Math.round(Math.random() * (10- 0) + 0);
        var y =Math.round(Math.random() * (10- 0) + 0);
        var z =Math.round(Math.random() * (10- 0) + 0);
        var a =Math.round(Math.random() * (10- 0) + 0);
        const time = new Date().toISOString();
        console.log("X ", x)
        console.log(time)
        //const result = await client.query(`INSERT INTO public."Comment"( id, user_id, commentor_id, document_id, "time") VALUES (${x}, ${y}, ${z},${a}  ,  '2016-07-15T06:00:00.000Z'); `);
        
        const  result = await InsightModel.sequelize.query(`INSERT INTO public."Comment"( id, user_id, commentor_id, document_id, "time") VALUES (${x}, ${y}, ${z},${a}  ,  '2016-07-15T06:00:00.000Z'); `)
        console.log(result)

    }
        
    
    // const result = await client.query(`SELECT * from "Comment" `);
    // console.log(result.rows);
   // client.end();
};

//func()

module.exports= func