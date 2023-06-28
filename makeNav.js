const fs = require('fs');
const EXTENSION = "html";

let files = fs.readdirSync(".");
files = fs.readdirSync(".");

let gameFiles = files.filter(findGameFiles);
console.log(files);
console.log(gameFiles);

let str="<div id='icon-blocks-container'>";

for (let i=0;i<gameFiles.length;i++){
    let filename=gameFiles[i];
    let baseName=gameFiles[i].split(".html")[0];
    //find title name
    let contents=fs.readFileSync(filename,"utf8");
    let title=getInnerText(contents,"title");
    let mainCharacter=getInnerText(contents,"main character");
    str+="<div class='icon-block'>\n";
    str+="<a href='"+filename+"' class='main-character-icon'>"+mainCharacter+"</a>\n";
    str+="<a href='"+filename+"' class='game-title'>"+title+"</a>\n";
    str+="</div>\n";
}
str+='</div>';
console.log(str);

function getInnerText(str,tag){
    str=str.replace("</"+tag+">","<"+tag+">");
    return str.split("<"+tag+">")[1].trim();
}

function findGameFiles(filename) {
    let tempArr = filename.split(".");
    if (tempArr[tempArr.length - 1] === EXTENSION) {
        if (filename !== "index.html") {
            return true;
        }
    } else {
        return false;
    }
}