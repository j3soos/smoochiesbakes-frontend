import { NextRequest, NextResponse } from 'next/server';
import Product from '../models/product';


export async function GET() {
  try {
    const createdProduct = await Product.create({
      name: 'First Product',
      category: 'Pastries',
      price: 50,
    });

    return NextResponse.json({
      product: createdProduct,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: 'An error occurred',
        error: e,
      },
      {
        status: 400,
      }
    );
  }
}
