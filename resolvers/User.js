const order = async (parent, args, context) => {
  return await context.prisma
    .user({
      id: parent.id,
    })
    .order();
};

module.exports = {
  order,
};
