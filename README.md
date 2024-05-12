
# Expense Splitter Application

## Overview
The Expense Splitter is a web application that helps users manage and split expenses for events seamlessly. You can create events, add participants, and log expenses. The application then calculates and displays the debts of each participant, making it easy to see who owes what.

## Features
- **Create Events**: Organize your expenses by specific events.
- **Add Participants**: Include all individuals involved in the expenses.
- **Log Expenses**: Enter details of each expense for accurate tracking.
- **Debt Calculation**: Automatically calculates how much each participant owes or is owed.

## Prerequisites
Before you begin, ensure you have Docker installed on your system. If you do not have Docker installed, you can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Getting Started

### Download the Application
Clone the repository to your local machine using:
```bash
git clone [repository-url]
cd [repository-directory]
```

### Build the Containers
To set up the necessary Docker containers, run:
```bash
docker compose build
```

### Launch the Application
Start the application by running:
```bash
docker compose up
```

### Access the Application
Open your web browser and navigate to:
```
http://localhost:5000
```
Now, you can start using the Expense Splitter Application!

## Troubleshooting
If you encounter issues with Docker:
- Ensure Docker is running on your system.
- Check the Docker compose logs for errors.
- Rebuild the containers if there were updates to the Dockerfile or dependencies:
  ```bash
  docker compose up --build
  ```

## Contact
For support or queries, reach out to [contact-email].

Enjoy managing your expenses with ease!
