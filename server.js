const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./src/controllers/contactController.js');
const jobRoutes = require('./src/controllers/jobController.js');
const challengeRoutes = require('./src/controllers/challengeController.js');

require('dotenv').config();

const app = express();

const corsOptions = {
  origin: ['https://www.laboratorio.softhard.it.ao', 'https://seu-dominio-firebase.web.app'], 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);


app.use('/api/contact', contactRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/challenge', challengeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
