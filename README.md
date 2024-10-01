<!-- ```markdown
# GenAI
**Truthify - Part of the ConsumeWise Initiative**

Truthify is a consumer-focused application that enhances transparency in packaged food products by verifying health-related claims. The project is part of the broader ConsumeWise initiative, helping users make informed, healthier choices by analyzing ingredients and claims made by food products.

## **Features**

- **Web Scraping**: Automatically retrieve a list of ingredients from the web using ZenRows and BeautifulSoup based on user input (product name).
- **Manual Input**: Users can manually enter the list of ingredients if scraping is not available.
- **Claim Verification**: The app verifies product claims like "boosts height" or "supports weight loss" by assessing the ingredients.
- **Verdict Generation**: A clear verdict is provided, indicating whether the product’s health claims are truthful or misleading.

## **Tech Stack**

- **Backend**: Flask API for managing requests, processing data, and running the claim verification logic.
- **Frontend**: Built using React.js and EJS for rendering pages like user searches and prediction results.
- **Web Scraping**: BeautifulSoup and ZenRows for fetching ingredient data from external sources.
- **Database**: PostgreSQL managed with pgAdmin 4 for storing products, users, and search logs.
- **Deployment**: Docker is used to manage the client and server-side services.

## **Prerequisites**

Before starting, ensure you have the following installed:

- Docker
- pgAdmin 4

## **Setup Instructions**

### **Step 1**: Clone the Repository

```bash
git clone https://github.com/Aaditbhandarii/GenAI.git
cd GenAI
```

### **Step 2**: Set Up PostgreSQL Database

1. Open **pgAdmin 4** and connect to your PostgreSQL server. 
2. Run the following SQL queries to create the necessary tables for the application:

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    product_brand VARCHAR(255),
    ingredients TEXT
);

CREATE TABLE user_searches (
    search_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    search_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id)
);

CREATE TABLE users( 
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255), 
    email VARCHAR(255), 
    password_hash TEXT 
);
```

### **Step 3**: Create `.env` Files

Make two `.env` files: one inside the `client` folder and the other inside the `server` folder with the following structure:

```
API_KEY=your_gemini_api_key
ZENROWS_KEY=your_zenrows_api_key
DB_PASSWORD=your_db_pass
DB_NAME=your_db_name
DB_USER=postgres
DB_HOST=host.docker.internal
DB_PORT=5432
SESSION_SECRET=your_secret
```

### **Step 4**: Start Docker

1. Start your Docker Desktop.
2. Run the following command in your CLI in the GenAI folder:

```bash
docker-compose up --build -->
Certainly! Here's a single markdown file that you can copy, paste, and push directly to your repository. This file combines all the information into a well-structured README.md:

```markdown
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
- pgAdmin 4

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Aaditbhandarii/GenAI.git
cd GenAI
```

### Step 2: Set Up PostgreSQL Database

1. Open **pgAdmin 4** and connect to your PostgreSQL server. 
2. Run the following SQL queries to create the necessary tables for the application:

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    product_brand VARCHAR(255),
    ingredients TEXT
);

CREATE TABLE user_searches (
    search_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    search_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id)
);

CREATE TABLE users( 
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255), 
    email VARCHAR(255), 
    password_hash TEXT 
);
```

### Step 3: Create .env Files

Create two `.env` files: one inside the `client` folder and the other inside the `server` folder with the following structure:

```
API_KEY=your_gemini_api_key
ZENROWS_KEY=your_zenrows_api_key
DB_PASSWORD=your_db_pass
DB_NAME=your_db_name
DB_USER=postgres
DB_HOST=host.docker.internal
DB_PORT=5432
SESSION_SECRET=your_secret
```

### Step 4: Start Docker

1. Start your Docker Desktop.
2. Run the following command in your CLI in the GenAI folder:

```bash
docker-compose up --build
```

This will start the application. You can now access Truthify through your web browser and begin verifying food product claims!

## Contributing

We welcome contributions to Truthify! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```

This README.md file is now ready to be copied and pasted into your repository. It provides a comprehensive overview of the project, setup instructions, and other important information for users and potential contributors. You can push this file directly to your repository, and it will render nicely on GitHub or other Git platforms.