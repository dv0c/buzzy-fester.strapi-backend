'use strict';

/**
 *  comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', {
    async create(ctx) {
        var { id } = ctx.state.user; //ctx.state.user contains the current authenticated user 
        const response = await super.create(ctx);
        const updatedResponse = await strapi.entityService
            .update('api::comment.comment', response.data.id, { data: { user: id } })
        return updatedResponse;
    },
    async update(ctx) {
        var { id } = ctx.state.user
        var [comment] = await strapi.entityService
            .findMany('api::comment.comment', {
                filters: {
                    id: ctx.request.params.id,
                    user: id
                }
            })
        if (comment) {
            const response = await super.update(ctx);
            return response;
        } else {
            console.log(id);
            return ctx.unauthorized();
        }
    },
    async delete(ctx) {
        var { id } = ctx.state.user
        var [comment] = await strapi.entityService
            .findMany('api::comment.comment', {
                filters: {
                    id: ctx.request.params.id,
                    user: id
                }
            })
        if (comment) {
            const response = await super.delete(ctx);
            return response;
        } else {
            return ctx.unauthorized();
        }
    },
}
);