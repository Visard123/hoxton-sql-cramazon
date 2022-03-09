import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    name: "loli",
    email: "loli@mail",
    items: {
      create: [
        {
          title: "bag",
          image: "img.jpg",
        },
      ],
    },
  },
  {
    name: "luli",
    email: "luli@mail",
    create: [
      {
        title: "chair",
        image: "img.jpg",
      },
    ],
  },
  {
    name: "leli",
    email: "leli@mail",
  },
  {
    name: "lili",
    email: "lili@mail",
    create: [
      {
        title: "ring",
        image: "img.jpg",
      },
    ],
  },
];

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
