const http = require("http");

const hostname = "0.0.0.0";
const port = 8080;
let oldChunk = "Hello World";
let myKeys = '';
let myHotspots = '';
let myMetaData = '';
let myLabels = '';
let myAllKeys = '';

const server = http.createServer((req, res) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log(req.headers);

  req.on("data", function(chunk) {




    console.log("BODY: " + chunk);
    //oldChunk = chunk.toString('ascii');
    let data = JSON.parse(chunk)

    for (x in data) {   
      //  console.log(x +" => "+ data[x]); 
        myKeys += x + "<br>";
    }
    for (let y=0; y < data.hotspots.length; y++){
      for (x in data.hotspots[y]) {   
         // console.log(x +" => "+ data.hotspots[x]); 
          myHotspots += x + "<br>";
      }
    }
    /*
    Object.keys(data).forEach(key => { 
       // console.log(jsonObject[key]); //values 
        console.log(key); //keys 
        myAllKeys += key + "<br>";
    })
    */

    let oldChunk2 = JSON.stringify(data.payload)

    // create a buffer
    const buff = Buffer.from(oldChunk2, 'base64');

    // decode buffer as UTF-8
    oldChunk = buff.toString('utf-8');  //.trim();  // also removes spaces
  




  });
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let myPage = `
  <h2 align=center> this is so cool </h2>
  <input type=button value=payload onclick="{alert('`+  oldChunk  +`')}" > <br>



  Just showing the keys on the webpage not the values<br>
  
  ` + myKeys + `
  <h3>in the hotspots key:</h3>
  ` + myHotspots + `

  
  <hr> Page end
  
  `
  res.write(myPage);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
