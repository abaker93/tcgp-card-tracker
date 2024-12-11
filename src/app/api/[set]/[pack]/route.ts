import dbConnect from '@/app/lib/dbConnect';
import Pack from '@/app/models/Pack';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ set: string; pack: string }> },
) {
  const set = (await params).set;
  const pack = (await params).pack;

  await dbConnect();

  try {
    const res = await Pack.findOne({
      id: { $regex: new RegExp(pack, 'i') },
      'set.id': { $regex: new RegExp(set, 'i') },
    });
    return NextResponse.json(res);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}
