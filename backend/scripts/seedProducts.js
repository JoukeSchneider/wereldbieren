const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const seedProducts = [
  {
      name: 'Heineken',
          description: 'Crisp, clean lager from the Netherlands',
              price: 2.99,
                  country: 'Netherlands',
                      type: 'Lager',
                          abv: 5.0,
                              stock: 100,
                                  rating: 4.2,
                                    },
                                      {
                                          name: 'Guinness Draught',
                                              description: 'Dark, creamy stout with rich flavor',
                                                  price: 4.49,
                                                      country: 'Ireland',
                                                          type: 'Stout',
                                                              abv: 4.2,
                                                                  stock: 75,
                                                                      rating: 4.7,
                                                                        },
                                                                          {
                                                                              name: 'Corona Extra',
                                                                                  description: 'Light, crisp Mexican lager perfect for any occasion',
                                                                                      price: 2.49,
                                                                                          country: 'Mexico',
                                                                                              type: 'Lager',
                                                                                                  abv: 4.6,
                                                                                                      stock: 120,
                                                                                                          rating: 4.0,
                                                                                                            },
                                                                                                              {
                                                                                                                  name: 'Dogfish Head 90 Minute IPA',
                                                                                                                      description: 'Hoppy IPA with intense citrus and pine notes',
                                                                                                                          price: 5.99,
                                                                                                                              country: 'USA',
                                                                                                                                  type: 'IPA',
                                                                                                                                      abv: 9.0,
                                                                                                                                          stock: 50,
                                                                                                                                              rating: 4.6,
                                                                                                                                                },
                                                                                                                                                  {
                                                                                                                                                      name: 'Weihenstephaner Hefeweizen',
                                                                                                                                                          description: 'Traditional Bavarian wheat beer with banana and clove notes',
                                                                                                                                                              price: 4.99,
                                                                                                                                                                  country: 'Germany',
                                                                                                                                                                      type: 'Wheat',
                                                                                                                                                                          abv: 5.4,
                                                                                                                                                                              stock: 80,
                                                                                                                                                                                  rating: 4.8,
                                                                                                                                                                                    },
                                                                                                                                                                                    ];
                                                                                                                                                                                    
                                                                                                                                                                                    const connectDB = async () => {
                                                                                                                                                                                      try {
                                                                                                                                                                                          await mongoose.connect(process.env.MONGODB_URI, {
                                                                                                                                                                                                useNewUrlParser: true,
                                                                                                                                                                                                      useUnifiedTopology: true,
                                                                                                                                                                                                          });
                                                                                                                                                                                                              console.log('MongoDB connected!');
                                                                                                                                                                                                              
                                                                                                                                                                                                                  // Clear existing products
                                                                                                                                                                                                                      await Product.deleteMany({});
                                                                                                                                                                                                                          console.log('Cleared existing products');
                                                                                                                                                                                                                          
                                                                                                                                                                                                                              // Insert seed products
                                                                                                                                                                                                                                  const inserted = await Product.insertMany(seedProducts);
                                                                                                                                                                                                                                      console.log(`✓ Seeded ${inserted.length} products!`);
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                          process.exit(0);
                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                console.error(`Error: ${error.message}`);
                                                                                                                                                                                                                                                    process.exit(1);
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                      connectDB();
                                                                                                                                                                                                                                                      
