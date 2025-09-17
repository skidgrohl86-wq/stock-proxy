export default async function handler(req, res) {
  const symbol = req.query.q || "ENI.MI";
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;
  const response = await fetch(url);
  const data = await response.json();
  const r = data.quoteResponse.result[0];
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    symbol: r.symbol,
    price: r.regularMarketPrice,
    change: r.regularMarketChange,
    percent: r.regularMarketChangePercent
  });
}
