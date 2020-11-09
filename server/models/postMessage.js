import mongose from 'mongoose';

const postSchema = mongose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: 0
    },

});


const PostMessage = mongose.model('PostMessage', postSchema)

export default PostMessage;