# Wereldbieren Webshop - Setup Guide

## 📦 Project Structure

```
werldbieren/
├── backend/          # Node.js/Express API
│   ├── package.json
│   └── .env.example
├── frontend/         # React UI
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Backend Setup

1. Navigate to backend folder:
   ```bash
      cd backend
         ```

         2. Install dependencies:
            ```bash
               npm install
                  ```

                  3. Create `.env` file from `.env.example`:
                     ```bash
                        cp .env.example .env
                           ```

                           4. Update `.env` with your settings (MongoDB URI, JWT secret, etc.)

                           5. Start the server:
                              ```bash
                                 npm run dev
                                    ```
                                       Server runs on `http://localhost:5000`

                                       ### Frontend Setup

                                       1. Navigate to frontend folder:
                                          ```bash
                                             cd frontend
                                                ```

                                                2. Install dependencies:
                                                   ```bash
                                                      npm install
                                                         ```

                                                         3. Start React dev server:
                                                            ```bash
                                                               npm start
                                                                  ```
                                                                     Frontend runs on `http://localhost:3000`

                                                                     ## 🛠️ Tech Stack

                                                                     - **Backend**: Node.js, Express, MongoDB
                                                                     - **Frontend**: React, React Router, Tailwind CSS
                                                                     - **Database**: MongoDB

                                                                     ## 📋 Features to Implement

                                                                     - [ ] Product catalog
                                                                     - [ ] Shopping cart
                                                                     - [ ] User authentication
                                                                     - [ ] Payment processing
                                                                     - [ ] Order management
                                                                     - [ ] Admin dashboard

                                                                     ## 🚢 Deployment

                                                                     - Backend: Heroku/Railway/Render
                                                                     - Frontend: Vercel/Netlify
                                                                     - Database: MongoDB Atlas

                                                                     ## 📞 Support

                                                                     Need help? Check individual README files in each folder.
                                                                     
