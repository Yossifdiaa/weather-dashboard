const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const weatherRoutes = require('./src/routes/weatherRoutes');

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

