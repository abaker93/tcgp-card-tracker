import dbConnect from '@/app/lib/dbConnect';
import Card from '@/app/models/Card';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ set: string; id: number }> },
) {
  const set = (await params).set;
  const id = (await params).id;

  await dbConnect();

  try {
    const cards = await Card.findOne({
      set: { $regex: new RegExp(set, 'i') },
      order: parseInt(id.toString()),
    });
    return NextResponse.json(cards);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}
