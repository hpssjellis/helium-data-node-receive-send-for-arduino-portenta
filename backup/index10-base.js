const http = require("http");

const hostname = "0.0.0.0";
const port = 8080;

let oldChunk = "Hello World";


const server = http.createServer((req, res) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log(req.headers);

  req.on("data", function(chunk) {


    console.log("BODY: " + chunk);   // Logs everything coming in


  });
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let myPage = `
  <h2 align=center> this is so cool </h2>
  ` + oldChunk + `

 
  <hr> Page end
  
  `
  res.write(myPage);
  res.end();

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
