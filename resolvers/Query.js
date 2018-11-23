const products = async (parent, args, context) => {
  return await context.prisma.products({
    ...args
  });
};

module.exports = {
  products
};
