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

    const { label, imageUrl } = body;

    //CHECKING IF THE USER ID IS PRESENT OR NAME IS PRESENT
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
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

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    //RETURNING THE STORE

    return NextResponse.json(billboard);
  } catch (error) {
    //CATCHING THE ERROR

    console.log("[BILLBOARDS_POST_ERROR]", error);
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

    const billboards = await db.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    //RETURNING THE STORE

    return NextResponse.json(billboards);
  } catch (error) {
    //CATCHING THE ERROR

    console.log("[BILLBOARDS_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
