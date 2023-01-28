const express = require("express")
const router = express.Router()


router
    .route("/")
    .get((req,res) => {
        res.render("data/data", {key:"insert key", value:"insert value"})
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
    .post((req,res)=>{
        const isValid = true

        console.log(req.body)

        if(isValid){
            res.status(200).send("OK")
        }else{
            res.status(500).send("something went wrong")
        }
    })

router
    .route("/:key")
    // want to view particular key value pair
    .get((req,res) => {

        // want to replace this with strictly viewing the row in the spreadsheet
        // with two buttons to edit or delete
        res.render("data/sheet_row", { key:"insert key", value:"insert value"})
    })
    /*
        method: DELETE
        URL : /data/:key
        Description : delete the key-value pair
        Data-Type: json
    
    */

    .delete((req,res)=>{
        const isValid = true

        console.log("hi")

        if(isValid){
            res.status(200).send("OK")
        }else{
            res.status(500).send("something went wrong")
        }
    })
  

module.exports = router