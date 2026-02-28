'use client';

import Link from 'next/link';
import { Form, Input, Button, message } from 'antd';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async ({ email, password }: LoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      message.error(error.message);
      return;
    }
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-semibold text-stone-dark">
            Sign In
          </h1>
          <p className="text-sm font-body text-stone-dark/50 mt-2">
            Welcome back to Lumina Home
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
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
            rules={[{ required: true, message: 'Please enter your password' }]}
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
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm font-body text-stone-dark/50">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-stone-accent hover:text-stone-dark transition-colors font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
