// const publishedPosts = (parent, args, context) => {
//   return context.prisma.posts({ where: { published: true } });
// };

const post = (parent, args, context) => {
  return context.prisma.post({ id: args.postId });
};

// const postsByUser = (parent, args, context) => {
//   return context.prisma
//     .user({
//       id: args.userId
//     })
//     .posts();
// };

module.exports = {
  // publishedPosts,
  post
  // postsByUser
};
