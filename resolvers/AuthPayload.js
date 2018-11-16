const user = async (parent, args, context) => {
  return await context.prisma.user({ id: parent.user.id });
};

module.exports = {
  user
};
