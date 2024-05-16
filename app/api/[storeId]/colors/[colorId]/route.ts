import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//GET COLOR

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("COLOR ID IS REQUIRED", { status: 400 });
    }

    const color = await db.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET_ERROR]", error);
    return new NextResponse("FAILED TO GET COLOR", { status: 500 });
  }
}

//UPDATE COLOR

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("COLOR ID IS REQUIRED", { status: 400 });
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
    const color = await db.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH_ERROR]", error);
    return new NextResponse("FAILED TO UPDATE COLOR", { status: 500 });
  }
}

//DELETE COLOR

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("COLOR ID IS REQUIRED", { status: 400 });
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

    const color = await db.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE_ERROR]", error);
    return new NextResponse("FAILED TO DELETE COLOR", { status: 500 });
  }
}
