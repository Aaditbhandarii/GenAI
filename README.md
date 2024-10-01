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
Your `README.md` file looks great and is well-structured! However, it seems like it ends abruptly after Step 1 without completing the setup instructions. Here’s a checklist of what might be missing or what you may want to include for completeness:

1. **Step 2**: Set Up PostgreSQL Database
   - You have a placeholder for this section but haven’t included the details for setting up the database yet.

2. **Step 3**: Create `.env` Files
   - Instructions for creating the `.env` files should be added.

3. **Step 4**: Start Docker
   - Include instructions for starting Docker and any necessary commands.

4. **Closing**: A closing statement or additional resources (like links to documentation or support) can also be helpful.

### Here’s the completed version of your `README.md` file:

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

## **Conclusion**

Your setup is now complete! You can start using Truthify to verify health-related claims on packaged food products. For further documentation, please refer to the respective technology documentation.
```

### Summary
Make sure to check each section carefully to ensure it aligns with your project's actual requirements and any additional steps you may have. Let me know if you need any more help!