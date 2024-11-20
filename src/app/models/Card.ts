import mongoose, { Document, Schema } from 'mongoose'

export interface ICard extends Document {
	name: string;
	energy: string;
}

const cardSchema:Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	energy: {
		type: String,
		required: true,
	},
})

const Card =
	mongoose.models.Card || mongoose.model<ICard>('Card', cardSchema)

export default Card