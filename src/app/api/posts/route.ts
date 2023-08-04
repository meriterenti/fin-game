import { NextResponse } from 'next/server';
import { posts } from './posts';

// request for api/posts
export async function GET(req: Request) {
  return NextResponse.json({ data: posts });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ data: body });
}
