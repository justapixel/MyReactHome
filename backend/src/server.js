const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
const server = http.Server(app);
const update = require('./controllers/UpdateAll');

update.connect(server);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
server.listen(3000);