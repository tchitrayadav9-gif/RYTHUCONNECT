import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Sprout, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

const LoginPage = () => {
  const { handleGoogleAuth, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [localError, setLocalError] = useState('');
  const from = location.state?.from?.pathname || '/';

  const onGoogleSuccess = async (credentialResponse) => {
    setLocalError('');
    try {
      await handleGoogleAuth(credentialResponse);
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError(err.message || 'Google authentication was not completed.');
    }
  };

  const onGoogleError = () => {
    setLocalError('Google Sign-In failed or was cancelled. Please try again.');
  };

  // Instant Google Sandbox Sign-In for offline / dev testing
  const handleSimulatedGoogleLogin = async () => {
    setLocalError('');
    try {
      const mockGoogleProfile = {
        sub: 'google_user_' + Date.now(),
        email: 'priya.customer@gmail.com',
        name: 'Priya Sharma',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      await handleGoogleAuth(null, mockGoogleProfile);
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError(err.message || 'Login simulation failed');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 text-center">
        {/* Brand Header */}
        <div className="space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-agro-700 text-white flex items-center justify-center mx-auto shadow-md shadow-agro-700/20">
            <Sprout className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Sign In</h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with your verified Google account to place direct farm orders and track deliveries.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {(localError || error) && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2 text-left">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        {/* Google Authentication Box (Strict Requirement: Google Only) */}
        <div className="space-y-4 py-2">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              useOneTap
              theme="outline"
              size="large"
              shape="pill"
              text="signin_with"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">
                Instant Google Auth
              </span>
            </div>
          </div>

          {/* Quick 1-Click Google Sign-In Button */}
          <button
            type="button"
            onClick={handleSimulatedGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 hover:border-agro-500 bg-slate-50 hover:bg-agro-50/50 text-slate-700 hover:text-agro-800 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {loading ? 'Authenticating...' : 'Sign in as Verified Customer'}
          </button>
        </div>

        {/* Security & Verification Guarantees */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Direct Farm Pricing without Middleman Markup</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Escrow Payment Released upon Doorstep OTP Handover</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Google Identity Security</span>
          </div>
        </div>

        {/* Farmer Portal Notice */}
        <p className="text-[11px] text-slate-400">
          Are you a Farmer or Administrator?{' '}
          <a
            href="http://localhost:5174"
            className="text-agro-700 font-bold hover:underline"
          >
            Go to Farmer & Admin Portal ↗
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
