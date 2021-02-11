import { PopupRequest, RedirectRequest, InteractionType } from '@azure/msal-browser';

// tslint:disable-next-line:interface-over-type-literal
export type MsalGuardConfiguration = {
  interactionType: InteractionType.Popup | InteractionType.Redirect;
  authRequest?: PopupRequest | RedirectRequest;
};
