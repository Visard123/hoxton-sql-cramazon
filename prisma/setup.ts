import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const items = [
  {
    tite: "Bag",
    image: "img.jpg",
  },
  {
    tite: "chair",
    image: "img.jpg",
  },
  {
    tite: "flower",
    image: "img.jpg",
  },
];

const users = [
  {
    name: "loli",
    email: "loli@mail",
  },
  {
    name: "luli",
    email: "luli@mail",
  },
  {
    name: "leli",
    email: "leli@mail",
  },
  {
    name: "lili",
    email: "lili@mail",
  },
];

const orders = [
  {
    quantity: 1,
    userId: 2,
    itemId: 1,
  },
  {
    quantity: 2,
    userId: 1,
    itemId: 2,
  },
  {
    quantity: 1,
    userId: 1,
    itemId: 2,
  },
];

async function createStuff() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
