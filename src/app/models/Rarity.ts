import mongoose, { Document, Schema } from 'mongoose';

export interface IRarity extends Document {
  name: string;
  order: number;
}

const raritySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Rarity =
  mongoose.models.Rarity || mongoose.model<IRarity>('Rarity', raritySchema);

export default Rarity;
