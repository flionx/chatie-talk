# Chatie talk

A minimalistic web app for communicating with AI.  
Sending requests to [Openrouter.ai](https://openrouter.ai/), with the possibility of voice input using a microphone.

📍 [Live Preview](https://chatie-talk.vercel.app/)

## Features

- Inputting and sending Openrouter messages
- Displaying AI responses with markdown support
- Load indicator and error handling
- Voice input via Web Speech API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/flionx/chatie-talk.git
   ```
2. Go to the project folder:
   ```bash
   cd chatie-talk
   ```
3. Start the Frontend:
   ```bash
   cd client
   npm i
   npm run dev
   ```
[Create token](https://openrouter.ai/settings/keys) for Openrouter.ai 

4. Create an .env:
   ```bash
   cd ..
   touch api/local/.env
   ```
5.  Inside it set the variable:
   ```bash
   AI_TOKEN=yourToken
   ```

4. Start the Backend:
   ```bash
   cd api
   npm i
   npm run server
   ```

## 📸 Screenshots
![Image](https://github.com/user-attachments/assets/036cbe96-8369-47d1-aa40-3a6d690b2c66)
Main interface.

## Stack
- Frontend: React + Vite + TypeScript + React markdown
- Backend: Node.js + Express + TypeScript
- APIS: [Openrouter.ai](https://openrouter.ai/)

## License  

This project is distributed under the MIT license. See the [LICENSE](LICENSE). file for details.
