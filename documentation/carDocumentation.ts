import {carSchema} from "../schemas/carSchemas";
import {z} from "zod";

const getCarsInfo = {
    method: "get",
    path: "/",
    tags: ["Cars"],
    parameters: [
        {
            name: "page",
            in: "query",
            schema: {
                type: "number"
            },
            description: "Page number"
        },
        {
            name: "limit",
            in: "query",
            schema: {
                type: "number"
            },
            description: "Page limit"
        },
        {
            name: "type",
            in: "query",
            required: false,
            schema: {
                type: "string",
                enum: ["short"]
            },
            description: "Without type, all cars will be returned. With type \"short\" cars description will be returned",
        }
    ],
    summary: "Get cars",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: carSchema.array()
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Bad request")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("No cars found")
                    })
                }
            }
        }
    }
}

const getCarInfo = {
    method: "get",
    path: "/:id",
    tags: ["Cars"],
    parameters: [
        {
            name: "id",
            in: "path",
            schema: {
                type: "string"
            },
            description: "Car id",
            required: true
        }
    ],
    summary: "Get car",
    description: "Get car by id",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: carSchema
                }
            }
        },
        400: {
            description: "Invalid id",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car not found. Invalid id")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car not found")
                    })
                }
            }
        }
    }
}

const postCarInfo = {
    method: "post",
    path: "/",
    tags: ["Cars"],
    summary: "Create new car",
    description: "Create new car",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: carSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car created successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Bad request")
                    })
                }
            }
        }
    }
}

const putCarInfo = {
    method: "put",
    path: "/:id",
    tags: ["Cars"],
    parameters: [
        {
            name: "id",
            in: "path",
            schema: {
                type: "string"
            },
            description: "Car id",
            required: true
        }
    ],
    summary: "Update car",
    description: "Update car by id",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: carSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car updated successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Bad request or invalid ID")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car not found")
                    })
                }
            }
        }
    }
}

const deleteCarInfo = {
    method: "delete",
    path: "/:id",
    tags: ["Cars"],
    parameters: [
        {
            name: "id",
            in: "path",
            schema: {
                type: "string"
            },
            description: "Car id",
            required: true
        }
    ],
    summary: "Delete car",
    description: "Delete car by id",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car deleted successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Invalid id")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car not found")
                    })
                }
            }
        }
    }
}

const calculatorInfo = {
    method: "post",
    path: "/calculator",
    tags: ["Cars"],
    description: "Calculate loan amount",
    summary: "Calculate loan amount",
    parameters: [
        {
            name: "Price",
            in: "query",
            required: true,
            schema: {
                type: "number"
            },
            description: "Car price"
        },
        {
            name: "Interest rate",
            in: "query",
            required: true,
            schema: {
                type: "number"
            },
            description: "Interest rate"
        },
        {
            name: "Term",
            in: "query",
            required: true,
            schema: {
                type: "number"
            },
            description: "Loan term"
        },
        {
            name: "Initial payment",
            in: "query",
            schema: {
                type: "number"
            },
            description: "Initial payment"
        }
    ],
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        monthlyPayment: z.number(),
                        totalCost: z.number()
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Bad request")
                    })
                }
            }
        }
    }
}

export {
    getCarsInfo,
    getCarInfo,
    postCarInfo,
    putCarInfo,
    deleteCarInfo,
    calculatorInfo
}