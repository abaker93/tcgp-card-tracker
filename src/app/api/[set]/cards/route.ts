import dbConnect from "@/app/lib/dbConnect"
import Card from "@/app/models/Card"
import { NextResponse } from "next/server"

export async function GET(
	request: Request,
	{ params }: { params: Promise <{ set: string }> }
) {
	const set = (await params).set

	await dbConnect()

	try {
		const cards = await Card.find({
			"set": { $regex: new RegExp(set, "i") },
			"show": true
		})
		return NextResponse.json(cards)
	} catch (err: any) {
		return NextResponse.json({ error: err.message })
	}
}