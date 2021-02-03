import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import cors from 'cors';

// const app = express();

// dotenv.config()

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization');
//     next();

// });

// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

// app.use(cors())


// app.use('/posts', postRoutes)
// app.use('/user', userRoutes)


// app.get('/', (req, res) => {
//     res.send("Hello to Stick Memories API")
// })

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(PORT, () => console.log('Server Running')))
//     .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false)

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('client/build'))


//}

// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import postRoutes from './routes/posts.js';
// import userRouter from './routes/user.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const CONNECTION_URL = "mongodb+srv://vishak:Vishak@123@cluster0.7vudp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

