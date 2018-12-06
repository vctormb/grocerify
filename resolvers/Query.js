const { getUserId, calcTotalPrice } = require('../utils');

const products = async (parent, args, context) => {
  return await context.prisma.products({
    ...args,
  });
};

const userOrder = async (parent, args, context) => {
  const userId = getUserId(context);

  const order = await context.prisma
    .user({
      id: userId,
    })
    .order();

  const totalPrice = calcTotalPrice(context);

  return {
    order,
    totalPrice,
  };
};

/**
 * This is a resolver workaround because prisma query connections - which has aggregate counting - are not working
 */
const countUserOrderedProducts = async (parent, args, context) => {
  const userId = getUserId(context);

  const orderedProducts = await context.prisma
    .user({
      id: userId,
    })
    .order()
    .orderedProducts();

  return orderedProducts.length;
};

module.exports = {
  products,
  userOrder,
  countUserOrderedProducts,
};
