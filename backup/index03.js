const http = require("http");

const hostname = "0.0.0.0";
const port = 8080;
var oldChunk = "Hello World";

const server = http.createServer((req, res) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log(req.headers);

  req.on("data", function(chunk) {
    console.log("BODY: " + chunk);
    //oldChunk = chunk.toString('ascii');
    let data = JSON.parse(chunk)
    let oldChunk2 = JSON.stringify(data.payload)

    // create a buffer
    const buff = Buffer.from(oldChunk2, 'base64');

    // decode buffer as UTF-8
    oldChunk = buff.toString('utf-8');




  });
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let myPage = `
  <h2 align=center> this is so cool </h2>
  <input type=button value=cool onclick="{alert('`+  oldChunk  +`')}" > 
  <br>

  I really like this<br>
  
  
  
  `
  res.write(myPage);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
