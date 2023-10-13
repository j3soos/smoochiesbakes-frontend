import { NextResponse } from "next/server";
import Product from "@/app/models/product";
/**
 *
 * @param {Request} request
 * @returns
 *
 */

// Create Product
export async function POST(request) {
  const req = new NextRequest(request);

  // check if the request is empty, this will throw an error
  const jsonreq = await req.json().catch((e) => {});

  console.log("An error occured nigga");

  // if request isn't empty, continue
  if (!jsonreq) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 }); //400 is bad_request
  } else {
    // create product
    const { name, price, category } = jsonreq;
    if (!name || !price || !category) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 }); //400 is bad_request
    } else {
      try {
        const createdProduct = await Product.create({
          name: name,
          price: price,
          category: category,
        });
        return NextResponse.json({createdProduct,message:"Product Created Successfully"},{status:200})
      } catch (e) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 }); //400 is bad_request
      }
    }
  }
}
