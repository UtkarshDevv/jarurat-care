const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/healthcare_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Service schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

// Create Service model
const Service = mongoose.model('Service', serviceSchema);

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Service Management API endpoints
app.post('/services', async (req, res) => {
  const service = new Service(req.body);
  try {
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.send(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// PUT (Update) Service API endpoint
app.put('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).send('Service not found');
    res.send(service);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.patch('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).send('Service not found');
    res.send(service);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).send('Service not found');
    res.send(service);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));