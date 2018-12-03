const product = async (parent, args, context) => {
  return await context.prisma
    .orderedProduct({
      id: parent.id,
    })
    .product();
};

module.exports = {
  product,
};
