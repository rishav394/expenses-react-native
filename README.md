# Expenses

[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)]()

A demonstration of how a react-native app can work with google sheets directly.

## Folder breakdown
1. Root directory is the client - uses expo
2. `server` directory is the backend - uses node js and googleapis

## How to run
0. Clone the repo
1. Rename `.env.example` to `.env` in the server directory
2. Set environment variables accordingly there
3. Start server by running `cd server`, `yarn` and then `yarn run start`
4. Start client by running `yarn` and then `yarn run start`

## TODO
* Add, update, delete data from Google Sheet - Server
* Eject - expo

## What the server expects
The server expects the reposnse from google sheet to have all the names in Col A and their entries next to them. 

Something like this:

| Name (Row not actually in the sheet) 	| Amount1 	| Amount2 	|
|--------------------------------------	|--------:	|---------	|
| Luigi                                	|     200 	|         	|
| Ryu                                  	|     500 	| -20.12  	|
| Zen                                  	| -123.34 	| 199     	|
| Mario                                	|         	| 123     	|