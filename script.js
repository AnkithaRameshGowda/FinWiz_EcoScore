// Function to load the score data from the JSON file
async function loadEcoScoreData() {
    try {
        // In a deployed environment, fetch the JSON file
        const response = await fetch('score_data.json');
        const data = await response.json();

        // Update the Score Section
        // ADD THIS FUNCTION CALL INSTEAD:
        animateScore(data.score);

        // --- SCORE COUNT-UP ANIMATION ---
        function animateScore(finalScore) {
            const scoreElement = document.getElementById('ecoscore-value');
            let currentScore = 0;
            const duration = 1500; // Animation duration in milliseconds (1.5 seconds)
            const stepTime = Math.abs(Math.floor(duration / finalScore)); // Time per score increment
        
            const timer = setInterval(() => {
                currentScore += 1; // Increment by 1
                scoreElement.innerText = currentScore; // Update the displayed number
        
                if (currentScore >= finalScore) {
                    // Stop the animation once the final score is reached
                    clearInterval(timer);
                    scoreElement.innerText = finalScore; // Ensure it settles on the exact number
                }
            }, stepTime);
        }
        
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
                <span class="tx-amount">₹ ${tx.amount.toFixed(2)}</span> 
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

//enhance
// --- SCROLL-TRIGGERED ANIMATION LOGIC (The Magic) ---

// 1. Get all elements we want to animate
const detailCards = document.querySelectorAll('.detail-card');

// 2. Function to check if an element is in view
function checkVisibility() {
    // Loop through each detail card
    detailCards.forEach(card => {
        // Find the position of the element relative to the viewport
        const cardTop = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        // If the top of the card is less than 85% of the screen height (meaning it's visible)
        if (cardTop < screenHeight * 0.85) {
            // Apply the 'is-visible' class to trigger the CSS transition
            card.classList.add('is-visible');
        }
    });
}

// 3. Attach the function to the scroll event
window.addEventListener('scroll', checkVisibility);

// 4. Run once on page load to check if elements are already visible
checkVisibility();



