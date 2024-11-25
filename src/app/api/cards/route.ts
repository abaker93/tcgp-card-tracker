import dbConnect from "@/app/lib/dbConnect"
import Card from "@/app/models/Card"
import { NextResponse } from "next/server"

export const dynamic = 'force-static'

export async function GET() {
	await dbConnect()

	try {
		const cards = await Card.find({})
		return NextResponse.json(cards)
	} catch (err: any) {
		return NextResponse.json({ error: err.message })
	}
}