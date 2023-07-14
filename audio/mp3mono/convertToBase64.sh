rm sound-library.js;
touch sound-library.js;
for file in *.mp3
do
    #show current filename
    echo $file;
    #get basename
    baseName=${file%.mp3};
    #make name for sound
    filename=$baseName.js;
    #show new filename
    echo $filename;
    #start build file
    str="";
    echo $str;
    str=$str"let "$baseName" = \"data:audio/mpeg;base64,";
    echo $str;
    str=$str$(base64 $file|tr -d \\n);
    #str=$str$(base64 $file);
    str=$str\"\;;
    #str=$str\"\n\n;
    echo $str>$filename;
    #add to sound library
    echo $str>>sound-library.js;
    #extra line in libary for readability
    echo >>sound-library.js;
done;

cp -f sound-library.js ../..