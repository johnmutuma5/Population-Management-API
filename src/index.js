import http from 'http';
import app from './app';

const server = http.createServer(app);
const PORT = 3000; // TODO set this as an enviroment variable

server.listen(PORT, () => {
  console.log(`Server listenning on http://localhost:${PORT}`);
});
