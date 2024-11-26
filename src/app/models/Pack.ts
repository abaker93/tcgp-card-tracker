import mongoose, { Document, Schema } from 'mongoose'

export interface IPack extends Document {
	name: string;
	energy: string;
}

const packSchema:Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
})

const Pack =
	mongoose.models.Pack || mongoose.model<IPack>('Pack', packSchema)

export default Pack