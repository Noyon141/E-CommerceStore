import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//GET SIZE

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("SIZE ID IS REQUIRED", { status: 400 });
    }

    const size = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET_ERROR]", error);
    return new NextResponse("FAILED TO GET SIZE", { status: 500 });
  }
}

//UPDATE SIZE

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }
    if (!name) {
      return new NextResponse("NAME IS REQUIRED", { status: 400 });
    }
    if (!value) {
      return new NextResponse("VALUE IS REQUIRED", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("SIZE ID IS REQUIRED", { status: 400 });
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
    const size = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH_ERROR]", error);
    return new NextResponse("FAILED TO UPDATE SIZE", { status: 500 });
  }
}

//DELETE SIZE

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("SIZE ID IS REQUIRED", { status: 400 });
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

    const size = await db.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE_ERROR]", error);
    return new NextResponse("FAILED TO DELETE SIZE", { status: 500 });
  }
}
