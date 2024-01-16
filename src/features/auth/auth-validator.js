import Joi from 'joi';

const registerSchema = Joi.object(
    {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),

        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
            .trim()
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref('password'))
            .trim()
            .required()
            .strip(),
        email: Joi.string()
            .trim()
            .email({
                tlds: { allow: ['com', 'net'] }
            }),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).allow('')
    }
)

export const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}


export const ProfileSchema = Joi.object(
    {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        email: Joi.string()
            .trim()
            .email({
                tlds: { allow: ['com', 'net'] }
            }),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).allow('')
    }
)

export const validateProfile = (input) => {
    const { error } = ProfileSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}


export const PasswordSchema = Joi.object(
    {
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
            .trim()
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref('password'))
            .trim()
            .required()
            .strip()
    }
)

export const validatePassword = (input) => {
    const { error } = PasswordSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}



