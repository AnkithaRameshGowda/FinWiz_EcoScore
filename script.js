// Function to load the score data from the JSON file
async function loadEcoScoreData() {
    try {
        // In a deployed environment, fetch the JSON file
        const response = await fetch('score_data.json');
        const data = await response.json();

        // Update the Score Section
        document.getElementById('ecoscore-value').innerText = data.score;
        
        // Update the Reward Section
        document.getElementById('reward-text').innerText = data.reward;

        // Update the Transactions List
        const txList = document.getElementById('tx-list');
        txList.innerHTML = ''; // Clear existing list

        data.transactions.forEach(tx => {
            const listItem = document.createElement('li');
            
            // Highlight high-impact spending visually for usability
            let merchantStyle = '';
            if (tx.mcc === '3001' || tx.mcc === '5814') {
                merchantStyle = 'style="color: #c0392b; font-weight: bold;"';
            }

            listItem.innerHTML = `
                <span ${merchantStyle}>${tx.merchant} (${tx.mcc})</span>
                <span class="tx-amount">$${tx.amount.toFixed(2)}</span>
            `;
            txList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error loading EcoScore data:", error);
        document.getElementById('ecoscore-value').innerText = 'N/A';
        document.getElementById('reward-text').innerText = 'Error loading data. Run Python script first.';
    }
}

// Execute the function when the page loads
loadEcoScoreData();