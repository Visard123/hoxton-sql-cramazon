import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const items: Prisma.ItemCreateInput[] = [
  {
    title: "bag",
    image: "img.jpg",
    price: 1.9,
  },
  {
    title: "chair",
    image: "img.jpg",
    price: 2.4,
  },
  {
    title: "flower",
    image: "img.jpg",
    price: 5.0,
  },
];

const users: Prisma.UserCreateInput[] = [
  {
    name: "loli",
    email: "loli@mail",

    orders: {
      create: [
        { item: { connect: { title: "flower" } }, quantity: 2 },
        { item: { connect: { title: "bag" } }, quantity: 1 },
      ],
    },
  },

  {
    name: "luli",
    email: "luli@mail",
    orders: {
      create: [{ item: { connect: { title: "bag" } }, quantity: 2 }],
    },
  },

  {
    name: "leli",
    email: "leli@mail",

    orders: {
      create: [
        { item: { connect: { title: "flower" } }, quantity: 2 },
        { item: { connect: { title: "bag" } }, quantity: 2 },
        { item: { connect: { title: "chair" } }, quantity: 2 },
      ],
    },
  },

  {
    name: "lili",
    email: "lili@mail",
    orders: {},
  },
];

async function createStuff() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  for (const item of items) {
    await prisma.item.create({ data: item });
  }
}
