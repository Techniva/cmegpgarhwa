// src/app/api/loan/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ use singleton
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ reuse NextAuth config

export async function POST(req: NextRequest) {
  try {
    // ✅ Ensure user is logged in
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // ✅ Basic validation (example: required fields from your schema)
    if (!data.applicantName || !data.aadhar || !data.panCard) {
      return NextResponse.json(
        { error: "Missing required applicant fields" },
        { status: 400 }
      );
    }

    // ✅ Duplicate check (normalize values)
    const existing = await prisma.applicant.findFirst({
      where: {
        OR: [
          { aadhar: data.aadhar.trim() },
          { panCard: data.panCard.trim() },
        ],
      },
    });

    // ✅ Save applicant with required + session fields
    const savedApplicant = await prisma.applicant.create({
      data: {
        ...data,
        aadhar: data.aadhar.trim(),
        panCard: data.panCard.trim(),
        duplicate: !!existing, // mark as duplicate if found
        remarks: data.remarks || null,
        createdByUserId: parseInt(session.user.id, 10), // tie to logged-in user
      },
    });

    return NextResponse.json(
      { id: savedApplicant.id, duplicate: savedApplicant.duplicate },
      { status: 201 }
    );
  } catch (error) {
    //console.error("Error saving applicant:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save applicant data" },
      { status: 500 }
    );
  }
}
