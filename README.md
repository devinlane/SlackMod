# SlackMod

## Description

Inject custom css / javascript to Slack app !

The process includes a Python script, `src/main.py`, which injects `src/injected-script.ts` into the Slack app.

## Building the Application

### Prerequisites

Before building the application, ensure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [Python 3](https://www.python.org/downloads/)

### Steps

Follow the steps below to build the application:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/AirOne-dev/SlackMod.git
    cd SlackMod
    ```

2. **Install Node.js dependencies**:

    ```bash
    npm i
    ```

3. **Install Python dependencies**:

    ```bash
    pip3 install -r requirements.txt
    ```

    or

    ```bash
    python3 -m pip3 install -r requirements.txt
    ```

4. **Run the app**:

    ```bash
    npm run dev
    ```

    or

    ```bash
    python3 src/main.py
    ```

5. **Dev - Run the app with file change watcher**:

    ```bash
    npm run dev-watch
    ```

    When you update `src/injected-script.ts`, it will restart Slack for you

6. **Build the app**:

    MacOS only : `npm run build`, build SlackMod.app in `dist` folder
