const { getUserId } = require('../utils');

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

  const orderFragment = `
		{
			id
			orderedProducts {
				quantity
				product { price }
			}
		}
  `;

  const userOrderedProducts = await context.prisma
    .user({ id: userId })
    .order()
    .$fragment(orderFragment);

  const totalPrice = userOrderedProducts.orderedProducts.reduce((acc, curr) => {
    // prettier-ignore
    acc = acc + (curr.quantity * curr.product.price)
    return acc;
  }, 0);

  return {
    order,
    totalPrice,
  };
};

module.exports = {
  products,
  userOrder,
};
