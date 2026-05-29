const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Twitter/X Clone',
        description: 'Documentação da API RESTful desenvolvida para o Projeto Final de DWBE',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json'; // O ficheiro que ele vai criar
const endpointsFiles = ['./app.js']; // O ficheiro onde a nossa app começa

// Gerar o ficheiro
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Ficheiro swagger.json gerado com sucesso!');
});