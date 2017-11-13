var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

function writeFile(input) {
  fs.writeFile('output.json', input, function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
  })
}
// Serve webpage
app.use(express.static(__dirname));

app.get('/scrape', function(req, res){
  // Let's scrape the UCLA Page
  url = 'https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=classidnumber&id=102108200';

  request(url, function(error, response, html){
    if(!error){
      //
      
      var $ = cheerio.load(html);
      
      let classInfo = {status: "", day: "", startTime: "", endTime: "", location: "", units: "", instructors: ""};

      if ($('.statusColumn').eq(1).children().first()
        .children().first().attr('class') == "icon-unlock")
        classInfo.status = "Open";
      else
        classInfo.status = "Closed";

      classInfo.day = $('.dayColumn').eq(1).children().first()
        .children().first().children().first().attr('data-content');
      
      let time = $('.timeColumn').eq(1).children().eq(1).text();
      let times = time.split("-");
      classInfo.startTime = times[0];
      classInfo.endTime = times[1];

      classInfo.location = $('.locationColumn').eq(1).children().first().text();

      classInfo.units = $('.unitsColumn').eq(1).children().first().text();

      classInfo.instructors = $('.instructorColumn').eq(1).children().first().text();

      //writeFile(JSON.stringify(classInfo, null, 4));
      res.send(JSON.stringify(classInfo, null, 4));
    }
  })
})

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
