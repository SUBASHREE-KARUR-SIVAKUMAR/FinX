# API

Base URL: `http://localhost:8000`

## GET /health

Returns API health.

## GET /api/dashboard/{user_id}

Returns the complete dashboard payload:

- current balance
- safe-to-spend
- safety floor
- resilience score
- stress probability
- financial weather
- 7-day forecast
- recommendation

## GET /api/forecast/{user_id}

Returns 7 predicted income points.

## GET /api/recommendation/{user_id}

Returns the current recommendation.

## POST /api/what-if/{user_id}

Request:

```json
{
  "income_change_pct": -30,
  "days_unable_to_work": 2,
  "unexpected_expense": 1000
}
```

Response includes projected balance, baseline risk, scenario risk, impact and recommendation.
