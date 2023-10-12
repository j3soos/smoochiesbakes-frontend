import { NextResponse } from "next/server";

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function GET(request) {
  return NextResponse.json({ message: "hello world" }, { status: 200 });
}
