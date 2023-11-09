import axios from 'axios';
import 'dotenv/config';

const API_KEY = process.env.LOL_API_KEY;
const SUMMONER_NAME = process.env.SUMMONER_NAME;

const MASTER_LEAGUES_API = `https://br1.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`;
const GRANDMASTER_LEAGUES_API = `https://br1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`;
const CHALLENGER_LEAGUES_API = `https://br1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`;

Promise.all([axios.get(MASTER_LEAGUES_API), axios.get(GRANDMASTER_LEAGUES_API), axios.get(CHALLENGER_LEAGUES_API)])
  .then(([mastersResponse, grandmastersResponse, challengersResponse]) => {
    const masters = mastersResponse.data['entries'];
    const grandmasters = grandmastersResponse.data['entries'];
    const challengers = challengersResponse.data['entries'];

    const allPlayers = [...masters, ...grandmasters, ...challengers];

    allPlayers.sort((a, b) => b.leaguePoints - a.leaguePoints);

    allPlayers.forEach((player, index) => {
      player.position = index + 1;
    });

    const mappedAllPlayers = allPlayers.map(({ summonerName, leaguePoints, position }) => ({
      summonerName,
      leaguePoints,
      position,
    }));

    const challengerPromotionCutOff = mappedAllPlayers.filter((player) => player.position === 200)[0].leaguePoints;
    const grandmasterPromotionCutOff = mappedAllPlayers.filter((player) => player.position === 700)[0].leaguePoints;

    const playerData = mappedAllPlayers.filter((player) => player.summonerName === SUMMONER_NAME)[0];

    const nextPromotionCutOffPosition =
      playerData.leaguePoints > challengerPromotionCutOff
        ? 'CHALLENGER'
        : playerData.leaguePoints > grandmasterPromotionCutOff
        ? 'GRANDMASTER'
        : 'MASTER';

    console.log('==============================');
    console.log('CHALLENGER PROMOTION CUTOFF:', challengerPromotionCutOff, 'LP');
    console.log('==============================');
    console.log('GRANDMASTER PROMOTION CUTOFF:', grandmasterPromotionCutOff, 'LP');
    console.log('==============================');
    console.log('YOUR LEAGUE POSITION:', `#${playerData.position} (${playerData.leaguePoints} LP)`);
    console.log('==============================');
    console.log('IN THE NEXT PROMOTION CUTOFF, YOU WILL BE:', nextPromotionCutOffPosition);
    console.log('==============================');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
