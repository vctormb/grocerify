require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const createDraft = (parent, args, context) => {
//   return context.prisma.createPost({
//     title: args.title,
//     author: {
//       connect: { id: args.userId }
//     }
//   });
// };

// const publish = (parent, args, context) => {
//   return context.prisma.updatePost({
//     where: { id: args.postId },
//     data: { published: true }
//   });
// };

const login = (parent, { email, password }, context) => {
  return context.prisma.createUser({ name, email, password });
};

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  return {
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user
  };
};

module.exports = {
  signup
  // createDraft,
  // publish
};
