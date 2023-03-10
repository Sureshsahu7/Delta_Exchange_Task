# Delta_Exchange_Task


1. Create a table that shows the following data.
Symbol Description Underlying Asset Mark Price

● Use the API https://api.delta.exchange/v2/products to fetch the initial data required. You can get only the
first 3 columns from this API

○ These are the field names respectively symbol, description, underlying_asset.symbol

● Mark Price has to update from a socket channel.

○ Create a socket connection using the URL wss://production-esocket.delta.exchange.

○ After a successful connection, subscribe to a channel called v2/ticker.

○ Inorder to make a successful subscription, you will have to send the array of product symbols as
the payload (Ex: {name: "v2/ticker", symbols: ["BTCUSD", "BTCUSDT"]}).

○ You will then get the required data, you can use a field called mark_price in the response.

○ You can refer to the documentation for more information https://docs.delta.exchange/#v2-ticker

● The first column of the table and the header has to be sticky on scroll

Instructions:

● Feel free to use either React/React Native

● In-case of not having a React exp, feel free to do it in any JS framework or using plain JS
