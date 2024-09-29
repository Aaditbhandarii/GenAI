# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Install necessary build tools
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the server code and requirements.txt to the container
COPY . /app

# Copy the .env file from the current directory
COPY .env /app/.env

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["python", "server.py"]
