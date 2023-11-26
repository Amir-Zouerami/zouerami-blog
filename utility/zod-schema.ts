import { ZodErrorMap, ZodIssueCode, z } from 'zod';

// -------------- ERROR MAP --------------
const customErrorMap: ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    // case ZodIssueCode.invalid_type:
    //   if (error.expected === 'string') {
    //     return { message: 'لطفا در این فیلد فقط از متن ساده استفاده کنید.' };
    //   }
    //   break;

    case ZodIssueCode.invalid_string:
      if (error.validation === 'email') {
        return { message: 'ایمیل وارد شده معتبر نیست.' };
      }

      if (error.validation === 'datetime') {
        return { message: 'تاریخ وارد شده معتبر نیست.' };
      }

      if (error.validation === 'url') {
        return { message: 'لینک ارسالی صحیح نیست.' };
      }
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

// -------------- SIGN IN --------------

const userIdentifierSchema = z.union([
  z
    .string()
    .email()
    .trim()
    .min(4, { message: 'ایمیل شما باید حداقل ۴ حرفی باشد.' })
    .max(99, { message: 'ایمیل شما باید حداکثر ۹۹ حرفی باشد.' }),
  // z
  //   .string()
  //   .trim()
  //   .length(11, {
  //     message: 'شماره تلفن باید ۱۱ رقم باشد. به طور مثال ۰۹۱۵۰۰۰۰۰۰۰',
  //   })
  //   .regex(/^09\d{9}$/, {
  //     message: 'شماره تلفن باید ۱۱ رقم باشد. به طور مثال ۰۹۱۵۰۰۰۰۰۰۰',
  //   }),
  z
    .string()
    .trim()
    .min(3, { message: 'نام کاربری باید حداقل ۳ حرفی باشد.' })
    .max(50, { message: 'نام کاربری باید حداکثر ۵۰ حرفی باشد.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'نام کاربری باید فقط شامل حروف انگلیسی، اعداد و علامت های - و ـ باشد.',
    }),
]);

export const loginUserSchema = z.object({
  identifier: userIdentifierSchema,
  password: z
    .string()
    .min(8, { message: 'رمز عبور باید حداقل ۸ حرفی باشد.' })
    .max(50, { message: 'رمز عبور نمی تواند بیش از ۵۰ کاراکتر داشته باشد.' }),
});

// -------------- SIGN UP --------------

export const signupUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'نام کاربری باید حداقل ۳ حرفی باشد.' })
    .max(50, { message: 'نام کاربری باید حداکثر ۵۰ حرفی باشد.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'نام کاربری باید فقط شامل حروف انگلیسی، اعداد و علامت های - و ـ باشد.',
    }),
  email: z
    .string()
    .trim()
    .email()
    .min(4, { message: 'ایمیل شما باید حداقل ۴ حرفی باشد.' })
    .max(99, { message: 'ایمیل شما باید حداکثر ۹۹ حرفی باشد.' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'رمز عبور باید حداقل ۸ حرفی باشد.' })
    .max(50, { message: 'رمز عبور باید حداکثر ۵۰ حرفی باشد.' }),
  // phone_number: z
  //   .string()
  //   .trim()
  //   .refine(
  //     value => {
  //       const phoneRegex = /^09\d{9}$/;
  //       return phoneRegex.test(value) || value === '';
  //     },
  //     { message: 'شماره تلفن باید ۱۱ رقم باشد. به طور مثال ۰۹۱۵۰۰۰۰۰۰۰' }
  //   )
  //   .optional(),
});

// -------------- PROFILE EDIT --------------

export const usernameType = z
  .string()
  .trim()
  .min(3, { message: 'نام کاربری باید حداقل ۳ حرفی باشد.' })
  .max(50, { message: 'نام کاربری باید حداکثر ۵۰ حرفی باشد.' })
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      'نام کاربری باید فقط شامل حروف انگلیسی، اعداد و علامت های - و ـ باشد.',
  });

export const emailType = z
  .string()
  .email()
  .trim()
  .min(4, { message: 'ایمیل شما باید حداقل ۴ حرفی باشد.' })
  .max(99, { message: 'ایمیل شما باید حداکثر ۹۹ حرفی باشد.' });
