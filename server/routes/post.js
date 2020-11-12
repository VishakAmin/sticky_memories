import express from 'express';
import { getPosts, createPosts, updatepost } from "../controllers/posts.js"

const router = express.Router();

//locahost:5000/post
router.get('/', getPosts)
router.post('/', createPosts)
router.patch('/:id', updatepost)




export default router;
