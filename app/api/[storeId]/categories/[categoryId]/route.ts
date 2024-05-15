import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//GET BILLBOARD

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("CATEGORY ID IS REQUIRED", { status: 400 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET_ERROR]", error);
    return new NextResponse("FAILED TO GET CATEGORY", { status: 500 });
  }
}

//UPDATE BILLBOARD

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }
    if (!name) {
      return new NextResponse("NAME IS REQUIRED", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("BILLBOARD ID IS REQUIRED", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("CATEGORY ID IS REQUIRED", { status: 400 });
    }
    //CHECK THAT AUTHENTICATED USER OWNS THE STORE

    const storeByUser = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const category = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH_ERROR]", error);
    return new NextResponse("FAILED TO UPDATE CATEGORY", { status: 500 });
  }
}

//DELETE BILLBOARD

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("CATEGORY ID IS REQUIRED", { status: 400 });
    }
    //CHECK THAT AUTHENTICATED USER OWNS THE STORE

    const storeByUser = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE_ERROR]", error);
    return new NextResponse("FAILED TO DELETE CATEGORY", { status: 500 });
  }
}
