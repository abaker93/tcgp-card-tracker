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
			"sets.code": { $regex: new RegExp(set, "i") }
		})
		console.log(set)
		return NextResponse.json(cards)
	} catch (err: any) {
		return NextResponse.json({ error: err.message })
	}
}