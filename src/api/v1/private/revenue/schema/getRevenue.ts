export const GetRevenueSchema: object = {
  schema: {
    description: "Getting All Active Master Apps Record",
    tags: ["Revenue"],
    headers: {
      type: "object",
      // required: ["authorization"],
      properties: {
        authorization: { type: "string" },
      },
    },
    querystring: {
      type: "object",
      properties: {
        fromDate: { type: "string" },
        toDate: { type: "string" },
        product_id: { type: "string" },
        category_id: { type: "integer" },
        region: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Successful Response",
        type: "object",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              codeMessage: { type: "string" },
            },
          },
          data: {
            type: "object",
            additionalProperties: true,
          },
        },
      },
      400: {
        description: "Bad Request",
        type: "object",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              codeMessage: { type: "string" },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        type: "object",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              codeMessage: { type: "string" },
            },
          },
        },
      },
      403: {
        description: "Forbidden",
        type: "object",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              codeMessage: { type: "string" },
            },
          },
        },
      },
      404: {
        description: "Not Found",
        type: "object",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              codeMessage: { type: "string" },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              codeMessage: { type: "string" },
            },
          },
        },
      },
    },
  },
};
