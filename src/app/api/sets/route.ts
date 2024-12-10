import dbConnect from '@/app/lib/dbConnect';
import Set from '@/app/models/Set';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  await dbConnect();

  try {
    const sets = await Set.find({});
    return NextResponse.json(sets);
  } catch (err: unknown) {
    return NextResponse.json({ error: err.message });
  }
}
