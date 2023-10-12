import { NextRequest, NextResponse } from "next/server";

/**
 *@param {NextRequest} request
 * @param {NextResponse} response
 * @returns
 */

export async function GET(request) {
  console.log(request);
  //   const req = new NextRequest(request);
  //   const jsonreq = await req.json().catch((e)=>{console.log(e)})
  //   console.log("hi");
  return NextResponse.json({message:'created'},{status:201})
}

// sample function to perform post req
export async function POST(request) {
  const req = new NextRequest(request);
  const jsonreq = await req.json();
  console.log(`its coming here wai, ${jsonreq}`);
  return NextResponse.json({ result: jsonreq });
}
