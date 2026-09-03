export default function FinancialWeather({ weather, probability }) {
  const icon = weather === "Stable" ? "☀️" : weather === "Caution" ? "⛅" : "🌩️";
  return (
    <div className={`weather ${weather.toLowerCase().replace(" ", "-")}`}>
      <div className="weather-icon">{icon}</div>
      <div>
        <div className="eyebrow">FINANCIAL WEATHER</div>
        <h2>{weather}</h2>
        <p>Estimated short-term financial stress probability: <strong>{probability}%</strong></p>
      </div>
    </div>
  );
}
