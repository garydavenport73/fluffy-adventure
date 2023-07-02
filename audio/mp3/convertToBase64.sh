rm soundLibrary.js;
touch soundLibrary.js;
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
    echo "let "$baseName"=\"data:audio/mpeg;base64," >temp$filename;
    base64 $file >>temp$filename;
    echo "\";" >>temp$filename;
    #remove new lines which automatically happens in base64 command
    #then write temp file to filename
    tr --delete '\n' < temp$filename >$filename;
    #rm the temp file  
    rm temp$filename; 
    #add 2 new lines to file
    echo >>$filename;
    echo >>$filename;
    #add contents of file to library
    cat $filename >> soundLibrary.js;
    #currently removing files and just keeping libary
    rm $filename;
done;