import express from 'express';
import { Strategy as GithubStrategy } from 'passport-github2';
import {
  executeFrameHandlerStrategy,
  executeRedirectStrategy,
  executeRefreshTokenStrategy,
} from '../PassportStrategyHelper';
import {
  OAuthProviderHandlers,
  AuthInfoBase,
  AuthInfoPrivate,
  RedirectInfo,
  AuthProviderConfig,
} from '../types';

export class GithubAuthProvider implements OAuthProviderHandlers {
  private readonly provider: string;
  private readonly providerConfig: AuthProviderConfig;
  private readonly _strategy: GithubStrategy;

  constructor(providerConfig: AuthProviderConfig) {
    this.provider = providerConfig.provider;
    this.providerConfig = providerConfig;
    // TODO: throw error if env variables not set?
    this._strategy = new GithubStrategy(
      { ...this.providerConfig.options },
      (
        accessToken: any,
        refreshToken: any,
        params: any,
        profile: any,
        done: any,
      ) => {
        console.log('====>', profile, accessToken, params);
        done(
          undefined,
          {
            profile,
            idToken: params.id_token,
            accessToken,
            scope: params.scope,
            expiresInSeconds: 10,
          },
          {
            refreshToken,
          },
        );
      },
    );
  }

  async start(req: express.Request, options: any): Promise<RedirectInfo> {
    return await executeRedirectStrategy(req, this._strategy, options);
  }

  async handler(
    req: express.Request,
  ): Promise<{ user: AuthInfoBase; info: AuthInfoPrivate }> {
    return await executeFrameHandlerStrategy(req, this._strategy);
  }

  async refresh(refreshToken: string, scope: string): Promise<AuthInfoBase> {
    return await executeRefreshTokenStrategy(
      this._strategy,
      refreshToken,
      scope,
    );
  }
}
