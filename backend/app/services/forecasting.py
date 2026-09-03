from datetime import date, timedelta
import pandas as pd
from prophet import Prophet

def forecast_series(rows, periods=7):
    """
    rows: [{"date": date|str, "amount": float}, ...]
    Returns a short forecast. If Prophet cannot fit the small/demo dataset,
    falls back to a recent moving average.
    """
    if not rows:
        return []

    df = pd.DataFrame(rows)
    df["ds"] = pd.to_datetime(df["date"])
    df["y"] = pd.to_numeric(df["amount"], errors="coerce")
    df = df.groupby("ds", as_index=False)["y"].sum().sort_values("ds")

    if len(df) < 2:
        avg = float(df["y"].mean()) if len(df) else 0
        start = date.today()
        return [{"date": start + timedelta(days=i+1), "predicted": round(avg, 2)} for i in range(periods)]

    try:
        model = Prophet(
            daily_seasonality=False,
            weekly_seasonality=True,
            yearly_seasonality=False,
            interval_width=0.80,
        )
        model.fit(df[["ds", "y"]])
        future = model.make_future_dataframe(periods=periods, freq="D")
        pred = model.predict(future).tail(periods)
        return [
            {"date": row.ds.date(), "predicted": round(max(0, float(row.yhat)), 2)}
            for row in pred.itertuples()
        ]
    except Exception:
        avg = float(df["y"].tail(7).mean())
        start = date.today()
        return [{"date": start + timedelta(days=i+1), "predicted": round(avg, 2)} for i in range(periods)]
