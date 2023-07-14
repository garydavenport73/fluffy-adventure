for f in *.wav;
  #do ffmpeg -i "$f" -c:a libmp3lame -q:a 2 -ac 1 "$f".mp3; 
  #do ffmpeg -i "$f" -vn -ar 22050 -ac 1 -b:a 128k "$f".mp3;
  do ffmpeg -i "$f" -ar 22050 -ac 1 -b:a 128k "$f".mp3;
  #ffmpeg -i $file -vn -ar 22050 -ac 2 -b:a 128k $mp3Name;
  #do ffmpeg -i "$f" -acodec libmp3lame "$f".mp3;
done;
#for i in *.wav; do ffmpeg -i "$i" -f mp3 "${i%}.mp3"; done
for file in *.wav.mp3;
   do mv -f "$file" "${file%.wav.mp3}.mp3";
done;
rm *.wav;