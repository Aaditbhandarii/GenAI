# GenAI - Truthify

## Part of the ConsumeWise Initiative

Truthify is a consumer-focused application that enhances transparency in packaged food products by verifying health-related claims. The project is part of the broader ConsumeWise initiative, helping users make informed, healthier choices by analyzing ingredients and claims made by food products.

## Features

- **Web Scraping**: Automatically retrieve a list of ingredients from the web using ZenRows and BeautifulSoup based on user input (product name).
- **Manual Input**: Users can manually enter the list of ingredients if scraping is not available.
- **Claim Verification**: The app verifies product claims like "boosts height" or "supports weight loss" by assessing the ingredients.
- **Verdict Generation**: A clear verdict is provided, indicating whether the product's health claims are truthful or misleading.

## Tech Stack

- **Backend**: Flask API for managing requests, processing data, and running the claim verification logic.
- **Frontend**: Built using React.js and EJS for rendering pages like user searches and prediction results.
- **Web Scraping**: BeautifulSoup and ZenRows for fetching ingredient data from external sources.
- **Database**: PostgreSQL managed with pgAdmin 4 for storing products, users, and search logs.
- **Deployment**: Docker is used to manage the client and server-side services.

## Prerequisites

Before starting, ensure you have the following installed:

- Docker

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Aaditbhandarii/GenAI.git
cd GenAI
```

### Step 2: Create .env Files

Create two `.env` files: one inside the `client` folder and the other inside the `server` folder with the following structure:

```
API_KEY=your_gemini_key
ZENROWS_KEY=your_zenrows_free_apikey
DB_PASSWORD=AVNS_NeifNSNJ3dNgEjgB3Om
DB_NAME=defaultdb
DB_USER=avnadmin
DB_HOST=google-genai-google-genai.k.aivencloud.com
DB_PORT=15811
SESSION_SECRET=secret
DB_SSL=true
```

### Step 3: Start Docker

1. Start your Docker Desktop.
2. Run the following command in your CLI in the GenAI folder:

```bash
docker-compose up --build
```

This will start the application. You can now access Truthify through your web browser and begin verifying food product claims!

## Contributing

We welcome contributions to Truthify! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

