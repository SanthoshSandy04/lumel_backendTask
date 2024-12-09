import { FastifyPluginAsync } from "fastify";
import handlers from "./handlers";
import schema from "./schema";

const revenue: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/getRevenue",
    schema.GetRevenueSchema,
    (request: any, reply: any) => handlers.GetRevenue(request, reply, fastify)
  );
};

export default revenue;
