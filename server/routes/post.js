import express from 'express';
import { getPosts, createPosts, updatePost, deletePost, likePost } from "../controllers/posts.js"
import auth from "../middleware/auth.js"
const router = express.Router();

//locahost:5000/post
router.get('/', getPosts)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost) //front
router.delete('/:id', auth, deletePost) //front
router.patch("/:id/likepost", auth, likePost)


export default router;
