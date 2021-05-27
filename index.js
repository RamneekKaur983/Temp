const express = require('express')
const app = express()
const port = 3000;

const App = require('./app')

const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://ramkaur:password@127.0.0.1:5432/InsightsDB',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        define: {

            freezeTableName: true
        }
    })
let Comment = sequelize.define('comment', {


    time: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    commentor_id: Sequelize.INTEGER,
    comment_id: Sequelize.INTEGER,
    document_id: Sequelize.INTEGER


});
let View = sequelize.define('view', {

    time: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    document_id: Sequelize.INTEGER,
    view_type: Sequelize.TEXT

})

let Share = sequelize.define('share',
    {

        time: Sequelize.DATE,
        sharer_id: Sequelize.INTEGER,
        sharee_id: Sequelize.INTEGER,
        document_id: Sequelize.INTEGER
    })

let Document = sequelize.define('document',
    {

        user_id: Sequelize.INTEGER,
        number_of_shares: Sequelize.INTEGER,
        number_of_views: Sequelize.INTEGER,
        number_of_comments: Sequelize.INTEGER
    })

app.use(express.json());
app.get('/insert', (req, res) => {
    console.log("I am inside GET API")
    App();

    res.send('Hello WORLD')
})
app.get('/' , (req, res)=>
{
    console.log("Home Route")
})

// Writing the POST APIs for the proxy server

app.post('/', async (req, res) => {
    if (req.body.Action == "Comment") {
        res.send("Comment")
        var date = new Date()

        var id = req.body.id;
        var user_id = req.body.user_id

        var comment_id = req.body.comment_id
        var document_id = req.body.document_id
        var time = date.getDate.toString




        const result = await Comment.sequelize.query(`INSERT INTO public."comment" (id, time , user_id ,  comment_id , document_id) VALUES (${id} ,'2016-07-15T06:00:00.000Z' , ${user_id} ,  ${comment_id} , ${document_id})`)
        const result4 = await Document.sequelize.query(`SELECT number_of_comments FROM "document" WHERE document_id=${req.body.document_id} ;`);

        if (result4[1].rowCount == 0) {
            console.log("ROw COunt Zero")
            const result3 = await Document.sequelize.query(`INSERT INTO public."document"(document_id  , number_of_comments) VALUES(${document_id} , 1);`)
        }
        else {
            console.log("Row COunt Not ero")
            const result2 = await Document.sequelize.query(`UPDATE public."document" SET number_of_comments=${result4[0][0].number_of_comments + 1} WHERE document_id=${document_id}`)
        }
        console.log(result4[0][0].number_of_comments)
        console.log("Result 4", result4)
    }
    if (req.body.Action == "Share") {
        res.send("Share")
        var id = req.body.id
        var sharer_id = req.body.sharer_id
        var sharee_id = req.body.sharee_id
        console.log("Sharee Id", sharee_id)
        var document_id = req.body.document_id
        const result4 = await Document.sequelize.query(`SELECT number_of_shares FROM "document" WHERE document_id=${req.body.document_id} ;`);

        if (result4[1].rowCount == 0) {
            console.log("ROw COunt Zero")
            const result3 = await Document.sequelize.query(`INSERT INTO public."document"(document_id  , number_of_shares) VALUES(${document_id} , 1);`)
        }
        else {
            console.log("Row COunt Not ero")
            const result2 = await Document.sequelize.query(`UPDATE public."document" SET number_of_shares=${result4[0][0].number_of_shares + 1} WHERE document_id=${document_id}`)
        }
        const result = await Share.sequelize.query(`INSERT INTO public."share" (id , time ,sharer_id ,sharee_id , document_id) VALUES(${id} , '2016-07-15T06:00:00.000Z' , ${sharer_id} , ${sharee_id} , ${document_id}) `)
    }
    if (req.body.Action == "View") {
        res.send("View")
        var id = req.body.id
        var user_id = req.body.user_id
        var document_id = req.body.document_id
        var view_type = req.body.view_type

        const result4 = await Document.sequelize.query(`SELECT number_of_views FROM "document" WHERE document_id=${req.body.document_id} ;`);
        if (result4[1].rowCount == 0) {
            console.log("ROw COunt Zero")
            const result3 = await Document.sequelize.query(`INSERT INTO public."document"(document_id  , number_of_views) VALUES(${document_id} , 1);`)
        }
        else {
            console.log("Row COunt Not ero")
            const result2 = await Document.sequelize.query(`UPDATE public."document" SET number_of_views=${result4[0][0].number_of_views + 1} WHERE document_id=${document_id}`)
        }
        //  const result = await View.create({time :'2016-07-15T06:00:00.000Z'} , {user_id:1} , {document_id:1} , {view_type:'gvd'})
        const result = await View.sequelize.query(` INSERT INTO public."view"(id, time , user_id , document_id , view_type) VALUES(${id} ,'2016-07-15T06:00:00.000Z' , ${user_id} , ${document_id} , ${view_type})`)
    }
    console.log('Post request is running    ', req.body)
    // res.send('Done')

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))