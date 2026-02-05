import Joi from "joi";

const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(16).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({"any.only": "confirmPassword must be match with password"}),
});

const signInSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
})

export {signInSchema, signUpSchema}