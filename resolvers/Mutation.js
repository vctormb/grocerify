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

const login = async (parent, { email, password }, context) => {
  const user = await context.prisma.user({ email });
  if (!user) {
    throw new Error(`No such user found for email: ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user
  };
};

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  return {
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user
  };
};

const createProduct = async (parent, { data }, context) => {
  return await context.prisma.createProduct(data);
};

module.exports = {
  login,
  signup,
  createProduct
};
