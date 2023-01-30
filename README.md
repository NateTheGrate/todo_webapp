# todo webapp
## description
a very basic todo app using node.js, express, and googlesheets-api that can display all row in a google spreadsheet, change any existing row, and delete an existing row.

## how to get running on your computer

1. setup google auth credentials at google cloud developers.

2. insert key json into main project directory as auth_credentials.json

3. adjust lines 13 and 15 of googleSheetsService.js to your specific google sheet ID and name of spreadsheet (default is usually "Sheet1", caps matter).

4. then run server as your normally would, or with npm run devStart to run it with nodemon
