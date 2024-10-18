import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ruleEngine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Rule Schema
const ruleSchema = new mongoose.Schema({
  ruleString: String,
});

const Rule = mongoose.model('Rule', ruleSchema);

// API Routes
app.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/rules', async (req, res) => {
  const rule = new Rule({
    ruleString: req.body.ruleString,
  });

  try {
    const newRule = await rule.save();
    res.status(201).json(newRule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});