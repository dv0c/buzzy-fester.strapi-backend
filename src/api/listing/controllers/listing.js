'use strict';

/**
 *  listing controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::listing.listing', {
    async create(ctx) {
        var { id } = ctx.state.user; //ctx.state.user contains the current authenticated user 
        const response = await super.create(ctx);
        const updatedResponse = await strapi.entityService
            .update('api::listing.listing', response.data.id, { data: { user: id } })
        return updatedResponse;
    },
    async update(ctx) {
        var { id } = ctx.state.user
        var [listing] = await strapi.entityService
            .findMany('api::listing.listing', {
                filters: {
                    id: ctx.request.params.id,
                    user: id
                }
            })
        if (listing) {
            const response = await super.update(ctx);
            return response;
        } else {
            console.log(id);
            return ctx.unauthorized();
        }
    },
    async delete(ctx) {
        var { id } = ctx.state.user
        var [listing] = await strapi.entityService
            .findMany('api::listing.listing', {
                filters: {
                    id: ctx.request.params.id,
                    user: id
                }
            })
        if (listing) {
            const response = await super.delete(ctx);
            return response;
        } else {
            return ctx.unauthorized();
        }
    },
}
);