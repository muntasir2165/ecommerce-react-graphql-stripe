"use strict";

const stripe = require("stripe")("sk_test_AfWF8IcOtXRDKEhSrn9n4S6Z");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const {
      address,
      amount,
      brews,
      postalCode,
      token,
      city,
    } = ctx.request.body;

    // Send charge to Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: token,
    });

    const order = await strapi.services.orders.add({
      user: ctx.state.user._id,
      address,
      amount,
      brews,
      postalCode,
      city,
    });

    return order;
  },
};
