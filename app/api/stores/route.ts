import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //DESTRUCTURING THE USER ID FROM THE AUTH FUNCTION
    const { userId } = auth();

    //GETTING THE BODY OF THE REQUEST
    const body = await req.json();

    const { name } = body;
    //CHECKING IF THE USER ID IS PRESENT OR NAME IS PRESENT
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    //CREATING A STORE

    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });
    //RETURNING THE STORE

    return NextResponse.json(store);
  } catch (error) {
    //CATCHING THE ERROR

    console.log("[STORE_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
