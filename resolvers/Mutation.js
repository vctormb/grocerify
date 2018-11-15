const createDraft = (parent, args, context) => {
  return context.prisma.createPost({
    title: args.title,
    author: {
      connect: { id: args.userId }
    }
  });
};

const publish = (parent, args, context) => {
  return context.prisma.updatePost({
    where: { id: args.postId },
    data: { published: true }
  });
};

const createUser = (parent, args, context) => {
  return context.prisma.createUser({ name: args.name });
};

module.exports = {
  createDraft,
  publish,
  createUser
};
