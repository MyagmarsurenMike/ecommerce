'use client';

import Link from 'next/link';
import { Form, Input, Button, message } from 'antd';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type RegisterForm = {
  full_name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async ({ full_name, email, password }: RegisterForm) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name },
      },
    });

    if (error) {
      message.error(error.message);
      return;
    }

    message.success('Account created! Please check your email to confirm.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-semibold text-stone-dark">
            Create Account
          </h1>
          <p className="text-sm font-body text-stone-dark/50 mt-2">
            Join Lumina Home
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="full_name"
            label={<span className="text-sm font-body font-medium text-stone-dark">Full Name</span>}
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input size="large" placeholder="Jane Smith" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="text-sm font-body font-medium text-stone-dark">Email</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="text-sm font-body font-medium text-stone-dark">Password</span>}
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password size="large" placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<span className="text-sm font-body font-medium text-stone-dark">Confirm Password</span>}
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="••••••••" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="h-12 font-body font-semibold"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm font-body text-stone-dark/50">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-stone-accent hover:text-stone-dark transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
