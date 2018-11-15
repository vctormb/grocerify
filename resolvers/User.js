const posts = (parent, args, context) => {
  return context.prisma
    .user({
      id: parent.id
    })
    .posts();
};

module.exports = {
  posts
};
