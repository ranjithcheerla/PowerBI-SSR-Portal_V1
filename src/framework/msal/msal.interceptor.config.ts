import { PopupRequest, RedirectRequest, InteractionType } from '@azure/msal-browser';

// tslint:disable-next-line:interface-over-type-literal
export type MsalInterceptorConfig = {
    interactionType: InteractionType.Popup | InteractionType.Redirect;
    protectedResourceMap: Map<string, Array<string>>;
    authRequest?: PopupRequest | RedirectRequest;
};
