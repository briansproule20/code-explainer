"use client";
import Chat from '../Chat';
import { signIn, signOut, useEcho } from "@merit-systems/echo-next-sdk/client";
import { useState, useEffect } from "react";

export default function Home() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(null);
    const echoClient = useEcho();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userInfo = await echoClient.users.getUserInfo();
                console.log('User info:', userInfo);
                setUser(userInfo);
                setIsSignedIn(!!userInfo);
                
                // Get actual balance like npc-chat does
                if (userInfo) {
                    try {
                        const balanceInfo = await echoClient.balance.getBalance();
                        console.log('Balance info:', balanceInfo);
                        setBalance(balanceInfo.balance);
                    } catch (balanceError) {
                        console.log('Balance fetch failed:', balanceError);
                        setBalance(0);
                    }
                }
            } catch (error) {
                console.log('Auth check failed:', error);
                setIsSignedIn(false);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [echoClient]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Explain Code</h2>
          <p className="text-gray-600 mb-6">
            Sign in with Echo to start getting plain English explanations of your code snippets.
          </p>
          <button
            onClick={() => signIn()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Sign In with Echo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/code-explainer favicon.png" 
                  alt="Code Explainer" 
                  className="w-8 h-8 rounded-lg"
                />
                <h1 className="text-xl font-semibold text-gray-900 font-mono">Code Explainer</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Credit Balance */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">
                  {balance !== null ? `$${balance.toFixed(2)}` : 'Loading...'}
                </span>
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500">{user?.email || ''}</div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-1 rounded-md border border-gray-300 hover:border-gray-400 transition-colors"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <Chat />
          </div>
        </div>
      </main>
    </div>
  );
}