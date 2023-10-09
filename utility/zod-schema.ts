import { ZodErrorMap, ZodIssueCode, z } from 'zod';

// -------------- ERROR MAP --------------
const customErrorMap: ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case ZodIssueCode.invalid_type:
      if (error.expected === 'string') {
        return { message: 'لطفا در این فیلد فقط از متن ساده استفاده کنید.' };
      }
      break;

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
  z.string().email().min(4, { message: 'ایمیل باید حداقل ۴ حرف داشته باشد.' }),
  z
    .string()
    .trim()
    .length(11, {
      message: 'شماره تلفن باید ۱۱ رقم باشد. به طور مثال ۰۹۱۵.....',
    })
    // .min(11, { message: 'شماره تلفن باید ۱۱ رقم باشد.' })
    // .max(11, { message: 'شماره تلفن باید ۱۱ رقم باشد.' })
    .regex(/^09\d{9}$/, { message: 'فرمت شماره تلفن صحیح نیست.' }),
  z
    .string()
    .trim()
    .min(3, { message: 'نام کاربری باید حداقل ۳ حرفی باشد.' })
    .max(13, { message: 'نام کاربری باید حداکثر ۱۳ حرفی باشد.' })
    .regex(/^[a-z0-9_-]+$/),
]);

export const loginUserSchema = z.object({
  identifier: userIdentifierSchema,
  password: z
    .string()
    .min(8, { message: 'رمز عبور باید حداقل ۸ حرفی باشد.' })
    .max(48, { message: 'رمز عبور نمی تواند بیش از ۴۸ کاراکتر داشته باشد.' }),
});

// -------------- SIGN UP --------------

export const signupUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'نام کاربری باید حداقل ۳ حرفی باشد.' })
    .max(30, { message: 'نام کاربری باید حداکثر ۳۰ حرفی باشد.' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        'نام کاربری باید فقط شامل حروف و اعداد باشد. از کاراکتر های ویژه استفاده نکنید.',
    }),
  email: z
    .string()
    .trim()
    .email()
    .min(4, { message: 'ایمیل شما باید حداقل ۴ حرفی باشد.' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'رمز عبور باید حداقل ۸ حرفی باشد.' })
    .max(48, { message: 'رمز عبور باید حداکثر ۴۸ حرفی باشد.' }),
});
