def make_recommendation(safe_to_spend, stress_probability, buffer, expected_shortfall):
    if stress_probability >= 70:
        return {
            "action": "POSTPONE",
            "title": "Protect your safety buffer",
            "message": "A financial shortfall is likely. Avoid new discretionary spending and preserve liquidity.",
        }
    if expected_shortfall > 0 and buffer > expected_shortfall:
        return {
            "action": "SAVE",
            "title": "Use your strong-income window",
            "message": f"Your buffer can absorb the projected shortfall. Consider moving a small amount into emergency savings.",
        }
    if safe_to_spend > 500:
        return {
            "action": "SPEND",
            "title": "Spending is within your safe range",
            "message": "Your projected cash flow currently supports moderate discretionary spending.",
        }
    return {
        "action": "SAVE",
        "title": "Keep a little more cash available",
        "message": "Your safe-to-spend amount is limited. Prioritize essential expenses and maintain your buffer.",
    }
