const getUserId = require('./getUserId');

const orderFragment = `
    {
        id
        orderedProducts {
            quantity
            product { price }
        }
    }
`;

async function calcTotalPrice(ctx) {
  const userId = getUserId(ctx);

  const userOrderedProducts = await ctx.prisma
    .user({ id: userId })
    .order()
    .$fragment(orderFragment);

  const totalPrice = userOrderedProducts.orderedProducts.reduce((acc, curr) => {
    // prettier-ignore
    acc = acc + (curr.quantity * curr.product.price)
    return acc;
  }, 0);

  return totalPrice;
}

module.exports = calcTotalPrice;
