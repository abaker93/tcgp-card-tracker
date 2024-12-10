import dbConnect from '@/app/lib/dbConnect';
import Pack from '@/app/models/Pack';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  await dbConnect();

  try {
    const packs = await Pack.find({});
    return NextResponse.json(packs);
  } catch (err: unknown) {
    return NextResponse.json({ error: err.message });
  }
}
