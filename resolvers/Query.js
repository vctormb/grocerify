const { getUserId } = require('../utils');

const products = async (parent, args, context) => {
  return await context.prisma.products({
    ...args,
  });
};

const order = async (parent, args, context) => {
  const userId = getUserId(context);

  return await context.prisma
    .user({
      id: userId,
    })
    .order();
};

module.exports = {
  products,
  order,
};
