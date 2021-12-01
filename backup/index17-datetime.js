const http = require("http");

const hostname = "0.0.0.0";
const port = 8080;
let myNoShow = [];   // key to values to hide!
//let myNoShow = ["app_eui","dev_eui","lat","long", "name","devaddr","downlink_url","id","organization_id","uuid"];

let myHTML = 'Hello World';


function timeConverter(UNIX_timestamp){
 // var a = new Date(UNIX_timestamp * 1000);
  var a = new Date(UNIX_timestamp);
 // var a = UNIX_timestamp;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}



function myJsonToHtml( json, myNoNoShow, myHideTrueFalse ) {
  let myOutput = "<ul>";
  for (const property in json) {
    if( typeof json[property] === 'string' || typeof json[property] === 'number' || typeof json[property] === 'boolean' || typeof json[property] === 'bigint') {
        if (myNoNoShow.includes(property)) {
          myOutput += "<li>" + property + " : *******************"; 
        } else {
          myOutput += "<li>" + property + " : " + json[property];
          // specific properties tested here
          if (property == "payload"){
            myOutput += " , Base 64 converted: <b>" + Buffer.from(json[property], 'base64') + "</b>";
          } 
          if (property == "id"){
            myOutput += "  <a target='_blank' href='https://explorer.helium.com/hotspots/"+json[property]+"'>Helium Link</a><br>" ;
          } 
          if (property == "reported_at"){
            myOutput +=", Date: " + timeConverter(json[property]) ;
          } 



        }

    } else if(typeof json[property]== 'object' && json[property] != null ){  
       myOutput += "<br>" + property + myJsonToHtml(json[property], myNoNoShow)  // recursive call this
   
    } else if( Array.isArray( json[property] ) ) {
       myOutput += "<br><ul>" + property;
    	  for( let i=0; i < json[property].length; i++ ) {      
             myOutput +=  property + "[" + i + "]";         
             myOutput +=  myJsonToHtml(json[property][i], myNoNoShow)  // recursive call this        
       }
       myOutput += "</ul>";
    }
  }
  myOutput += "</ul>";
  return myOutput
} 

const server = http.createServer((req, res) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log(req.headers);

  req.on("data", function(chunk) {

    console.log("BODY: " + chunk);   // Logs everything coming in

    let data = JSON.parse(chunk)
    myHTML = myJsonToHtml(data, myNoShow)

  });
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  res.write(myHTML);
  res.end();

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
