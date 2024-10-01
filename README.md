<!-- # GenAI
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


__Prerequisites__
Before starting, ensure you have the following installed:
Docker
pgAdmin 4

__Setup Instructions__:

__Step 1__: Clone the Repository:

git clone https://github.com/Aaditbhandarii/GenAI.git

cd GenAI

__Step 2__: Set Up PostgreSQL Database

Open pgAdmin 4 and connect to your PostgreSQL server. Run the following SQL queries to create the necessary tables for the application

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

__Step 3__: Make 2 .env files one inside client folder, other inside server with the following structure 

API_KEY=your_gemini_api_key

ZENROWS_KEY=your_zenrows_api_key

DB_PASSWORD=your_db_pass

DB_NAME=your_db_name

DB_USER=postgres

DB_HOST=host.docker.internal

DB_PORT=5432

SESSION_SECRET=your_secret

__Step 4__: Start your Docker Desktop and run the following command in your CLI in the GenAI folder

docker-compose up --build 









Here’s the complete Markdown content for your README file, ready for you to copy and paste: -->

```markdown
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
docker-compose up --build
```
```