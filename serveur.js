<<<<<<< HEAD
const app=require("./backend/app");

app.listen(3000,()=>{
    console.log("serveur express port 3000 is running..");
    
});
=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
 
  //لTodo
const Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now } // ✅ هذا يضيف الوقت تلقائياً
}));


// Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
// Update todo
app.put('/todos/:id', async (req, res) => {
  const { completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed },
    { new: true } // يرجع الكائن بعد التحديث
  );
  res.json(todo);
});


// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
