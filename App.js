import React, { useState, useEffect } from "react";
import axios from "axios";
import * as moment from "moment";
import { StickyTable, Row, Cell } from "react-sticky-table";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const App = () => {
  const [products, setProducts] = useState([]);
  const [markPrices, setMarkPrices] = useState([]);

  useEffect(() => {
    // Fetch product data from API
    axios.get("https://api.delta.exchange/v2/products").then((response) => {
      setProducts(response.data);
    });
    // Connect to socket channel
    const client = new W3CWebSocket("wss://production-esocket.delta.exchange");
    client.onopen = () => {
      // Subscribe to v2/ticker channel and send symbols as payload
      client.send(
        JSON.stringify({ name: "v2/ticker", symbols: ["BTCUSD", "BTCUSDT"] })
      );
    };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      // Update mark prices for each symbol
      setMarkPrices((prevState) => {
        return {
          ...prevState,
          [data.symbol]: data.mark_price,
        };
      });
    };
  }, []);

  return (
    <StickyTable>
      <Row>
        <Cell>Symbol</Cell>
        <Cell>Description</Cell>
        <Cell>Underlying Asset</Cell>
        <Cell>Mark Price</Cell>
      </Row>
      {products.map((product) => (
        <Row key={product.symbol}>
          <Cell>{product.symbol}</Cell>
          <Cell>{product.description}</Cell>
          <Cell>{product.underlying_asset.symbol}</Cell>
          <Cell>{markPrices[product.symbol]}</Cell>
        </Row>
      ))}
    </StickyTable>
  );
};

export default App;
