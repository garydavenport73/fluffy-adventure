cp -f ./audio/wav/*.wav ./audio/mp3mono;
cd ./audio/mp3mono;
bash convertWavsToMonoMp3s.sh;
bash convertToBase64.sh;
cd ../..;
rm -rf website;
node buildGames.js;
