// src/app/api/applicants/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    // ✅ Get logged-in session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id as string, 10);
    const role = session.user.role as "admin" | "employee";

    // ✅ Admins see all, employees see only their own applicants
    const applicants = await prisma.applicant.findMany({
      where: role === "employee" ? { createdByUserId: userId } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json(applicants, { status: 200 });
  } catch (error) {
    //console.error("Error fetching applicants:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to fetch applicants" }, { status: 500 });
  }
}
