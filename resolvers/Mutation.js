require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId, calcTotalPrice } = require('../utils');

const login = async (parent, { email, password }, context) => {
  const user = await context.prisma.user({ email });
  if (!user) {
    throw new Error(`Wrong email or password`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error(`Wrong email or password`);
  }

  return {
    token: jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET
    ),
    user,
  };
};

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  await context.prisma.createOrder({
    whoOrdered: {
      connect: {
        id: user.id,
      },
    },
  });

  return {
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user,
  };
};

const createProduct = async (parent, { data }, context) => {
  return await context.prisma.createProduct(data);
};

const createOrderedProduct = async (parent, args, context) => {
  const userId = getUserId(context);

  const product = await context.prisma.product({ id: args.productId });
  if (!product) {
    throw new Error(`Product not found`);
  }

  const order = await context.prisma.user({ id: userId }).order();

  return await context.prisma.createOrderedProduct({
    quantity: args.quantity,
    product: {
      connect: { id: product.id },
    },
    order: {
      connect: { id: order.id },
    },
  });
};

const updateOrderedProduct = async (parent, args, context) => {
  const userId = getUserId(context);
  const orderedProductFragment = `
  	{
  		order {
  			whoOrdered {
					id
				}
  		}
  	}
  `;

  const orderedProduct = await context.prisma
    .orderedProduct({
      id: args.orderedProductId,
    })
    .$fragment(orderedProductFragment);

  if (!orderedProduct) {
    throw new Error(`OrderedProduct not found`);
  }

  if (orderedProduct.order.whoOrdered.id !== userId) {
    throw new Error(`Order not found`);
  }

  const updatedOrderedProduct = await context.prisma.updateOrderedProduct({
    data: {
      quantity: args.quantity,
    },
    where: { id: args.orderedProductId },
  });

  const totalPrice = calcTotalPrice(context);

  return {
    orderedProduct: updatedOrderedProduct,
    totalPrice,
  };
};

const deleteOrderedProduct = async (parent, args, context) => {
  const userId = getUserId(context);

  const orderedProduct = await context.prisma.orderedProducts({
    where: {
      AND: [
        {
          order: {
            whoOrdered: {
              id: userId,
            },
          },
        },
        {
          product: {
            id: args.productId,
          },
        },
      ],
    },
  });

  if (!orderedProduct[0]) {
    throw new Error(`OrderedProduct not found`);
  }

  const deletedOrderedProduct = await context.prisma.deleteOrderedProduct({
    id: orderedProduct[0].id,
  });

  const totalPrice = calcTotalPrice(context);

  return {
    orderedProduct: deletedOrderedProduct,
    totalPrice,
  };
};

const resetOrder = async (parent, args, context) => {
  const userId = getUserId(context);

  return await context.prisma.deleteManyOrderedProducts({
    order: {
      whoOrdered: {
        id: userId,
      },
    },
  });
};

module.exports = {
  login,
  signup,
  createProduct,
  createOrderedProduct,
  updateOrderedProduct,
  deleteOrderedProduct,
  resetOrder,
};
