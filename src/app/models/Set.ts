import mongoose, { Document, Schema } from 'mongoose'

export interface ISet extends Document {
	name: string;
	energy: string;
}

const setSchema:Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
})

const Set =
	mongoose.models.Set || mongoose.model<ISet>('Set', setSchema)

export default Set