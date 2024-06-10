const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./Routes/userRouts');
const adminRouter = require('./Routes/adminRoutes');

dotenv.config();
const app = express();

const port = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req,res)=>{
    res.send(`Hello World!`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});