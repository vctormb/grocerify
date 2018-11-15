const author = (parent, args, context) => {
  return context.prisma
    .post({
      id: parent.id
    })
    .author();
};

module.exports = {
  author
};
