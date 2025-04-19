import { useState } from "react";
import "./GoldProfitCalculator.css";

export default function GoldProfitCalculator() {
  const [goldPricePerGram, setGoldPricePerGram] = useState("");
  const [coinWeight, setCoinWeight] = useState("5");
  const [coinPrice, setCoinPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("14.76");
  const [sellLossPercent, setSellLossPercent] = useState("2");

  const parse = (val) => parseFloat(val) || 0;

  const effectiveCoinPrice = parse(coinPrice) * (1 - parse(discountPercent) / 100);
  const marketValue = parse(goldPricePerGram) * parse(coinWeight) * (1 - parse(sellLossPercent) / 100);
  const profitLoss = marketValue - effectiveCoinPrice;
  const profitLossPercent = effectiveCoinPrice ? (profitLoss / effectiveCoinPrice) * 100 : 0;

  const handleInputChange = (setter) => (e) => {
    const clean = e.target.value.replace(/^0+(?!\.)/, ""); // remove leading 0s unless it's like 0.xx
    setter(clean);
  };

  return (
    <div className="container">
      <h1>Gold Coin Profit Calculator</h1>

      <div className="form">
        <label>Gold Price per gram (₹):</label>
        <input
          type="number"
          value={goldPricePerGram}
          onChange={handleInputChange(setGoldPricePerGram)}
          placeholder="e.g. 9760.5"
        />

        <label>Coin Weight (g):</label>
        <input
          type="number"
          value={coinWeight}
          onChange={handleInputChange(setCoinWeight)}
          placeholder="e.g. 5"
        />

        <label>Coin Price (₹):</label>
        <input
          type="number"
          value={coinPrice}
          onChange={handleInputChange(setCoinPrice)}
          placeholder="e.g. 52846"
        />

        <label>Discount (%) (e.g., card offer):</label>
        <input
          type="number"
          value={discountPercent}
          onChange={handleInputChange(setDiscountPercent)}
          placeholder="e.g. 14.76"
        />

        <label>Sell loss (%) (e.g., 2% market loss):</label>
        <input
          type="number"
          value={sellLossPercent}
          onChange={handleInputChange(setSellLossPercent)}
          placeholder="e.g. 2"
        />
      </div>

      <div className="results">
        <p><strong>Effective Coin Price:</strong> ₹{effectiveCoinPrice.toFixed(2)}</p>
        <p><strong>Market Value:</strong> ₹{marketValue.toFixed(2)}</p>
        <p className={profitLoss >= 0 ? "profit" : "loss"}>
  <strong>Profit/Loss:</strong> ₹{profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
</p>
      </div>
    </div>
  );
}
