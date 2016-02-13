//  1. Enter sheet name where data is to be written below
        var SHEET_NAME = "list";

//  2. Run > setup
//
//  3. Publish > Deploy as web app
//    - enter Project Version name and click 'Save New Version'
//    - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously)
//
//  4. Copy the 'Current web app URL' and post this in your form/script action
//
//  5. Insert column names on your destination sheet matching the parameter names of the data you are passing in (exactly matching case)

var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

// If you don't want to expose either GET or POST methods you can comment out the appropriate function
var ss = SpreadsheetApp.openById("1sw-dA6l-BQaQihjG-KK1yPMHZF4Nb0ApQry8RJdPiIo");
var sheet = ss.getSheetByName(SHEET_NAME);
var rng = ss.getDataRange();
var data = rng.getValues();
var headings = data[0];


function doGet(request) {
  // Check for a valid request URI
  //Logger.log(request.parameter.action);
  //request.parameter.action.toString();
  if ( request.parameter.action == "index" ){
    return indexLines(request);
  } else if ( request.parameter.action == "show" ){
    return showLine(request);
  } else {
    return ContentService.createTextOutput('Invalid Request. Use a valid "action" parameter.');
  }
}

function indexProducts(request){
  //data.shift();
  var response = {
      lines: data
  }
  return ContentService.createTextOutput(JSON.stringify(response));
}


function showLine(request){
  if (request.parameter.lineid !== undefined){
    var lineIds = request.parameters.lineid;

    // The object to be returned as JSON
    var response = {
      lines: []
    }

    // Fill the products array with requested products
    for (var i = 0; i < lineIds.length; i++){
      var sheetData = lineQuery(prodIds[i]);
      var line = formatLine(sheetData);
      response.lines.push(line);
    }

    if (response.lines.length > 0){
      return ContentService.createTextOutput(JSON.stringify(response));
    } else {
      return ContentService.createTextOutput('Invalid Request. Line ID(s) not found.');
    }


  } else {
    return ContentService.createTextOutput('Invalid Request. Use at least one valid "prodid" parameter.');
  }
}





function doPost(request){
  if ( request.parameter.action == "create" ){
    return createRow(request);
  } else if ( request.parameter.action == "update" ){
    return updateCell(request);
  } else {
    return ContentService.createTextOutput('Invalid Request. Use a valid "action" parameter.');
  }
}

function updateCell(request){
  // coming params:
  // "action": "postvalue", "lineid": "i3334", "test": "test2"
  // need to parse id for number of row
  // need to parse header for number of column

  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);

    var rowName = request.parameter.lineid;
    var columnName = request.parameter.columnid;

    for (var row in data) {
      for (var col in data[row]) {
        if (data[row][col] == rowName) {
          var rowId = parseInt(row)+1;
        }
      }
    }
    var lineRow = lineQuery(rowName);

    for (var i = 1; i < data[0].length; i++) {
        if (data[0][i] == columnName) {
          var columnId = parseInt(i)+1;
        }
    }





    sheet.getRange(rowId, columnId).setValue(request.parameter.value);

    return ContentService
          .createTextOutput(JSON.stringify({"result": "success", "cell": request.parameter.value, "row": rowId, "column": columnId, "request": request}))
  } catch(request){
    // if error return this
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": request}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}

function createRow(request) {
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.

  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);

    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = request.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else { // else use header name to get data
        row.push(request.parameter[headers[i]]);
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // return json success results
    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "row": nextRow, "request": request}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(request){
    // if error return this
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": request}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}

function setup() {
    Logger.log(SpreadsheetApp.getActiveSheet().getName());
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log(doc);
    SCRIPT_PROP.setProperty("key", doc.getId());
}

/* Take a product ID as input and return the
 * row corresponding to that product ID.*/

function lineQuery(lineId){
 for (var i = 1; i < data.length; i++){
  if (lineId === data[i][0]){
   return data[i]
  }
 }
}

/* Take a spreadsheet (product) row and turn it into an object
 with spreadsheet headings as object keys. */

function formatLine(rowData){
 var line = {}
 for (var i = 0; i < headings.length; i++){
  line[headings[i].toString()] = rowData[i]
 }
 return line
}
