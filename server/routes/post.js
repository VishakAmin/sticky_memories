import express from 'express';
import { getPosts, createPosts } from "../controllers/posts.js"

const router = express.Router();

//locahost:5000/post
router.get('/', getPosts)
router.post('/', createPosts)




export default router;
