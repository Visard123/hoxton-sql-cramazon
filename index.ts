import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();
const PORT = 4000;

app.get("/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.send(items);
});

app.get("/items/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const item = await prisma.item.findUnique({
      where: { title: title },
      include: {
        orders: {
          // include: { item: true } // CAN'T USER BOTH AT THE SAME TIME!
          select: { user: true },
        },
      },
    });

    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ error: "Item not found." });
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/items", async (req, res) => {
  const { title, image, price } = req.body;

  try {
    const newItem = await prisma.item.create({
      data: { title, image, price },
    });

    res.send(newItem);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { orders: { include: { item: true } } },
  });
  res.send(users);
});

app.get("/users/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        orders: {
          include: { item: true },
        },
      },
    });

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found." });
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.patch("/users/:email", async (req, res) => {
  const email = req.params.email;

  const userFound = await prisma.user.findFirst({
    where: { email: email },
  });
  if (userFound) {
    const { newName = userFound.name, newEmail = userFound.email } = req.body;
    const userUpdated = await prisma.user.update({
      where: { email: email },
      include: {
        orders: {
          include: { item: true },
        },
      },
      data: {
        name: newName,
        email: newEmail,
      },
    });

    if (userUpdated) {
      res.send(userUpdated);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
});

app.post("/order", async (req, res) => {
  const { itemId, userId, quantity } = req.body;

  try {
    const createdOrder = await prisma.order.create({
      data: {
        quantity,
        userId,
        itemId,
      },
      include: {
        user: true,
        item: true,
      },
    });
    res.send(createdOrder);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.patch("/order", async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const updateOrder = await prisma.order.update({
      include: {
        user: true,
        item: true,
      },
      where: {
        id: id,
      },
      data: {
        quantity: quantity,
      },
    });
    res.send(updateOrder);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.delete("/order/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    // const {email, title} = req.body
    const deleteOrder = await prisma.order.delete({ where: { id: id } });

    console.log(deleteOrder);
    if (deleteOrder) {
      res.send({ message: "Order deleted succesfully" });
    } else {
      res.send({ message: "There is no order with that id" });
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server up: http://localhost:${PORT}`);
});
