# MyReactHome

![MyReactHome](/docs/images/myreacthome.png)

MyReactHome is a Iot demo using React Native, Nodejs and Esp8266

## Getting Started
### Prerequisites
- Esp8266 like Wemos D1 or NodeMCU (but you can try other hardware, if you want, just make sure it have support for the http protocol)

- An Android or IOS device running Expo (feel free to run in a emulator) 

- A device running Nodejs on the same network as the others devices

### First clone this repo

```shell
git clone https://github.com/justapixel/MyReactHome.git
```
### Starting Nodejs server

```shell
cd backend && yarn install

yarn sequelize db:migrate && yarn dev
```

### Run the React app

```shell
cd mobile && yarn install
```
**change** the baseURL in src/services/api.js to you device running the Nodejs server

```shell
yarn start
```

### Insert Some data

**via curl**
```shell
curl --request POST \
  --url http://localhost:3000/sensor \
  --header 'content-type: application/json' \
  --data '{
	"location": "BEDROOM",
	"type": "light",
	"state": "off",
	"value": "0"
}'
```

**or Insomnia**

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=MyReactHome&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjustapixel%2FMyReactHome%2Fmaster%2FInsomnia.json)