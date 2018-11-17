const whoOrdered = async (parent, args, context) => {
  return await context.prisma
    .order({
      id: parent.id
    })
    .whoOrdered();
};

const orderedProducts = async (parent, args, context) => {
  return await context.prisma
    .order({
      id: parent.id
    })
    .orderedProducts();
};

module.exports = {
  whoOrdered,
  orderedProducts
};
