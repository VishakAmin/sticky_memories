import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';


export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {

        await newPost.save()
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
}


export const updatepost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost)


}