import app from './app';
import connectToDB from './configs/dbConn';

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  // Connecting to Database
  await connectToDB();
  console.log(`App is listenng at http://localhost:${PORT}`);
});
