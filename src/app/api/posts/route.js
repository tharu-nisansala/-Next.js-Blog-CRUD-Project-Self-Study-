import { NextResponse } from "next/server";
import connectMongo from "../../../utils/db.js";
import Post from "../../../models/Post.js";

export const GET = async (request) => {

  const url = new URL(request.url)
  
  const username= url.searchParams.get("username");
  try {
    await connectMongo();

    const posts = await Post.find(username && {username});
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
};



export const POST = async (request) => {

  const body = await request.json()
  
  const newPost= new Post(body);
  try {
    await connectMongo();

    await newPost.save()
    return new NextResponse("Post has been created", { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
};

