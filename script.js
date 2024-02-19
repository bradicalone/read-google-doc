const readXlsxFile = require("read-excel-file/node");
const {sheetID} = require('./sheet')

// To website with excel file ( HAVENT TRIED YET )
// fetch('https://example.com/spreadsheet.xlsx')
// .then(response => response.blob())
// .then(blob => readXlsxFile(blob))
// .then((rows) => {
//   console.log('rows:', rows)
//   // `rows` is an array of rows
//   // each row being an array of cells.
// })

// File path. ( THIS WORKS )
// readXlsxFile("customers.xlsx").then((rows) => {
//     console.log("rows:", rows);
//     // `rows` is an array of rows
//     // each row being an array of cells.
// });

// Read google doc with npm package (THIS DIDN'T WORK BUT MAYBE BECAUSE GOOGLE API WASN)
// const reader = require("g-sheets-api");
// const readerOptions = {
//     apiKey: "yourGoogleAPIkeyFromGoogle.jsonFile",
//     sheetId: sheetID,
//     sheetName: "test read",
//     returnAllResults: false
// };

// reader(readerOptions, (results) => {
//     console.log('results:', results)
//     /* Do something amazing with the results */
// });



/*
* WORKING
*/

const {google} = require('googleapis')

const auth = new google.auth.GoogleAuth({
    keyFile: './google.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

async function writeToSheet(values) {
    console.log('values:', values)
    const sheets = google.sheets({version: 'v4', auth})
    // From the url of the spreadsheet
    const spreadsheetId = sheetID
    const range = 'Sheet1!A1'
    const valueInputOption = 'USER_ENTERED'

    const resource = {values}
    try {
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId,range,valueInputOption,resource
        })
        return res
    }catch(e) {
        console.log(e)
    }
}

async function readSheet(values) {
    const sheets = google.sheets({version: 'v4', auth})
    const spreadsheetId = sheetID
    const range = 'Sheet1!A1:A3'

    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,range
        })
        return res.data.values
    }catch(e) {
        console.log(e)
    }
}

(async ()=> {
    // const writer = await writeToSheet([['Name', 'Age'],['Brad', 43]])
    // console.log('writer:', writer)

    const data = await readSheet()
    console.log('data :', data )
})();