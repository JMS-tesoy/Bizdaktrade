import { type NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import type { ApiResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  const { email, password, plan } = await request.json();

  if (!email || !password || !plan) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Email, password, and plan are required",
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    client.close();
    const response: ApiResponse<null> = {
      success: false,
      error: "User already exists with this email.",
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response, { status: 422 });
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    plan: plan,
  });

  client.close();

  const response: ApiResponse<{ userId: string; email: string }> = {
    success: true,
    data: {
      userId: result.insertedId.toString(),
      email: email,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 201 });
}
