import GoogleProvider from 'next-auth/providers/google';

import { AuthOptions } from 'next-auth';

import SecretsManagerUtil from '@common/aws/SecretsManagerUtil';

export async function getAuthOptions(): Promise<AuthOptions> {
  // Only fetch secrets if we have the required environment variables
  if (!process.env.PROJECT_SECRET || !process.env.PROJECT_AWS_REGION) {
    // Return a minimal auth config for build time
    return {
      providers: [
        GoogleProvider({
          clientId: 'dummy-client-id',
          clientSecret: 'dummy-client-secret',
        })
      ],
      secret: 'dummy-secret',
      callbacks: {
        async jwt({ token, user, account }) {
          if (user && account) {
            if (account.access_token) {
              token.tokens = token.tokens || [];
              token.tokens.push(
                {
                  provider: account.provider,
                  accessToken: account.access_token
                }
              );
            }
          }

          return token;
        },

        async session({ session, token }) {
          session.tokens = token.tokens || [];
          return session;
        }
      }
    };
  }

  return {
    providers: [
      GoogleProvider({
        clientId: await SecretsManagerUtil.getSecretValue(process.env.PROJECT_SECRET, 'GOOGLE_CLIENT_ID', true),
        clientSecret: await SecretsManagerUtil.getSecretValue(process.env.PROJECT_SECRET, 'GOOGLE_CLIENT_SECRET', true),
      })
    ],
    secret: await SecretsManagerUtil.getSecretValue(process.env.PROJECT_SECRET, 'NEXTAUTH_SECRET', true),
    callbacks: {
      async jwt({ token, user, account }) {
        if (user && account) {
          if (account.access_token) {
            token.tokens = token.tokens || [];
            token.tokens.push(
              {
                provider: account.provider,
                accessToken: account.access_token
              }
            );
          }
        }

        return token;
      },

      async session({ session, token }) {
        session.tokens = token.tokens || [];
        return session;
      }
    }
  };
}
