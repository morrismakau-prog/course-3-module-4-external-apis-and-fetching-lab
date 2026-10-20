// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

document.getElementById('fetch-alerts').addEventListener('click', async (e) => {
    e.preventDefault();

    const stateInput = document.getElementById('state-input');
    const stateAbbr = stateInput.value.trim().toUpperCase();
    const alertsDisplay = document.getElementById('alerts-display');
    const errorContainer = document.getElementById('error-message');

    stateInput.value = '';

    try {
        const response = await fetch(`${weatherApi}${stateAbbr}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${stateAbbr}.`);
        }

        const data = await response.json();
        const alerts = data.features || [];

        errorContainer.classList.add('hidden');
        errorContainer.textContent = '';

        const apiTitle = data.title || `Current watches, warnings, and advisories for ${stateAbbr}`;
        alertsDisplay.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = `${apiTitle}: ${alerts.length}`;
        alertsDisplay.appendChild(title);

        if (alerts.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No active alerts for this area.';
            alertsDisplay.appendChild(message);
            return;
        }

        alerts.forEach((alert) => {
            const headline = alert.properties?.headline || 'Alert';
            const item = document.createElement('p');
            item.textContent = headline;
            alertsDisplay.appendChild(item);
        });
    } catch (error) {
        errorContainer.textContent = error.message;
        errorContainer.classList.remove('hidden');
        alertsDisplay.textContent = '';
    }
});



