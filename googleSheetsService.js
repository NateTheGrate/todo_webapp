// googleSheetsService.js
// module to wrap googlesheets-api

const { google } = require('googleapis')

const sheets = google.sheets('v4')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


// CHANGE THESE TO YOUR OWN SPREADSHEET INFO

const sheetName = "Sheet1"
// random string of characters in URL of spreadsheet
const spreadsheetId = "1XFScIK362iSA7oknvN5NQmg1FANTbYvwFIQAuPKIfbE"

const auth = new google.auth.GoogleAuth({
    // MUST ADD THIS FILE YOURSELF
    keyFile: "auth_credentials.json",
    // KEEP SAME
    scopes:"https://www.googleapis.com/auth/spreadsheets"
})


/**
 * gets all spreadsheet data including meta data and values
 * 
 * @return spreadsheet data
 */
async function getSpreadSheet() {
  const res = await sheets.spreadsheets.get({
    auth,
    spreadsheetId,
  })
  return res
}

/**
 * gets all spreadsheet data including values only
 * can access values directly with res.values
 * 
 * @return 2d array of spreadsheet values that have contents
 */
async function getSpreadSheetValues() {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: sheetName,
  })
  return res
}

/**
 * store a key-value pair in the google spreadsheet
    - you may assume that there will only be one key-value pair
    - if key already exists, you may overwrite old value
 * @param values: 2d array of values that will either be appended or used to overwrite
 * 
 */
async function writeRows(values){

  // see if key already exists in spreadsheet
  index = await findIndex(values[0][0]) 

  // if we did not find a match, append new value
  if(index == -1){
    const res = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: sheetName+"!A:B",
      valueInputOption: "USER_ENTERED",
      resource:{
        values
      }
  
    })
  }else{
    // otherwise change existing key-value pair
    // googlesheets indexs at 1
    index+=1
    const res = await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range:sheetName + "!A"+ index + ":B" + index,
      valueInputOption: "USER_ENTERED",
      resource:{
        values
      },
    })
  }

}

/**
 * finds index of a given key in column A of the spreadsheet. 
 * @param key: value to match with existing string in spreadsheet
 * @return index found, or -1 if not found
 */
async function findIndex(key){

  values = (await getSpreadSheetValues(sheetName)).data.values
  // since you can only insert unique keys, we just need to find the first one
  for (var i = 0; i < values.length; ++i){

    if(values[i][0] === key){
      // found a match, return the index
      return i
    }
  }

  // we did not find a match, return -1
  return -1
}

/**
 * delete a row based on given key, if not found throw error
 * @param key: value to match with existing string in spreadsheet
 */
async function deleteRows(key){
  // see if key already exists
  index = await findIndex(key)

  // throw error if not found
  if(index == -1){
    throw "Key does not exist in spreadsheet"
  }

  // google sheets idexes at 1
  index+=1


  // delete found row
  const res = await sheets.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    // location in spreadsheet
    range:sheetName + "!A"+ index + ":B" + index
  })
  
}

/**
 * edit a row based on given key, if not found throw error
 * @param key: value to match with existing string in spreadsheet
 * @param value: value to overwrite in spreadsheet
 */
async function editRows(key, value){
  // see if key exists
  index = await findIndex(key)
  // throw if not found
  if(index == -1){
    throw "Key does not exist in spreadsheet"
  }

  // google sheets indexes at 1
  index+=1

  // update values based on row index
  const res = await sheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    // location on spreadsheet to edit
    range:sheetName + "!A"+ index + ":B" + index,
    valueInputOption: "USER_ENTERED",
    resource:{
      // must be in this format
      values: [[key, value]]
    },
  })

}

module.exports = {
  getSpreadSheet,
  getSpreadSheetValues,
  writeRows,
  deleteRows,
  editRows
}