const { getUserId, isLoggedIn } = require('../utils');

const userOrderedProduct = async (parent, args, context) => {
  let orderedProduct;

  if (isLoggedIn(context)) {
    const userId = getUserId(context);

    const fetchedOrderedProduct = await context.prisma.orderedProducts({
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
              id: parent.id,
            },
          },
        ],
      },
    });

    orderedProduct = fetchedOrderedProduct[0];
  }

  return orderedProduct;
};

module.exports = {
  userOrderedProduct,
};
