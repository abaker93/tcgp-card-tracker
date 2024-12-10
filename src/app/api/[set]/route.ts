import dbConnect from '@/app/lib/dbConnect';
import Set from '@/app/models/Set';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ set: string }> },
) {
  const set = (await params).set;

  await dbConnect();

  try {
    const res = await Set.findOne(
      {
        id: { $regex: new RegExp(set, 'i') },
      },
      '_id name id cards uniqueCards',
    );
    return NextResponse.json(res);
  } catch (err: unknown) {
    return NextResponse.json({ error: err.message });
  }
}
