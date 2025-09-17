import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export const authConfig: OpenIdConfiguration[] = [
  {
    configId: 'portal',
    authority: 'http://localhost:8080/realms/chronomed-patient',
    clientId: 'chronomed',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  {
    configId: 'staff',
    authority: 'http://localhost:8080/realms/chronomed-staff',
    clientId: 'chronomed',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
];
