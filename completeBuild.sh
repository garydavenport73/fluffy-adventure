cp -f ./audio/wav/*.wav ./audio/mp3mono;
cd ./audio/mp3mono;
bash convertWavsToMonoMp3s.sh;
cd ../..;
node buildGames.js;
