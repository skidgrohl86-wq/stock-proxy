export default async function handler(req, res) {
  const symbol = (req.query.q || "aapl.us").toLowerCase();
  const url = `https://stooq.com/q/l/?s=${symbol}&f=sd2t2ohlcv&h&e=csv`;
  
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    const lines = text.trim().split("\n");
    const parts = lines[1].split(",");
    const close = parts[6]; // colonna Close

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      symbol: symbol.toUpperCase(),
      price: parseFloat(close)
    });
  } catch (err) {
    res.status(500).json({ error: "Errore nel proxy", details: err.message });
  }
}
