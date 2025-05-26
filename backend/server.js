import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/users",async(req, res) => {// create user
    const {username} = req.body;
    if(!username){
        return res.status(400).json({
            success: false,
            message: "Username is required",
        });
    }
    try{
        const newUser = await User.create({username});
        res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

app.post("/api/posts",async(req, res) => {// create post
    const {title,body,author} = req.body;
    if(!title || !body || !author){
        return res.status(400).json({
            success: false,
            message: "Title, body and author are required"
        }); 
    }
    try{
        const newPost = await Post.create({title,body,author});
        res.status(201).json({
            success: true,
            data: newPost,
            message: "Post created successfully"
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

app.post ("/api/comments",async(req, res) => {// create comment
    const {text,post,author} = req.body;

    if(!text || !post || !author){
        return res.status(400).json({
            success: false,
            message: "Text, post and author are required"
        });
    }
    try{
          // Create the comment
        const newComment = await Comment.create({ text, post, author });

        // Push the comment ID into the related Post's comments array
        await Post.findByIdAndUpdate(post, {
            $push: { comments: newComment._id }
        });
        res.status(201).json({
            success: true,
            data: newComment,
            message: "Comment created successfully"
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldn't add comment"
        })
    }
});

app.get("/api/users",async(req,res)=>{// get all users
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
            message: "Users fetched successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldn't get all user"
        });
    }
});

app.get("/api/posts",async(req,res)=>{// get all posts
    try{
        const posts = await Post.find()
            .populate("author","username")
            .populate({
                path: "comments",
                populate: {
                    path: "author",
                    select: "username"
                },
            });
        res.status(200).json({
            success: true,
            data: posts,
            message: "Posts fetched successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});

app.get("/api/posts/:id", async (req, res) => {// get a get single post with all comments 
    const { id } = req.params;

    try {
        const post = await Post.findById(id)
            .populate("author", "username") 
            .populate({
                path: "comments",
                populate: {
                    path: "author",
                    select: "username"
                }
            });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: post,
            message: "Post fetched successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not fetch the post"
        });
    }
});

app.get("/api/comments", async (req, res) => {// get all comments
    try {
        const comments = await Comment.find()
            .populate("author", "username") // include author username
            .populate("post", "title");     // include post title

        res.status(200).json({
            success: true,
            data: comments,
            message: "All comments fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Couldn't fetch comments"
        });
    }
});

app.put("/api/posts/:id", async (req, res) => {// update post
    const { id } = req.params;
    const { title, body, author } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, body, author },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Post updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update post",
        });
    }
});

app.delete("/api/posts/:id", async (req, res) => { // delete post and comments
    const { id } = req.params;

    try {
        // Delete the post
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Delete all related comments
        await Comment.deleteMany({ post: id });

        res.status(200).json({
            success: true,
            message: "Post and related comments deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the post",
        });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server is online on port 5000");
});