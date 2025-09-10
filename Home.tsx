"use client";

import { signIn } from "@merit-systems/echo-next-sdk/client";

export const Home = () => {
  const handleSignIn = async () => {
    console.log('Attempting sign in...');
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}
    >
      Sign In
    </button>
  );
}