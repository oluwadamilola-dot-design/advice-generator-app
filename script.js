// Store the API URL in a constant so it is never repeated
const API_URL = "https://api.adviceslip.com/advice";

// DOM Elements
const adviceIdSpan = document.getElementById("advice-id");
const adviceTextParagraph = document.getElementById("advice-text");
const diceButton = document.getElementById("dice-btn");

/**
 * Fetches random advice from the Advice Slip API and updates the UI
 */
async function getAdvice() {
  try {
    // 1. Loading State: Disable button & show feedback
    diceButton.disabled = true;
    adviceTextParagraph.textContent = "Loading new advice...";

    // 2. Fetch data (Note: fetch does not throw on 404/500 errors automatically)
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Data is nested under slip: { slip: { id: 117, advice: "..." } }
    renderAdvice(data.slip);

  } catch (error) {
    // Error State: Show user-friendly message (Test by going offline in DevTools)
    console.error("Failed to fetch advice:", error);
    adviceIdSpan.textContent = "ERROR";
    adviceTextParagraph.textContent = "Could not load advice. Please check your internet connection and try again.";
  } finally {
    // Always re-enable the button in the finally block so it never stays stuck
    diceButton.disabled = false;
  }
}

/**
 * Safely renders the advice ID and advice text to the DOM
 * @param {Object} slip - Object containing id and advice string
 */
function renderAdvice(slip) {
  // Render safely using textContent, never innerHTML
  adviceIdSpan.textContent = slip.id;
  adviceTextParagraph.textContent = `"${slip.advice}"`;
}

// Event Listener for the dice button click
diceButton.addEventListener("click", getAdvice);

// Fetch advice immediately on page load so the card is never empty
getAdvice();