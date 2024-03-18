## Crypto App

For starting:
1. Get your [Coin Market Cap API Key](https://coinmarketcap.com/api) and create the env.ts file in the root directory:

```bash
export const env = {
  API_KEY: 'YOUR_CMC_API_KEY'
}
```
2. Clone and install project 
```bash
git clone git@github.com:AdrianZablocki/crypto-app.git
# and install dependencies
npm i
```
3. Clone, install and run [`Proxy/Mock Server`](https://github.com/AdrianZablocki/crypto-app-mock-server).
```bash
npm i
# and then 
npm run dev
```
3. Run Crypto App
```bash
ionic serve
```