import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import searchRoutes from './routes/searchRoutes.js';
dotenv.config();
// ...

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));
app.use('/api/projects',projectRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comments', commentRoutes); // added
app.use('/api/search', searchRoutes);


// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
