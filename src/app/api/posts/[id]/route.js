import { NextResponse } from "next/server";
import connectMongo from "@/utils/db";
import Post from "@/models/Post";
import mongoose from "mongoose";


export const GET = async (request, context) => {
  try {
    await connectMongo();

    // ✅ unwrap params safely
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ message: "No ID provided" }, { status: 400 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Failed to fetch post", error: error.message },
      { status: 500 }
    );
  }
};


export const DELETE = async (request, context) => {
  try {
    await connectMongo();

    // ✅ unwrap params safely
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Error deleting post", error: error.message },
      { status: 500 }
    );
  }
};
