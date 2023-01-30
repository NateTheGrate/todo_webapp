const express = require("express")
// google spreadsheet api wrapper in ./googleSheetsService.js
const{getSpreadSheetValues} = require("./googleSheetsService");

const app = express()

// serves static index page
app.use(express.static("public"))
// lets us get json data from users on page
app.use(express.json())

// using ejs
app.set('view engine', 'ejs')


/*
method: GET
URL : /all

Description : returns all items in the google spreadsheet
Data-Type: json
*/
app.get("/all", async(req, res) =>{

    // make sure server doesn't crash.
    // if successful, send 200 code out
    // otherwise, send 500 code and and log error in console
    try{
        getRows = await getSpreadSheetValues()
        console.log("GET success")
        res.status(200).render( "all", {data : JSON.stringify(getRows.data)})
    }catch(err){
        console.log("POST ERROR : likely sheetname wrong")
        console.log(err)
        res.status(500).send(err)
    }
})

// router for data webpages in ./routes
const dataRouter = require("./routes/data")
app.use('/data', dataRouter)


// turn server on
app.listen(3000 , (req, res) => console.log("running on 3000"))