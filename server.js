const express = require("express")
const app = express()

// serves static html css javascript files 
app.use(express.static("public"))
//app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')


// 1
/*
method: GET
URL : /all

Description : returns all items in the google spreadsheet
Data-Type: json
*/
app.get("/all", (req, res) =>{
    const isValid = true
    if(isValid){
        res.status(200).send("OK")
    }else{
        res.status(500).send("something went wrong")
    }
})

// router for data webpages
const dataRouter = require("./routes/data")
app.use('/data', dataRouter)



app.listen(3000)