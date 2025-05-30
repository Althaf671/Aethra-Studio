'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

const FormSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(10),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormData = z.infer<typeof FormSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      toast.success('Account created')
      router.push('/login');
    } else {
      toast.error('Registration failed');
      console.error('Registration failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-15 mb-18">
      <div className="relative px-8 py-7 rounded-3xl text-white z-50">
        <div className="absolute inset-0 bg-black/30 blur-sm h-full w-full rounded-3xl" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3 p-4 pt-10 md:p-6 lg:p-10 z-50 relative">
          <h1 className="text-[20px] text-center mb-6">Register your Account</h1>

          <input
            {...register('name')}
            placeholder="Username"
            className="outline-none my-[8px] max-w-[300px] tracking-wider rounded-2xl bg-white/10 py-2 px-4 text-[15px]"
          />
          {errors.name && <p className="text-red-400 text-[10px] text-left ml-2 -my-1">{errors.name.message}</p>}

          <input
            {...register('email')}
            type="email"
            placeholder="Email@example.com"
            className="outline-none my-[8px] max-w-[300px] justify- tracking-wider rounded-2xl bg-white/10 py-2 px-4 text-[15px]"
          />
          {errors.email && <p className="text-red-400 text-[10px] text-left ml-2 -my-1">{errors.email.message}</p>}

          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="outline-none my-[8px] max-w-[300px] tracking-wider rounded-2xl bg-white/10 py-2 px-4 text-[15px]"
          />
          {errors.password && <p className="text-red-400 text-[10px] text-left ml-2 -my-1">{errors.password.message}</p>}

          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
            className="outline-none my-[8px] max-w-[300px] tracking-wider rounded-2xl bg-white/10 py-2 px-4 text-[15px]"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-[10px] text-left ml-2 -my-1">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="login-btn w-full text-xl border-2 text-white border-white h-[42px] px-10 rounded-[20px] mt-10 tracking-[1.5px] font-semibold"
          >
            Register
          </button>

          {/* Already have an account? */}
          <div className='flex justify-between items-center px-3 mt-3.5 mb-1'>
            <hr className='h-[0.5px] w-full bg-white'></hr>
            <p className='px-2 text-[13px]'>or</p>
            <hr className='h-[0.5px] w-full bg-white'></hr>
          </div>
          <div className='flex  justify-center items-center text-[11px]'>
            <p>Already have an account?</p>
            <span className='ml-1'>
                <Link href='/login' className='register-login-text text-[13] underline'>Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
