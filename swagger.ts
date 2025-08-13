import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Routes Documentation',
      version: '1.0.0',
      description: 'A simple Swagger UI for a Next.js API.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update this for production
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts'], // This is crucial. It points to all your API route files.
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
