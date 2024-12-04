import swaggerAutogen from "swagger-autogen";
import salaEntity from "./entities/salaEntity.js";
import usuarioEntity from "./entities/usuarioEntity.js";
import participanteEntity from "./entities/participanteEntity.js";

const doc = {
    info: {
        title: "PFS2 - API",
        description: "API criada utilizando o padrão REST na disciplina de Programação Fullstack 2"
    },
    host: 'localhost:5000',
    components: {
        schemas: {
            salaModel: new salaEntity(0, "Sala 1", new usuarioEntity(1)).toJSON(),
            participanteModel: new participanteEntity(0, "", "", new usuarioEntity(1), new salaEntity(1)).toJSON(),
        },
        '@schemas': {
            salaModel: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        required: true,
                        example: "0"
                    },
                    nome: {
                        type: "string",
                        required: true,
                        example: "Sala 1"
                    },
                    usuario: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                required: true,
                                example: "0"
                            }
                        }
                    }
                }
            },
            participanteModel: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        required: true,
                        example: "0"
                    },
                    dtEntrada: {
                        type: "string",
                        required: true,
                        example: "data"
                    },
                    sala: {
                        type: "object",
                        properties: {
                            salId: {
                                type: "integer",
                                required: true,
                                example: "0"
                            }
                        }
                    },
                    equipe: {
                        type: "object",
                        properties: {
                            eqpId: {
                                type: "integer",
                                required: true,
                                example: "0"
                            }
                        }
                    },
                    usuario: {
                        type: "object",
                        properties: {
                            usuId: {
                                type: "integer",
                                required: true,
                                example: "0"
                            }
                        }
                    }
                }
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})