const XLSX = require('xlsx');
const gtmetrix = require ('gtmetrix') ({
  email: 'neo@neo.com.pe',
  apikey: 'f2583e6e87bd7f2cafd070b42e3089fb'
});

// Run test from London with Google Chrome
const testDetails = {
  url: 'https://superpet.pe/',
  location: 2,
  browser: 3
};

// Poll test every 5 seconds for completion, then log the result

gtmetrix.test
.create (testDetails)
.then ((data) => gtmetrix.test.get (data.test_id, 5000))
.then ((data) => {
	var ws = XLSX.utils.json_to_sheet(data);

	// add to workbook 
	var wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "GTmetrix test");

	// write workbook 
	var buf = XLSX.write(wb, {bookType:'xlsx', type:'buffer'}); // generate a nodejs buffer
	var str = XLSX.write(wb, {bookType:'xlsx', type:'binary'}); // generate a binary string in web browser

});

/*
// make the worksheet 
const XLSX = require('xlsx');

var ws = XLSX.utils.json_to_sheet(jdata);

// add to workbook 
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "GTmetrix test");

// write workbook 
var buf = XLSX.write(wb, {bookType:'xlsx', type:'buffer'}); // generate a nodejs buffer
var str = XLSX.write(wb, {bookType:'xlsx', type:'binary'}); // generate a binary string in web browser
*/