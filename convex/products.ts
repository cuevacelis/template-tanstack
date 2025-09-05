import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('products').collect()
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    imageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('products', {
      title: args.title,
      price: args.price,
      imageId: args.imageId,
    })
  },
})
