export interface App {
  appName: string;
  iconClass: string;
  url: string;
  openInNewTab: boolean;
  isFavorite: boolean;
}

export interface QuickView {
  defaultAppIndex: number;
  apps: QuickViewApp[];
}

export interface QuickViewApp {
  appName: string;
  active: string;
}

export interface Launcher {
  apps: App[];
  quickView: QuickView;
}
