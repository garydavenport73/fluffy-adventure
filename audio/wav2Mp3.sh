
for file in *.wav
do
    echo $file;
    baseName=${file%.wav};
    mp3Name=$baseName.mp3;
    ffmpeg -i $file -vn -ar 22050 -ac 2 -b:a 128k $mp3Name;
done;