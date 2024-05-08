import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//GET BILLBOARD

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("BILLBOARD ID IS REQUIRED", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET_ERROR]", error);
    return new NextResponse("FAILED TO GET BILLBOARD", { status: 500 });
  }
}

//UPDATE BILLBOARD

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label IS REQUIRED", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL IS REQUIRED", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("BILLBOARD ID IS REQUIRED", { status: 400 });
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
    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH_ERROR]", error);
    return new NextResponse("FAILED TO UPDATE BILLBOARD", { status: 500 });
  }
}

//DELETE BILLBOARD

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("BILLBOARD ID IS REQUIRED", { status: 400 });
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

    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE_ERROR]", error);
    return new NextResponse("FAILED TO DELETE BILLBOARD", { status: 500 });
  }
}
