const fs = require('fs');
//const path=require('path');
let files = fs.readdirSync("game-scripts");
fs.mkdir("website",()=>{console.log("trying to make directory test")});

for (let i=0;i<files.length;i++){
    console.log(files[i]);
}

let singleFileInclude1=fs.readFileSync("single-file-include1.php","utf8");
let singleFileInclude2=fs.readFileSync("single-file-include2.php","utf8");

//Build single file html files

for (let i=0;i<files.length;i++){
    let filename=files[i];
    let baseName=files[i].split(".js")[0];
    let gameName=baseName+".html";
    let str="";
    str+=singleFileInclude1;
    str+="<style>"+fs.readFileSync("style.css","utf8")+"</style>";
    str+=singleFileInclude2;
    str+="<script>"+fs.readFileSync("video-game-library.js","utf8")+"</script>";
    str+="<script>"+fs.readFileSync("sound-library.js","utf8")+"</script>";
    //Optional, but prevents the file from closing or going back to index;
    //str+="<script>document.getElementById('close-anchor-tag').href='';</script>";
    str+="<script>"+fs.readFileSync("game-scripts/"+filename,"utf8")+"</script>";
    str+="</body></html>";
    fs.writeFileSync("single-file-games/"+gameName,str,"utf8");
}


//Build game files including scripts

for (let i=0;i<files.length;i++){
    let filename=files[i];
    let baseName=files[i].split(".js")[0];
    let gameName=baseName+".html";
    let str="";
    str+=singleFileInclude1;
    str+="<link rel='stylesheet' href='style.css'>";
    str+=singleFileInclude2;
    str+="<script src='video-game-library.js'></script>";
    str+="<script src='sound-library.js'></script>";
    str+="<script src='"+filename+"'></script>";
    str+="</body></html>";
    fs.writeFileSync("website/"+gameName,str,"utf8");
    fs.copyFileSync("game-scripts/"+filename,"website/"+filename);
}

fs.copyFileSync("style.css","website/style.css");
fs.copyFileSync("video-game-library.js","website/video-game-library.js");
fs.copyFileSync("sound-library.js","website/sound-library.js");


///////build website index.html

let str="<!DOCTYPE html>\n\
<html lang='en'>\n\
<head>\n\
<meta charset='UTF-8'>\n\
<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n\
<title>CharWars</title>\n\
<link rel='stylesheet' href='index-style.css'>\n\
</head>\n\
<body>\n\
    <h1><a href='index.html' target='_blank'>CharWars</a></h1>\n";
str+="<div id='icon-blocks-container'>\n";
for (let i=0;i<files.length;i++){
    let filename=files[i];
    let baseName=files[i].split(".js")[0];
    //find title name
    let contents=fs.readFileSync("game-scripts/"+filename,"utf8");
    //let title=getInnerText(contents,"title");
    let title=findFirstSplit(contents,'new MyLittleVideoGame("','"');
    let mainCharacter=getInnerText(contents,"main character");
    str+="<div class='icon-block'>\n";
    str+="<a href='"+baseName+".html' class='main-character-icon'>"+mainCharacter+"</a>\n";
    str+="<a href='"+baseName+".html' class='game-title'>"+title+"</a>\n";
    str+="</div>\n";
}
str+='</div>\n';
str+="<footer>CharWars © 2021</footer>\n\
</body>\n\
</html>";
console.log(str);
fs.writeFileSync("website/index.html",str,"utf-8");
fs.copyFileSync("index-style.css","website/index-style.css");


function getInnerText(str,tag){
    str=str.replace("</"+tag+">","<"+tag+">");
    return str.split("<"+tag+">")[1].trim();
}
function findFirstSplit(str,tag1,tag2){
    result=str.split(tag1)[1].split(tag2)[0];
    return(result);
}

