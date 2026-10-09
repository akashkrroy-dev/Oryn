'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Code } from 'reicon-react';
import Link from 'next/link';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const urlError = searchParams.get('error');

  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(
    urlError === 'OAuthSignin' || urlError === 'OAuthCallback'
      ? 'Error connecting with OAuth provider. Please check your credentials.'
      : null
  );

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    setError(null);
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex min-h-screen flex-col bg-primary font-helvetica text-primary-foreground">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-primary-foreground/10 px-6 py-4">
        <div className="flex items-center gap-2.5 text-primary-foreground">
          <Code size={22} />
          <span className="font-clash text-lg font-semibold tracking-tight">Oryn</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-primary-foreground/55 transition-colors hover:text-secondary-foreground"
        >
          Back to home <span aria-hidden="true">↗</span>
        </Link>
      </header>

      {/* Main: three columns, the center one holds the form */}
      <main className="grid flex-1 grid-cols-[1fr_minmax(0,460px)_1fr]">
        <div className="min-w-0" />

        <div className="flex items-center border-x border-primary-foreground/10 px-6 py-12">
          <div className="mx-auto w-full max-w-85">
            <p className="mb-5 font-mono text-xs tracking-wide text-primary-foreground">
              <span className="text-primary-foreground/50">ACCOUNT</span>
              <span className="mx-2.5 text-primary-foreground/50">/</span>
              <span>SIGN IN</span>
            </p>

            <h1 className="mb-2 font-clash text-3xl font-medium leading-[1.1] text-primary-foreground">
              Welcome back.
            </h1>
            <p className="mb-7 text-sm text-primary-foreground/55">
              Sign in to your workspace.
              <br />
              Pick a provider to continue.
            </p>

            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-lg border border-secondary-foreground/40 bg-secondary-foreground/10 px-4 py-3 text-sm text-secondary-foreground">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                disabled={!!oauthLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-secondary bg-secondary px-4 py-2.5 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                {oauthLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn('github')}
                disabled={!!oauthLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                {oauthLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
              </button>
            </div>

            <div className="mb-4 mt-6 h-px bg-primary-foreground/10" />

            <p className="text-xs leading-relaxed text-primary-foreground/50">
              By continuing, you agree to our{' '}
              <Link
                href="/terms"
                className="text-primary-foreground/70 underline underline-offset-[3px] hover:text-secondary-foreground"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-primary-foreground/70 underline underline-offset-[3px] hover:text-secondary-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="min-w-0" />
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/10 px-6 py-4 font-mono text-xs text-primary-foreground/40">
        <span>© 2026 Oryn</span>
        <span>Your workspace. Your identity.</span>
      </footer>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-primary text-primary-foreground/55">
          Loading...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}