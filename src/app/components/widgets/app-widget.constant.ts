import { WidgetCategory } from '@framework/core/models';
import { NewsComponent } from './news/news.component';

export const widgetCategories: WidgetCategory = {
  layout1: 'Graph API',
  layout2: 'CRM',
  page3: 'Sharepoint',
  all: 'All'
};

// Holds the Widget References which will be passed to the core framework for rendering!
export const appWidgets = {
  WID006: {
    COMPONENT: NewsComponent
  }
};
