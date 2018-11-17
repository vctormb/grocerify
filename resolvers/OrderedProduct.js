const product = (parent, args, context) => {
  return context.prisma
    .orderedProduct({
      id: parent.id
    })
    .product();
};

module.exports = {
  product
};
