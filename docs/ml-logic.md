# ML logic

## 1. Forecasting

Prophet is trained separately on daily income and daily expense aggregates.

Input:

```text
ds = transaction date
y  = amount
```

The model predicts the next 7 days.

## 2. Volatility

A coefficient-of-variation-like signal is approximated using:

`population standard deviation / mean income`

This is normalized to 0–1.

## 3. Safety floor

Prototype rule:

```text
safety_floor =
max(
    emergency_buffer,
    50% of upcoming 7-day obligations,
    ₹1,000
)
```

This is intentionally a transparent hackathon rule rather than a production financial-policy decision.

## 4. Safe-to-spend

```text
safe_to_spend =
max(
    0,
    current_balance
    + predicted_income
    - predicted_expenses
    - upcoming_obligations
    - safety_floor
)
```

## 5. Stress probability

The prototype combines:

- income volatility
- projected balance relative to safety floor
- emergency-buffer coverage

The result is bounded between 5% and 95%.

## 6. Important production change

Do not use this prototype score as a real credit score. A production model would require:

- validated training data
- out-of-sample evaluation
- calibration
- fairness testing
- explainability
- drift monitoring
- privacy controls
- regulatory review
