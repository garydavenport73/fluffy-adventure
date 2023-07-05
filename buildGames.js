const fs = require('fs');

let files = fs.readdirSync("game-scripts");

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
    str+="<link rel='stylesheet' href='../style.css'>";
    str+=singleFileInclude2;
    str+="<script src='../video-game-library.js'></script>";
    str+="<script src='../sound-library.js'></script>";
    str+="<script src='../game-scripts/"+filename+"'></script>";
    str+="</body></html>";
    fs.writeFileSync("games/"+gameName,str,"utf8");
}