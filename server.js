const express = require("express")

const{
getSpreadSheet,
getSpreadSheetValues,
} = require("./googleSheetsService");



const app = express()

// serves static html css javascript files 
app.use(express.static("public"))
//app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')


/*
method: GET
URL : /all

Description : returns all items in the google spreadsheet
Data-Type: json
*/
app.get("/all", async(req, res) =>{

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

// router for data webpages
const dataRouter = require("./routes/data")
app.use('/data', dataRouter)



app.listen(3000 , (req, res) => console.log("running on 3000"))