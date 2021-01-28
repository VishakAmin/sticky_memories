import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import cors from 'cors';

const app = express();

dotenv.config()


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


app.use('/posts', postRoutes)
app.use('/user', userRoutes)


app.get('/', (req, res) => {
    res.send("Hello to Stick Memories API")
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server Running')))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false)

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))


}



