import { revenue } from "@interactors";
import { FastifyReply, FastifyRequest } from "fastify";
import { codeError } from "utils/codeMessages";
import { error } from "utils/messages";

export const GetRevenue = async (
  request: FastifyRequest,
  reply: FastifyReply,
  fastify: any
) => {
  try {
    /* Calling Interactor function 
          for to Create New License */
    let response: any = await getRevenue(request);

    // Sending Success Response
    reply.code(response?.status?.code || 200).send({
      status: response?.status,
      data: response?.data,
    });
  } catch (err: any) {
    // Sending Error Response
    reply.code(err?.status?.code || 500).send({
      status: err?.status,
    });
    fastify.log.error(err);
  }
};

const getRevenue = (request: FastifyRequest) => {
  return new Promise(async (resolve, reject) => {
    try {
      /* ----- Mappers ----- */
      const { fromDate, toDate, product_id, category_id, region }: any =
        request.query;

      /* ---------- Interactors ---------- */
      const res: any = await revenue.GetRevenue({
        fromDate,
        toDate,
        product_id,
        category_id,
        region,
      });

      // Resolve
      return resolve({
        status: {
          code: res?.code,
          message: res?.message,
          codeMessage: res?.codeMessage,
        },
        data: res?.responseData,
      });
    } catch (err: any) {
      console.log("Error", err);

      // Reject
      return reject({
        status: {
          code: 500,
          message: error.serverError,
          codeMessage: codeError.serverError,
        },
      });
    }
  });
};
