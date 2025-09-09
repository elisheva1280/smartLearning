import connectDB from './db';

const startServer = async () => {
    await connectDB();
    console.log('Server started successfully');
};

startServer();

