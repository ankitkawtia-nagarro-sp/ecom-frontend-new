// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const productBaseURL = 'http://34.29.82.157:8081';
const authServerURL = 'http://34.66.205.1:8080';

export const environment = {
  production: true,
  searchUrl : productBaseURL+ "/search",

  registerURL: authServerURL + "/user/create",
  loginUrl: authServerURL + "/user/login",
  logoutUrl: authServerURL+ "/logout"
};
