const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
                  useUnifiedTopology: true,
                      });
                          console.log(`MongoDB connected: ${conn.connection.host}`);
                            } catch (error) {
                                console.error(`Error: ${error.message}`);
                                    process.exit(1);
                                      }
                                      };

                                      connectDB();

                                      // Routes
                                      app.get('/api/health', (req, res) => {
                                        res.json({ message: 'Wereldbieren API is running!' });
                                        });

                                        // Product Routes (to be implemented)
                                        // app.use('/api/products', require('./routes/products'));

                                        // Error Handling Middleware
                                        app.use((err, req, res, next) => {
                                          console.error(err.stack);
                                            res.status(500).json({ error: 'Something went wrong!' });
                                            });

                                            // Start Server
                                            const PORT = process.env.PORT || 5000;
                                            app.listen(PORT, () => {
                                              console.log(`Server running on port ${PORT}`);
                                              });
                                              
