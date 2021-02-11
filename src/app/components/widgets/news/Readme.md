# News Widget
  
  News Widget connects to the corresponding service URL and shows the data in the list view.

## Compatible CoreFramework version
    v1.0

## Inputs to the Widget

  widgetconfig

## Outputs from the Widget

  hideLoader
  widgetOutput

## Instructions for adding the widget to the UI Stater Kit

    NOTE: Before proceeding with the below steps, please add the ```News``` widget to your app in the Site Space portal.

  1. Download the News Widget from the source control.

  2. If it's zipped, unzip the widget and place the widget inside the Widget's component folder in the starter kit.
     Widgets folder is located here - ```app/components/widgets/components```

  3. Next step is to update ```app-widgets.constants.ts``` file which is located here ```app/components/widgets/```

  4. Map the component with the key which is generated in the Site Space Portal. Let's assume, Site Space portal generated 
     key is ```WID006``` and you will map the widget like below - 

     ``` WID006: {                              ```
     ```   COMPONENT: NewsComponent             ```
     ``` },                                     ```

  5. Add the widget reference to the ```dynamicComponents``` array in the ```app.module.ts``` file.

    NOTE: All the above steps will be automated using Angular Schematics!!!   
