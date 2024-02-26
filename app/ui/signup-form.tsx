import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import Link from 'next/link';
import { createUser } from '../lib/actions';

export default function SingUpForm() {
  return (
    <form action={createUser} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please create account to continue.
        </h1>
        <div className="w-full">
        <div>
  <label
    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
   
  >
    Username
  </label>
  <div className="relative">
    <input
      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      id="username"
      type="text"
      name="username"
      placeholder="Enter your username"
      required
    />
    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
  </div>
</div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
        <p className={`${lusitana.className}  text-sm mt-6`}>
        Already have an account?{" "}
        <Link className="underline" href={"/login"}>
          Log in
        </Link>
      </p>
      </div>
    </form>
  );
}
function LoginButton() {
  return (
    <Button type="submit" className="mt-4 w-full">
      Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
