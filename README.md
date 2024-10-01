# GenAI
**Truthify - Part of the ConsumeWise Initiative**

Truthify is a consumer-focused application that enhances transparency in packaged food products by verifying health-related claims. The project is part of the broader ConsumeWise initiative, helping users make informed, healthier choices by analyzing ingredients and claims made by food products.

__Features__

Web Scraping: Automatically retrieve a list of ingredients from the web using ZenRows and BeautifulSoup based on user input (product name).
Manual Input: Users can manually enter the list of ingredients if scraping is not available.
Claim Verification: The app verifies product claims like "boosts height" or "supports weight loss" by assessing the ingredients.

Verdict Generation: A clear verdict is provided, indicating whether the product’s health claims are truthful or misleading.

__Tech Stack__
Backend: Flask API for managing requests, processing data, and running the claim verification logic.
Frontend: Built using React.js and EJS for rendering pages like user searches and prediction results.
Web Scraping: BeautifulSoup and ZenRows for fetching ingredient data from external sources.
Database: PostgreSQL managed with pgAdmin 4 for storing products, users, and search logs.
Deployment: Docker is used to manage the client and server-side services.

__Prerequisites__
Before starting, ensure you have the following installed:
Docker
pgAdmin 4
