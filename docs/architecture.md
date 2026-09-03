# Architecture

## Data flow

1. Mock Account Aggregator supplies synthetic transaction history.
2. Mock gig-platform adapter supplies gig earnings.
3. FastAPI normalizes data.
4. Prophet forecasts short-term income/expense series.
5. Financial engine calculates:
   - projected income
   - projected expenses
   - upcoming obligations
   - safety floor
   - safe-to-spend
   - stress probability
   - resilience score
6. Recommendation engine selects SAVE / SPEND / POSTPONE.
7. React dashboard visualizes the result.
8. React Context stores What-if parameters and scenario result.

## Production evolution

Replace mock adapters with authorized, consent-driven integrations. Keep the intelligence engine provider-agnostic so a bank, AA, or gig platform can be swapped without rewriting the dashboard.
