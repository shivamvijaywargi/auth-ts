import app from './app';

const PORT = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  res.send('Hello from server');
});

app.listen(PORT, () => {
  console.log(`App is listenng at http://localhost:${PORT}`);
});
