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

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    // console.log(newPost);
    try {

        await newPost.save()
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);


}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");
    await PostMessage.findByIdAndRemove(id);
    console.log("DELETE");
    res.json({ message: 'Post Deleted Succesfully' });
}


export const likePost = async (req, res) => {
    const { id } = req.params;
    // console.log(req.userId);
    if (!req.userId) {
        return res.json({ message: "Unauthenicated" })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");

    const post = await PostMessage.findById(id);
    //new
    const index = post.likes.findIndex((id) => id === String(req.userId));
    // console.log(index);
    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    //console.log("ASASAS", post.likes);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost);



}