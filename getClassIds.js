var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var http = require('http');



app.get('/scrape', function(req, res){


const PORT=8080; 

fs.readFile('SearchResults.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});
  //All the web scraping magic will happen here
  url = 'http://localhost:8080';
  //window.open('http://www.google.com');
  
  request(url, function(error, respones, html){
	  if (!error){
		  console.log("No errors please");
		  var $ = cheerio.load(html);
		  
		  var name, ID, professor, section;
		  var json = { name: ""};
		  var classNames = [];
		  var dict = [];
		  
		  $('.class-title').each(function(){
			  var data = $(this);
			  var sectionIDs = [];
			  data.find('.primary-row').each(function() {
				section = ($(this).attr("id"));
				section = section.substring(0, section.indexOf("_"));
				console.log("ID: ", section);
				
				sectionIDs.push(section);
			  });
			  
			  
			  name = data.children().first().children().first().text();
			 
			  dict.push({classname : name, ids : sectionIDs});
		  })
	  }
	  fs.writeFile('output.json', JSON.stringify(dict, null, 4), function(err){
	  console.log('File successfully written! - Check directory for output.json file');
  })
  
  res.send('Check your console!')
  })
  
  

})

app.listen('3000')

console.log('Magic happens on port 3000');

exports = module.exports = app;