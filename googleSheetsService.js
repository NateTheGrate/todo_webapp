// googleSheetsService.js

const { google } = require('googleapis')

const sheets = google.sheets('v4')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


// CHANGE THESE TO YOUR OWN INFO

const sheetName = "Sheet1"

const spreadsheetId = "1XFScIK362iSA7oknvN5NQmg1FANTbYvwFIQAuPKIfbE"

const auth = new google.auth.GoogleAuth({
    // MUST ADD THIS YOURSELF
    keyFile: "auth_credentials.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
})



async function getSpreadSheet() {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  })
  return res
}

async function getSpreadSheetValues() {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: sheetName,
  })
  return res
}

async function writeRows(values){
  const res = await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: sheetName+"!A:B",
    valueInputOption: "USER_ENTERED",
    resource:{
      values
    }

  })
}

async function findIndex(key){
  values = (await getSpreadSheetValues(sheetName)).data.values
  for (var i = 0; i < values.length; ++i){
    if(values[i][0] === key){
      return i
    }
  }
  return -1
}

async function deleteRows(key){
  
  index = await findIndex(key) + 1

  if(index == -1){
    throw "Key does not exist in spreadsheet"
  }

  const res = await sheets.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range:sheetName + "!A"+ index + ":B" + index
  })
  
}

async function editRows(key, value){
  index = await findIndex(key) + 1

  if(index == -1){
    throw "Key does not exist in spreadsheet"
  }

  const res = await sheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range:sheetName + "!A"+ index + ":B" + index,
    valueInputOption: "USER_ENTERED",
    resource:{
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