# Database schema

## users

| Column | Type | Purpose |
|---|---|---|
| id | integer PK | User identifier |
| name | string | Display name |
| occupation | string | Worker type |
| current_balance | float | Current demo balance |
| emergency_buffer | float | Current emergency reserve |
| created_at | datetime | Record creation time |

## transactions

| Column | Type | Purpose |
|---|---|---|
| id | integer PK | Transaction identifier |
| user_id | integer | User |
| txn_date | date | Transaction date |
| amount | float | Transaction amount |
| transaction_type | string | income / expense |
| category | string | Categorized transaction |
| source | string | AA / gig platform |

## obligations

| Column | Type | Purpose |
|---|---|---|
| id | integer PK | Obligation identifier |
| user_id | integer | User |
| due_date | date | Due date |
| amount | float | Amount due |
| category | string | Obligation category |
| essential | integer | 1 = essential |
