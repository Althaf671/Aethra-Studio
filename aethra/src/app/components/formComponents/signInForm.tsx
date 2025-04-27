'use client';
import { Form, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { error } from 'console';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
  });

const signInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        if (signInData?.ok) {
            toast.success("Login sukses!");
            router.push('/')
          } else {
            toast.error("Login gagal. Periksa email atau password.");
          }
        
          console.log(signInData);
    }


    return (
        <div className="flex flex-col justify-center items-center mt-20 mb-18">
          <div className="relative px-8 py-7 rounded-3xl text-white justify-center items-center z-100">
            <div className="absolute inset-0 bg-black/30 blur-sm h-full w-full rounded-3xl"></div>
    
            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mt-3 scale-z-100">
              <h1 className="text-[18.5px] text-center mb-6">Login your account</h1>

                <input
                    {...form.register('email')}
                    type="email"
                    placeholder="Email"
                    className="outline-none my-[8px] tracking-wider rounded-2xl bg-white/10 py-2 px-4 text-[15px]"
                />

                <input
                    {...form.register('password')}
                    type="password"
                    placeholder="Password"
                    className="outline-none my-[8px] tracking-wider rounded-2xl bg-white/10 py-2 px-4 text-[15px]"
                />

                {/* remember & forgot */}
              <div className="flex w-full max-h-4 justify-between items-center mt-0.5 px-1">
                <label className="flex justify-center items-center gap-[1px] scale-z-100">
                <input
                    type="checkbox"
                    name="remember"
                    className="cursor-pointer"
                  />
                  <label className="text-[10.5px] opacity-80 ml-1">Remember me</label>
                </label>
                <div className="flex max-w-25 justify-center items-center gap-1 scale-z-100">
                  <label className="text-[8px] underline italic tracking-[0.5px] opacity-80 cursor-pointer hover:opacity-100">
                    Forgot password?
                  </label>
                </div>
              </div>

    
            <button
              type="submit"
              className="login-btn w-full border-2 text-xl text-white border-white h-[42px] px-10 rounded-[20px] mt-15 tracking-[1.5px] font-semibold scale-z-100 cursor-pointer"
            >
                Login
            </button>

            {/* Already have an account? */}
            <div className='flex justify-between items-center px-3 mt-1.5 mb-1'>
                <hr className='h-[0.5px] w-full bg-white'></hr>
                <p className='px-2 text-[13px]'>or</p>
                <hr className='h-[0.5px] w-full bg-white'></hr>
            </div>

              {/* Google only in login */}
              <button
                type="button"
                className="login-btn w-full border-2 text-[14px] text-white border-white h-[42px] px-10 rounded-[20px] mt-1 tracking-[1.5px] font-semibold scale-z-100 cursor-pointer"
              >
                Login with Google
              </button>

            <div className='flex justify-center items-center text-[11px] mt-3.5'>
                <p>Doesn't have an account?</p>
                <span className='ml-1'>
                    <Link href='/register' className='register-login-text text-[13] underline'>Sign Up</Link>
                </span>
            </div>

            </form>
          </div>
        </div>
      );
}

export default signInForm;
