export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Velvet Lounge Chair",
    category: "Seating",
    price: 599.99,
    image: "/sample_img/cosmetic-male.jpg",
    description: "A sumptuous velvet lounge chair designed for comfort and style. Available in sage, cream, and midnight blue.",
    featured: true,
  },
  {
    id: "2",
    name: "Marble Coffee Table",
    category: "Furniture",
    price: 1249.99,
    image: "/sample_img/beauty-1.jpg",
    description: "White marble top with solid brass-finished legs. A statement piece for the modern living room.",
    featured: true,
  },
  {
    id: "3",
    name: "Zenith Floor Lamp",
    category: "Lighting",
    price: 329.61,
    image: "/sample_img/beauty-2.jpg",
    description: "Architectural floor lamp with an adjustable arm and warm diffused glow. Matte black finish.",
    featured: true,
  },
  {
    id: "4",
    name: "Oak Dining Set",
    category: "Furniture",
    price: 2499.99,
    image: "/sample_img/natural-selfcare.jpg",
    description: "Solid white oak dining table and four matching chairs. Seats up to six comfortably.",
    featured: true,
  },
  {
    id: "5",
    name: "Linen Throw Pillow",
    category: "Decor",
    price: 89.00,
    image: "/sample_img/toilet-bag.jpg",
    description: "Belgian linen throw pillow with feather insert. Covers are removable and machine washable.",
  },
  {
    id: "6",
    name: "Gold Leaf Mirror",
    category: "Decor",
    price: 450.00,
    image: "/sample_img/still-life-1.jpg",
    description: "Arched full-length mirror with a hand-applied gold leaf frame. Lean or wall-mount.",
  },
  {
    id: "7",
    name: "Modern Pendant Light",
    category: "Lighting",
    price: 195.00,
    image: "/sample_img/still-life-2.jpg",
    description: "Spun-aluminum pendant with a textured interior for warm, diffused light.",
  },
  {
    id: "8",
    name: "Hand-Woven Rattan Chair",
    category: "Seating",
    price: 749.00,
    image: "/sample_img/selfcare-arrangement.jpg",
    description: "Hand-woven natural rattan with a solid teak frame. Indoor/outdoor use.",
  },
  {
    id: "9",
    name: "Matte Black Sconce",
    category: "Lighting",
    price: 165.00,
    image: "/sample_img/cosmetic-male.jpg",
    description: "Minimalist wall sconce in a powder-coated matte black finish. Hardwired installation.",
  },
  {
    id: "10",
    name: "Brass Plant Stand",
    category: "Decor",
    price: 225.00,
    image: "/sample_img/beauty-1.jpg",
    description: "Tiered brass plant stand with adjustable shelf heights. Holds up to 3 medium planters.",
  },
  {
    id: "11",
    name: "Ceramic Minimalist Vase",
    category: "Decor",
    price: 145.00,
    image: "/sample_img/natural-selfcare.jpg",
    description: "Hand-thrown stoneware vase with a speckled matte glaze. Each piece is unique.",
  },
  {
    id: "12",
    name: "Lumina Oak Dining Table",
    category: "Furniture",
    price: 3200.00,
    image: "/sample_img/still-life-2.jpg",
    description: "Our signature dining table in solid white oak with a live edge and hairpin legs.",
  },
];

export const categories = ["All", "Furniture", "Seating", "Lighting", "Decor"];
