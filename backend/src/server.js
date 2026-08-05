import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT ;


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`[Server] Boot failure: ${error.message}`);
    process.exit(1);
  }
};

startServer();
