import dbConnect from '@/app/lib/dbConnect';
import Rarity from '@/app/models/Rarity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  await dbConnect();

  try {
    const rarities = await Rarity.find({});
    return NextResponse.json(rarities);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}
