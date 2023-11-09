# League Promotion Cutoff

### Find out the League of Legends promotion cutoff for GrandMaster and Challenger Leagues.

## Node version

This project was made using node version **>= 16.16.0**

## Project Configuration

### First of all, copy the *.env.example* to a new *.env* file:

`cp .env.example .env`

### Then, configure the following env:
```
LOL_API_KEY="YOUR-LOL-API-KEY"
SUMMONER_NAME="YOUR SUMMONER NAME"
```

* LOL_API_KEY can be obtained here: https://developer.riotgames.com/
* SUMMONER_NAME is your league summoner name. Example: "hide on bush"

### Install the modules with yarn:

`yarn`

### Then, just run the command:

`node index.js`
