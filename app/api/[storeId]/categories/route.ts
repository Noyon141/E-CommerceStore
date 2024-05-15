import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    //DESTRUCTURING THE USER ID FROM THE AUTH FUNCTION
    const { userId } = auth();

    //GETTING THE BODY OF THE REQUEST
    const body = await req.json();

    const { name, billboardId } = body;

    //CHECKING IF THE USER ID IS PRESENT OR NAME IS PRESENT
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    //CHECKING IF THE STORE BELONGS TO THE USER

    const storeByUser = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    //CREATING A BILLBOARD

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    //RETURNING THE STORE

    return NextResponse.json(category);
  } catch (error) {
    //CATCHING THE ERROR

    console.log("[CATEGORIES_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    //GETTING THE BILLBOARDS BY STORE ID
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    //GETTING THE BILLBOARDS BY STORE ID

    const categories = await db.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    //RETURNING THE STORE

    return NextResponse.json(categories);
  } catch (error) {
    //CATCHING THE ERROR

    console.log("[CATEGORIES_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
