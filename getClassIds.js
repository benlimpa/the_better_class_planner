var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var http = require('http');


/*
	Script which takes saved HTML webpages from the UCLA registrar
	and parses out the class titles and IDs into a pre-saved dictionary, 
	so that the titles can be used to search the IDs and 
	the IDs can be used to search the registrar and scrape
	class data on demand.
*/
app.get('/scrape', function(req, res){

var dict = []; //dictionary to populate with class titles and IDs
for (int num = 0; num < 44; num++) //for every HTML file
{ 
	//host the HTML file on a local server so we can inspect it
	var port = 8000 + num;
	var fileName = num + '.html';
	fs.readFile(fileName, function (err, html) {

    if (err) throw err;    
	//host the current HTML file at a certain port (number 8000 + number of HTML file)
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port);
});
  //All the web scraping magic will happen here
  url = 'http://localhost:' + port;
  
  //to parse the webpage at the specified local url:
  request(url, function(error, respones, html){
	  if (!error){
		  console.log("No errors please");
		  var $ = cheerio.load(html);
		  
		  var name, ID, section;

		  var classNames = [];

		  //for each div with the class class-title (all the classes on the page)
		  $('.class-title').each(function(){
			  var data = $(this);
			  var sectionIDs = [];
			  //for each div within this div with class primary-row (all the lecture sections)
			  //get the ID of the section
			  data.find('.primary-row').each(function() {
				section = ($(this).attr("id"));
				section = section.substring(0, section.indexOf("_"));
				console.log("ID: ", section);
				
				sectionIDs.push(section);
			  });
			  
			  //get the name of the class
			  name = data.children().first().children().first().text();
			  //append the class name and an array of IDs to the dictionary
			  dict.push({classname : name, ids : sectionIDs});
		  })
	  }
	  
  
  
  })
  //write the entire dictionary to a json file
  fs.writeFile('output.json', JSON.stringify(dict, null, 4), function(err){
	  console.log('File successfully written! - Check directory for output.json file');
  })
  res.send('Check your console!')
  
}


})

app.listen('3000')

console.log('Magic happens on port 3000');

exports = module.exports = app;