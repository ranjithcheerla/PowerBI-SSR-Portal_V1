export const mockUserPreferenceService = {
  getWidgetConfig: () => {
    return {};
  },
  setWidgetConfig: () => {},
  setGlobalAppSettings: () => {},
  getGlobalAppSettings: (key: string) => {
    return 'Page 1';
  },
  isCapabilityEnabled: (pageName: boolean) => false,
  getRootUserSitePreferences: () => {},
  savePreferences: () => {}
};
