import json
import os

# --- 1. SIMULATED DATA ---
# Sample transaction data with Merchant Category Codes (MCC)
transactions = [
  {"merchant": "GreenEnergy Co.", "amount": 120.50, "mcc": "4900"},
  {"merchant": "Local Farmers Market", "amount": 45.75, "mcc": "5499"},
  {"merchant": "MegaBurger Chain", "amount": 25.00, "mcc": "5814"},
  {"merchant": "City Metro Pass", "amount": 15.00, "mcc": "4111"},
  {"merchant": "Interstate Airlines", "amount": 450.00, "mcc": "3001"},
  {"merchant": "Local Groceries", "amount": 80.00, "mcc": "5411"},
]

# Carbon Impact Index (Lower number = Lower Carbon Footprint = Better for score)
# This mapping proves the idea's technical feasibility (Code Marks)
carbon_index = {
  "4900": 1,  # Utilities (Assumed Green Energy)
  "5499": 2,  # Misc. Food (Local/Sustainable)
  "4111": 3,  # Public Transport
  "5411": 4,  # Standard Groceries
  "5814": 8,  # Fast Food / High Impact
  "3001": 10 # Airlines / Highest Impact
}

# --- 2. THE CALCULATION ENGINE ---
def calculate_ecoscore(tx_list, index):
  total_impact = 0
  total_spend = 0
  
  for tx in tx_list:
    mcc = tx["mcc"]
    amount = tx["amount"]
    impact_multiplier = index.get(mcc, 5) # Default impact is 5
    
    total_impact += amount * impact_multiplier
    total_spend += amount

  if total_spend == 0:
    return 0, "No transactions recorded."
    
  # Formula: Average Impact = Total Weighted Impact / Total Spend
  average_impact = total_impact / total_spend
  
  # EcoScore: 100 - (Average Impact * Scaling Factor)
  # A lower average impact results in a higher score.
  ecoscore = max(0, 100 - (average_impact * 8)) # Scaling factor is 8
  
  return int(ecoscore)

# --- 3. DETERMINE REWARDS & FINAL OUTPUT ---
final_score = calculate_ecoscore(transactions, carbon_index)

if final_score >= 80:
  reward_text = "✨ Tier 1 Reward: 0.75% Rate Reduction on Green Loans!"
elif final_score >= 65:
  reward_text = "💚 Tier 2 Reward: 5% Cashback at Certified Sustainable Vendors."
else:
  reward_text = "📈 Keep Improving: Focus on reducing travel and food impact to climb tiers."

# Prepare data for the frontend dashboard
output_data = {
    "score": final_score,
    "reward": reward_text,
    "transactions": transactions, # Pass data to display in the UI
}

# --- 4. EXPORT TO JSON FILE ---
output_file = 'score_data.json'
with open(output_file, 'w') as f:
  json.dump(output_data, f, indent=4)

print(f"EcoScore calculated: {final_score}")
print(f"Data saved to {output_file} for dashboard.")