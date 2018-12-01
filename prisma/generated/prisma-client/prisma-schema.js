module.exports = {
        typeDefs: /* GraphQL */ `type AggregateOrder {
  count: Int!
}

type AggregateOrderedProduct {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createOrder(data: OrderCreateInput!): Order!
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateManyOrders(data: OrderUpdateManyMutationInput!, where: OrderWhereInput): BatchPayload!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  createOrderedProduct(data: OrderedProductCreateInput!): OrderedProduct!
  updateOrderedProduct(data: OrderedProductUpdateInput!, where: OrderedProductWhereUniqueInput!): OrderedProduct
  updateManyOrderedProducts(data: OrderedProductUpdateManyMutationInput!, where: OrderedProductWhereInput): BatchPayload!
  upsertOrderedProduct(where: OrderedProductWhereUniqueInput!, create: OrderedProductCreateInput!, update: OrderedProductUpdateInput!): OrderedProduct!
  deleteOrderedProduct(where: OrderedProductWhereUniqueInput!): OrderedProduct
  deleteManyOrderedProducts(where: OrderedProductWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Order {
  id: ID!
  totalPrice: Float!
  orderedProducts(where: OrderedProductWhereInput, orderBy: OrderedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderedProduct!]
  whoOrdered: User!
}

type OrderConnection {
  pageInfo: PageInfo!
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  totalPrice: Float
  orderedProducts: OrderedProductCreateManyWithoutOrderInput
  whoOrdered: UserCreateOneWithoutOrderInput!
}

input OrderCreateOneWithoutOrderedProductsInput {
  create: OrderCreateWithoutOrderedProductsInput
  connect: OrderWhereUniqueInput
}

input OrderCreateOneWithoutWhoOrderedInput {
  create: OrderCreateWithoutWhoOrderedInput
  connect: OrderWhereUniqueInput
}

input OrderCreateWithoutOrderedProductsInput {
  totalPrice: Float
  whoOrdered: UserCreateOneWithoutOrderInput!
}

input OrderCreateWithoutWhoOrderedInput {
  totalPrice: Float
  orderedProducts: OrderedProductCreateManyWithoutOrderInput
}

type OrderEdge {
  node: Order!
  cursor: String!
}

type OrderedProduct {
  id: ID!
  product: Product!
  quantity: Int!
  order: Order!
}

type OrderedProductConnection {
  pageInfo: PageInfo!
  edges: [OrderedProductEdge]!
  aggregate: AggregateOrderedProduct!
}

input OrderedProductCreateInput {
  product: ProductCreateOneWithoutOrderedProductsInput!
  quantity: Int!
  order: OrderCreateOneWithoutOrderedProductsInput!
}

input OrderedProductCreateManyWithoutOrderInput {
  create: [OrderedProductCreateWithoutOrderInput!]
  connect: [OrderedProductWhereUniqueInput!]
}

input OrderedProductCreateManyWithoutProductInput {
  create: [OrderedProductCreateWithoutProductInput!]
  connect: [OrderedProductWhereUniqueInput!]
}

input OrderedProductCreateWithoutOrderInput {
  product: ProductCreateOneWithoutOrderedProductsInput!
  quantity: Int!
}

input OrderedProductCreateWithoutProductInput {
  quantity: Int!
  order: OrderCreateOneWithoutOrderedProductsInput!
}

type OrderedProductEdge {
  node: OrderedProduct!
  cursor: String!
}

enum OrderedProductOrderByInput {
  id_ASC
  id_DESC
  quantity_ASC
  quantity_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OrderedProductPreviousValues {
  id: ID!
  quantity: Int!
}

type OrderedProductSubscriptionPayload {
  mutation: MutationType!
  node: OrderedProduct
  updatedFields: [String!]
  previousValues: OrderedProductPreviousValues
}

input OrderedProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderedProductWhereInput
  AND: [OrderedProductSubscriptionWhereInput!]
  OR: [OrderedProductSubscriptionWhereInput!]
  NOT: [OrderedProductSubscriptionWhereInput!]
}

input OrderedProductUpdateInput {
  product: ProductUpdateOneRequiredWithoutOrderedProductsInput
  quantity: Int
  order: OrderUpdateOneRequiredWithoutOrderedProductsInput
}

input OrderedProductUpdateManyMutationInput {
  quantity: Int
}

input OrderedProductUpdateManyWithoutOrderInput {
  create: [OrderedProductCreateWithoutOrderInput!]
  delete: [OrderedProductWhereUniqueInput!]
  connect: [OrderedProductWhereUniqueInput!]
  disconnect: [OrderedProductWhereUniqueInput!]
  update: [OrderedProductUpdateWithWhereUniqueWithoutOrderInput!]
  upsert: [OrderedProductUpsertWithWhereUniqueWithoutOrderInput!]
}

input OrderedProductUpdateManyWithoutProductInput {
  create: [OrderedProductCreateWithoutProductInput!]
  delete: [OrderedProductWhereUniqueInput!]
  connect: [OrderedProductWhereUniqueInput!]
  disconnect: [OrderedProductWhereUniqueInput!]
  update: [OrderedProductUpdateWithWhereUniqueWithoutProductInput!]
  upsert: [OrderedProductUpsertWithWhereUniqueWithoutProductInput!]
}

input OrderedProductUpdateWithoutOrderDataInput {
  product: ProductUpdateOneRequiredWithoutOrderedProductsInput
  quantity: Int
}

input OrderedProductUpdateWithoutProductDataInput {
  quantity: Int
  order: OrderUpdateOneRequiredWithoutOrderedProductsInput
}

input OrderedProductUpdateWithWhereUniqueWithoutOrderInput {
  where: OrderedProductWhereUniqueInput!
  data: OrderedProductUpdateWithoutOrderDataInput!
}

input OrderedProductUpdateWithWhereUniqueWithoutProductInput {
  where: OrderedProductWhereUniqueInput!
  data: OrderedProductUpdateWithoutProductDataInput!
}

input OrderedProductUpsertWithWhereUniqueWithoutOrderInput {
  where: OrderedProductWhereUniqueInput!
  update: OrderedProductUpdateWithoutOrderDataInput!
  create: OrderedProductCreateWithoutOrderInput!
}

input OrderedProductUpsertWithWhereUniqueWithoutProductInput {
  where: OrderedProductWhereUniqueInput!
  update: OrderedProductUpdateWithoutProductDataInput!
  create: OrderedProductCreateWithoutProductInput!
}

input OrderedProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  product: ProductWhereInput
  quantity: Int
  quantity_not: Int
  quantity_in: [Int!]
  quantity_not_in: [Int!]
  quantity_lt: Int
  quantity_lte: Int
  quantity_gt: Int
  quantity_gte: Int
  order: OrderWhereInput
  AND: [OrderedProductWhereInput!]
  OR: [OrderedProductWhereInput!]
  NOT: [OrderedProductWhereInput!]
}

input OrderedProductWhereUniqueInput {
  id: ID
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  totalPrice_ASC
  totalPrice_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OrderPreviousValues {
  id: ID!
  totalPrice: Float!
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
  AND: [OrderSubscriptionWhereInput!]
  OR: [OrderSubscriptionWhereInput!]
  NOT: [OrderSubscriptionWhereInput!]
}

input OrderUpdateInput {
  totalPrice: Float
  orderedProducts: OrderedProductUpdateManyWithoutOrderInput
  whoOrdered: UserUpdateOneRequiredWithoutOrderInput
}

input OrderUpdateManyMutationInput {
  totalPrice: Float
}

input OrderUpdateOneRequiredWithoutOrderedProductsInput {
  create: OrderCreateWithoutOrderedProductsInput
  update: OrderUpdateWithoutOrderedProductsDataInput
  upsert: OrderUpsertWithoutOrderedProductsInput
  connect: OrderWhereUniqueInput
}

input OrderUpdateOneWithoutWhoOrderedInput {
  create: OrderCreateWithoutWhoOrderedInput
  update: OrderUpdateWithoutWhoOrderedDataInput
  upsert: OrderUpsertWithoutWhoOrderedInput
  delete: Boolean
  disconnect: Boolean
  connect: OrderWhereUniqueInput
}

input OrderUpdateWithoutOrderedProductsDataInput {
  totalPrice: Float
  whoOrdered: UserUpdateOneRequiredWithoutOrderInput
}

input OrderUpdateWithoutWhoOrderedDataInput {
  totalPrice: Float
  orderedProducts: OrderedProductUpdateManyWithoutOrderInput
}

input OrderUpsertWithoutOrderedProductsInput {
  update: OrderUpdateWithoutOrderedProductsDataInput!
  create: OrderCreateWithoutOrderedProductsInput!
}

input OrderUpsertWithoutWhoOrderedInput {
  update: OrderUpdateWithoutWhoOrderedDataInput!
  create: OrderCreateWithoutWhoOrderedInput!
}

input OrderWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  totalPrice: Float
  totalPrice_not: Float
  totalPrice_in: [Float!]
  totalPrice_not_in: [Float!]
  totalPrice_lt: Float
  totalPrice_lte: Float
  totalPrice_gt: Float
  totalPrice_gte: Float
  orderedProducts_every: OrderedProductWhereInput
  orderedProducts_some: OrderedProductWhereInput
  orderedProducts_none: OrderedProductWhereInput
  whoOrdered: UserWhereInput
  AND: [OrderWhereInput!]
  OR: [OrderWhereInput!]
  NOT: [OrderWhereInput!]
}

input OrderWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Product {
  id: ID!
  imageUrl: String!
  title: String!
  price: Float!
  orderedProducts(where: OrderedProductWhereInput, orderBy: OrderedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderedProduct!]
}

type ProductConnection {
  pageInfo: PageInfo!
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  imageUrl: String!
  title: String!
  price: Float!
  orderedProducts: OrderedProductCreateManyWithoutProductInput
}

input ProductCreateOneWithoutOrderedProductsInput {
  create: ProductCreateWithoutOrderedProductsInput
  connect: ProductWhereUniqueInput
}

input ProductCreateWithoutOrderedProductsInput {
  imageUrl: String!
  title: String!
  price: Float!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  imageUrl_ASC
  imageUrl_DESC
  title_ASC
  title_DESC
  price_ASC
  price_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProductPreviousValues {
  id: ID!
  imageUrl: String!
  title: String!
  price: Float!
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
  AND: [ProductSubscriptionWhereInput!]
  OR: [ProductSubscriptionWhereInput!]
  NOT: [ProductSubscriptionWhereInput!]
}

input ProductUpdateInput {
  imageUrl: String
  title: String
  price: Float
  orderedProducts: OrderedProductUpdateManyWithoutProductInput
}

input ProductUpdateManyMutationInput {
  imageUrl: String
  title: String
  price: Float
}

input ProductUpdateOneRequiredWithoutOrderedProductsInput {
  create: ProductCreateWithoutOrderedProductsInput
  update: ProductUpdateWithoutOrderedProductsDataInput
  upsert: ProductUpsertWithoutOrderedProductsInput
  connect: ProductWhereUniqueInput
}

input ProductUpdateWithoutOrderedProductsDataInput {
  imageUrl: String
  title: String
  price: Float
}

input ProductUpsertWithoutOrderedProductsInput {
  update: ProductUpdateWithoutOrderedProductsDataInput!
  create: ProductCreateWithoutOrderedProductsInput!
}

input ProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  imageUrl: String
  imageUrl_not: String
  imageUrl_in: [String!]
  imageUrl_not_in: [String!]
  imageUrl_lt: String
  imageUrl_lte: String
  imageUrl_gt: String
  imageUrl_gte: String
  imageUrl_contains: String
  imageUrl_not_contains: String
  imageUrl_starts_with: String
  imageUrl_not_starts_with: String
  imageUrl_ends_with: String
  imageUrl_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  orderedProducts_every: OrderedProductWhereInput
  orderedProducts_some: OrderedProductWhereInput
  orderedProducts_none: OrderedProductWhereInput
  AND: [ProductWhereInput!]
  OR: [ProductWhereInput!]
  NOT: [ProductWhereInput!]
}

input ProductWhereUniqueInput {
  id: ID
}

type Query {
  order(where: OrderWhereUniqueInput!): Order
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  orderedProduct(where: OrderedProductWhereUniqueInput!): OrderedProduct
  orderedProducts(where: OrderedProductWhereInput, orderBy: OrderedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderedProduct]!
  orderedProductsConnection(where: OrderedProductWhereInput, orderBy: OrderedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderedProductConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  orderedProduct(where: OrderedProductSubscriptionWhereInput): OrderedProductSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String
  password: String!
  order: Order
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String
  password: String!
  order: OrderCreateOneWithoutWhoOrderedInput
}

input UserCreateOneWithoutOrderInput {
  create: UserCreateWithoutOrderInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutOrderInput {
  name: String!
  email: String
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  order: OrderUpdateOneWithoutWhoOrderedInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
}

input UserUpdateOneRequiredWithoutOrderInput {
  create: UserCreateWithoutOrderInput
  update: UserUpdateWithoutOrderDataInput
  upsert: UserUpsertWithoutOrderInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutOrderDataInput {
  name: String
  email: String
  password: String
}

input UserUpsertWithoutOrderInput {
  update: UserUpdateWithoutOrderDataInput!
  create: UserCreateWithoutOrderInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  order: OrderWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    