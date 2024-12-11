export interface CardType {
  _id: string;
  name: string;
  image: string;
  rarity: number;
  set: string;
  packs: { id: number; name: string }[];
  order: number;
  illustrator?: string;
  moves?: {
    damage: number;
    energy: string[];
    name: string;
    text?: string;
  }[];
  category: string;
  stage?: string;
  subcategory?: string;
  energy?: string;
  hp?: number;
  weakness?: {
    type: string;
    damage: number;
  };
  retreat?: number;
  exRule?: string;
  show: boolean;
}
