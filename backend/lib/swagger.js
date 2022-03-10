const swaggerUi = require('swagger-ui-express')
const swaggerJsondoc = require('swagger-jsdoc')
const path = require('path');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'TODO API',
            version: '1.0.0',
            description: 'TODO api',
        },
        servers: [
            {
                url: 'http://localhost:5051/',
            },
        ],
        tags: [
            {
                name: 'auth',
                description: '회원 관리',
            },
            {
                name: 'list',
                description: '리스트 관리',
            },
            {
                name: 'card',
                description: '카드 관리',
            },
            {
                name: 'check',
                description: '체크리스트 관리',
            },
            {
                name: 'comment',
                description: '코멘트 관리',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            res: {
                ok: {
                    status: 200,
                    description: 'ok',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'ok'
                            }
                        }
                    }
                },
                created: {
                    status: 201,
                    description: 'created resource',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'ok'
                            }
                        }
                    }
                },
                noContent: {
                    status: 204,
                    description: 'no content',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'error'
                            },
                            message: {
                                type: 'string',
                                description: 'message',
                                example: 'no content'
                            }
                        }
                    }
                },
                badRequest: {
                    status: 400,
                    description: 'bad request',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'error'
                            },
                            message: {
                                type: 'string',
                                description: 'message',
                                example: 'bad request'
                            }
                        }
                    }
                },
                forbidden: {
                    status: 401,
                    description: 'forbidden',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'error'
                            },
                            message: {
                                type: 'string',
                                description: 'message',
                                example: 'forbidden'
                            }
                        }
                    }
                },
                notFound: {
                    status: 404,
                    description: 'not found',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'error'
                            },
                            message: {
                                type: 'string',
                                description: 'message',
                                example: 'not found resource'
                            }
                        }
                    }
                },
                internalError: {
                    status: 500,
                    description: 'internal server error',
                    schema: {
                        type: 'object',
                        description: 'response body',
                        properties: {
                            result: {
                                type: 'string',
                                description: 'result',
                                example: 'error'
                            },
                            message: {
                                type: 'string',
                                description: 'message',
                                example: 'internal server error'
                            }
                        }
                    }
                }
            }
        },
        security:[
            {
                bearerAuth: []
            }
        ],
    },
    apis:[path.join(__dirname, '../routes', '*.js')]
    // apis:[path.join(__dirname, '../routes', '*.js'), './swagger/*']
}

const specs = swaggerJsondoc(options);

module.exports = {
    swaggerUi,
    specs
}