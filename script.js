async function checkGrammar() {

const text = document.getElementById("inputText").value;

if(text.trim()===""){
alert("Enter some text");
return;
}

document.getElementById("result").innerHTML =
"Checking...";

try {

const response = await fetch(
"https://api.languagetool.org/v2/check",
{
method:"POST",
headers:{
"Content-Type":
"application/x-www-form-urlencoded"
},
body:new URLSearchParams({
text:text,
language:"en-US"
})
}
);

const data = await response.json();

if(data.matches.length===0){

document.getElementById("result").innerHTML =
"<h3>✅ No grammar mistakes found.</h3>";

return;
}

let html =
"<h3>Grammar Suggestions:</h3><br>";

data.matches.forEach(item=>{

html += `
<p>
❌ <strong>Error:</strong>
${item.context.text}<br>

✅ <strong>Suggestion:</strong>
${item.replacements
.slice(0,3)
.map(r=>r.value)
.join(", ")}
</p>
<hr>
`;
});

document.getElementById("result").innerHTML =
html;

}
catch(error){

document.getElementById("result").innerHTML =
"Error checking grammar.";

console.error(error);

}
}
