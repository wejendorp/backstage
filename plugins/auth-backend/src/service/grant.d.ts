// declare module 'grant';

declare module '*.json' {
  const value: any;
  export default value;
}

/**
 * The GrantResponse interface is for the:
 * req.session.grant.response object in the
 * callback after OAuth is complete
 */
interface GrantResponse {
  access_token?: string; // EAAC...long-string...ZDZD
  /**
   * The id_token is returned only for OpenID Connect providers
   * requesting the openid scope.
   */
  id_token?: string;
  /**
   * refresh_token is optional
   */
  refresh_token?: string;
  raw?: {
    access_token: string; // EAAC...long-string...ZDZD
    expires_in: number; // 5183999
    /**
     * The id_token is returned only for OpenID Connect providers
     * requesting the openid scope.
     */
    id_token?: string;
    token_type: string; // bearer
  };
}

interface GrantOptionDefaults {
  /**
   * either http or https
   */
  protocol: 'http' | 'https';
  /**
   * your server's host name localhost:3000 | dummy.com:5000 | awesome.com
   */
  host: string;
  /**
   * transport to use to deliver the response data in your final callback
   * route querystring | session (defaults to querystring if omitted)
   */
  transport?: 'session' | 'querystring';
  /**
   * generate random state string on each authorization attempt
   * true | false (OAuth2 only, defaults to false if omitted)
   */
  state?: boolean;
}

interface Provider {
  /**
   * consumer_key or client_id of your OAuth app
   */
  key: string;
  /**
   * consumer_secret or client_secret of your OAuth app
   */
  secret: string;
  /**
   * array of OAuth scopes to request
   */
  scope: string[];
  /**
   * generate random nonce string on each authorization attempt
   * true | false (OpenID Connect only, defaults to false if omitted)
   */
  nonce?: boolean;
  /**
   * custom authorization parameters
   */
  custom_params?: Record<string, string>;
  /**
   * specific callback route to use for this provider only /callback | /done ...
   */
  callback: string;
}

interface DefaultOptions {
  defaults: GrantOptionDefaults;
}

type GrantProviders = Record<string, Provider>;

// TODO: Solve how to require that there's a "defaults" property
// This solution does not require that "defaults" is there.
type GrantOptions = GrantProviders | DefaultOptions;

declare module 'grant-express' {
  const grant: (options: GrantOptions) => import('express').RequestHandler<any>;
  export default grant;
}
