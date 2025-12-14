import { ARTICLES_PER_PAGE } from "@/utils/constants";
import { mockArticles } from "@/utils/mocks";
import { prisma } from "@/lib/prisma";
import { Article } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
/**
 *  @method  GET
 *  @route   ~/api/articles
 *  @desc    Get Articles By Page Number
 *  @access  public
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const articles = await prisma.article.findMany({
      skip: ARTICLES_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLES_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method  POST
 *  @route   ~/api/articles
 *  @desc    Create New Article
 *  @access  private (only admin can create article)
 */

export async function POST(req: Request) {
  try {
    const { title, body, authorEmail, authorId, createAuthor } =
      await req.json();

    if (!title)
      return NextResponse.json(
        { message: "title is required" },
        { status: 400 }
      );

    // إذا مررت authorId نربط مباشرة
    if (authorId) {
      const user = await prisma.user.findUnique({ where: { id: authorId } });
      if (!user)
        return NextResponse.json(
          { message: "Author not found" },
          { status: 404 }
        );
      const article = await prisma.article.create({
        data: { title, body, authorId },
      });
      return NextResponse.json(article, { status: 201 });
    }

    // إذا مررت authorEmail نحاول الربط أو نستخدم connectOrCreate
    if (authorEmail) {
      const article = await prisma.article.create({
        data: {
          title,
          body,
          author: {
            connectOrCreate: {
              where: { email: authorEmail },
              create: {
                email: authorEmail,
                name: createAuthor?.name ?? null,
                password: createAuthor
                  ? await bcrypt.hash(createAuthor.password, 10)
                  : "temp_hashed",
              },
            },
          },
        },
      });
      return NextResponse.json(article, { status: 201 });
    }

    // إذا لا author info → رفض أو إنشاء بدون مؤلف حسب تصميمك
    return NextResponse.json(
      { message: "authorId or authorEmail is required" },
      { status: 400 }
    );
  } catch (err: any) {
    // معالجة أخطاء Prisma المعروفة
    if (err?.code === "P2025") {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }
    if (err?.code === "P2003") {
      return NextResponse.json(
        { message: "Invalid authorId" },
        { status: 400 }
      );
    }
    console.error(err);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
