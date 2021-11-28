
<script>

// from https://stackoverflow.com/questions/59959193/iterate-complex-json-object-of-unknown-complexity?rq=1
  
function myJsonToHtml( json, element ) {
  let myOutput = "<ul>";
  for (const property in json) {
    if( typeof json[property] === 'string' ) {
      myOutput += "<li>" + property + " : " + json[property] 
    } else if( Array.isArray( json[property] ) ) {
      myOutput += "<ul>";
    	for( let i=0; i< json[property].length; i++ ) {
          for (const propertyArray in json[property][i]) {
             myOutput += "<li>" + propertyArray+ "[" + i + "]";            
             myOutput +=  myJsonToHtml(json[property][i], element)  // recursive call this
            
          }  
      }
      myOutput += "</ul>";
    }
  }
  myOutput += "</ul>";
  return myOutput
}  
  
   
let json = {id: "foo",rows: [{class: "blah",cols: [{class: "haha"},{class: "bar"},{class: "baz"}]},{class: "yada", style:"background: yellow"}]}
  
  
let myHTML = myJsonToHtml(json, document.getElementById('content'))
  document.getElementById('content').innerHTML = myHTML
  console.log(document.getElementById('content').innerHTML)
   
  
</script>


<div id='content'>...</div>


