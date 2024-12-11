import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for Chat Application",
    },
  },
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
