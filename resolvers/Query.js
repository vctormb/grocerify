const products = async (parent, args, context) => {
  return await context.prisma.products();
};

module.exports = {
  products
};
