const express = require("express")
const{
editRows,
writeRows,
deleteRows
} = require("../googleSheetsService");
const router = express.Router()


router
    .route("/")
    .get((req,res) => {
        res.render("data/data", {key:"insert_key", value:"insert_value"})
    })

    /*
    method: POST
    URL : /data
    Body: {
    "key": "value"
    }

    Description : store a key-value pair in the google spreadsheet
    - you may assume that there will only be one key-value pair
    - if key already exists, you may overwrite old value
    Data-Type: json
    */
    .post(async(req,res)=>{

        dataArr = [[req.body.key, req.body.value]]
        try{
            await writeRows(dataArr)
            console.log("POST success: wrote " + dataArr + " to spreadsheet")
            res.status(200).send("OK")
        }catch(err){
            console.log("POST ERROR : likely sheetname wrong")
            console.log(err)
            res.status(500).send(err)
        }
        
    })

router
    .route("/:key")
    .post(async(req,res)=>{

        try{
            await editRows(req.body.key, "DONE")
            console.log("POST success: changed " + req.body.key + " in spreadsheet")
            res.status(200).send("OK")
        }catch(err){
            console.log("POST ERROR : likely sheetname is wrong or the key doesn't exist")
            console.log(err)
            res.status(500).send(err)
        }

    })
    /*
        method: DELETE
        URL : /data/:key
        Description : delete the key-value pair
        Data-Type: json
    
    */
    .delete(async(req,res)=>{
        try{
            await deleteRows(req.body.key)
            console.log("DELETE success: deleted " + req.body.key + " from spreadsheet")
            res.status(200).send("OK")
        }catch(err){
            console.log("DELETE ERROR : likely sheetname is wrong or the key doesn't exist")
            console.log(err)
            res.status(500).send(err)
        }
        
    })
  

module.exports = router