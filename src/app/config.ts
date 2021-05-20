 /**
  * This configuration file stores all the necessary credentials in order to 
  * connect to CryptoCompare.com.
  * Lists of the desired cryptos and currencies to be displayed is also 
  * stored here.
  */
 
 export class Config {
    static cryptoCompareWSURL = 'wss://streamer.cryptocompare.com/v2';
    static privateKey = '91710139a975eb799dfa0bee3150ee5eabf704e6967894ca12c550a96dd1a351';
    static cryptoList = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'ETC'];
    static currencyList = ['USD', 'GBP', 'EUR', 'JPY', 'ZAR'];
};