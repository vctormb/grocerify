require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");

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
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user
  };
};

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  return {
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user
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

  const orderedProductCreateRelation = {
    quantity: args.quantity,
    product: {
      connect: { id: product.id }
    }
  };

  if (!order) {
    return await context.prisma.createOrder({
      totalPrice: product.price * args.quantity,
      whoOrdered: { connect: { id: userId } },
      orderedProducts: {
        create: orderedProductCreateRelation
      }
    });
  }

  // prettier-ignore
  const totalPrice = (product.price * args.quantity) + order.totalPrice;

  return await context.prisma.updateOrder({
    data: {
      totalPrice,
      orderedProducts: {
        create: orderedProductCreateRelation
      }
    },
    where: { id: order.id }
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
      id: args.orderedProductId
    })
    .$fragment(orderedProductFragment);

  if (!orderedProduct) {
    throw new Error(`OrderedProduct not found`);
  }

  if (orderedProduct.order.whoOrdered.id !== userId) {
    throw new Error(`Order not found`);
  }

  await context.prisma.updateOrderedProduct({
    data: {
      quantity: args.quantity
    },
    where: { id: args.orderedProductId }
  });

  const orderFragment = `
		{
			id
			orderedProducts {
				quantity
				product { price }
			}
		}
	`;

  const order = await context.prisma
    .user({ id: userId })
    .order()
    .$fragment(orderFragment);

  const totalPrice = order.orderedProducts.reduce((acc, curr) => {
    // prettier-ignore
    acc = acc + (curr.quantity * curr.product.price)
    return acc;
  }, 0);

  return await context.prisma.updateOrder({
    data: { totalPrice },
    where: { id: order.id }
  });
};

const deleteOrderedProduct = async (parent, args, context) => {
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
      id: args.orderedProductId
    })
    .$fragment(orderedProductFragment);

  if (!orderedProduct) {
    throw new Error(`OrderedProduct not found`);
  }

  if (orderedProduct.order.whoOrdered.id !== userId) {
    throw new Error(`Order not found`);
  }

  await context.prisma.deleteOrderedProduct({
    id: args.orderedProductId
  });

  const orderFragment = `
		{
			id
			orderedProducts {
				quantity
				product { price }
			}
		}
	`;

  const order = await context.prisma
    .user({ id: userId })
    .order()
    .$fragment(orderFragment);

  const totalPrice = order.orderedProducts.reduce((acc, curr) => {
    // prettier-ignore
    acc = acc + (curr.quantity * curr.product.price)
    return acc;
  }, 0);

  return await context.prisma.updateOrder({
    data: { totalPrice },
    where: { id: order.id }
  });
};

module.exports = {
  login,
  signup,
  createProduct,
  createOrderedProduct,
  updateOrderedProduct,
  deleteOrderedProduct
};
