# Core Framework - Starter Kit

  Core Framework - Starter Kit is a boilerplate Angular project which comes with Core Framework. Main feature set includes -

  * **App Shell**
  * **Widget Store**
  * **Layouts with drag and drop functionality**
  * **Support for multi layout architecture - Layouts & Pages**
  * **Support for EMS Authentication**
  * **Support for EUM Analytics**
  * **API's for toggling Navigation bar, header etc.,**

> You can explore Core Framework related `Components`, `Services`, `Pipes`, `Directives`, `Interceptors`, `Guards` from the left menu.  

# Index

  * [Structure of the Project](#project_structure)
  * [How to configure Core Framework?](#configure)
  * [Core Framework Alias](#framework_alias)
  * [How to add a Global Widget](#global_widgets)
  * [Building for DEV, QA & PROD Environments](#builds)
  * [How to load error and help message inside widget?](#widgetErrorMessage)
  * [How to add backGroundColor to widget?](#WidgetBGColor)
  
  * API
      * [How to configure the header of my site?](#api_configure)
      * [How to set the title of the page next to the App logo?](#api_AppTitle)
      * [How to toggle Left Navigation Menu?](#api_toggleLeftNav)
      * [How to get logged in User details?](#api_loggedInUser)
      * [How to temporarily hold Application specific data?](#api_storeAppData)
      * [Core Framework API to trigger GET, POST & Delete Http methods](#api_http)
      * [Store & Retrieve values from Local Storage](#api_lstorage)
      * [EMS / ADAL Guard](#api_adalguard)
      * [How to refresh Pages?](#api_refreshPages)
      * [How to load the component in RightTrial?](#api_rightTrial)
      * [How to toggle RightTrial?](#api_rightTrialToggle)
      * [Ability for adding custom pages](#api_addCustomPage)
      * [Fluid and Boxed layouts changes](#api_layoutChanges)
      
> All the API's from the Framework is exposed under one name - `FrameworkService`. We recommend to invoke the method under this service. If you've already using other services for invoking methods provided by Framework, please discontinue to do so. 

## <a id="project_structure"></a>Structure of the Project

  ![Project folder structure](/docs_images/project_structure.png)

## <a id="configure"></a>How to configure Core Framework?
  * By default, Core Framework is wrapped inside the Starter Kit, which has sample implementation of Layouts & Full Page Modules. When you open the Core Framework in your favourite editor, and open the `app.module.ts` file. You will see `FrameWorkModule` in the `imports` of `NgModule` - 

  ```typescript
  FrameworkModule.configurations(config)
  ```

  * It takes the `Configuration` as parameter, which takes the below interface - 

  ```typescript
  export interface Configurations {
    /*
    > Mandatory   : True
    > Description :
                    Provide the title of the site. 
    */
    siteName: string; 
    /*
    > Mandatory   : True
    > Description :
                    Application specific unique key. Please create one using Site Space Portal or get in touch with Core FW team on how to generate it.
    */
    appKey: string; 
    /*
    > Mandatory   : True
    > Description :
                    Landing page url path. It can be updated based on the Application landing page. This gives flexibility to app team to load the respective module / component as landing or dashboard page. Wire it up as #route2 in app-routing module.
                    NOTE: This will be used as Home during 404 error.
    */
    landingPageUrlPattern?: string; 
    /*
    > Mandatory   : False
    > Description :
                    Takes the ADAL configuration for EMS Authentication. Take a look at the Core Framework - Stater Kit for reference configuration which can be passed as input.
    */
    adalConfig?: any;
    /*
    > Mandatory   : False
    > Description :
                    Configure the resources URLs for which token to be fecthed. Core Framework will automatically acquires token when app triggers an HTTP Call.
    */
    resources?: string[];
    /*
    > Mandatory   : False
    > Description :
                    Takes the End User Monitoring URL to which the analytics information will be posted.
    */
    eumUrl?: string;
    /*
    > Mandatory   : False
    > Description :
                    Takes the Angular Component as input which renders besides the Site Title. If you App has an requirement to show custom view next the title, then this is useful.
    */
    pageConfigComponent?: Component;
    /*
    > Mandatory   : False
    > Description :
                    Takes the Angular Component as input which renders besides the Site Title. If you App has an requirement to show custom view next the title, then this is useful.
    */
    siteTitleComponent?: Component;
    /*
    > Mandatory   : False
    > Description :
                    Takes the AppConfig interface as input for Application specific configurations. Please see below for more information on this.
    */
    appConfig?: AppConfig;
    /*
    > Mandatory   : False
    > Description :
                    Widgets which you pass in the field will be render by Framework.
                    Widget key mapping to be passed as input to this field. You can see Global Widget Catalog for adding an Widget for your app and how to update the mapping and pass the input.
    */
    widgets?: any;
    /*
    > Mandatory   : False
    > Description :
                    If you wish to highlight specific Category in the Widget Store which you navigate from particular page, then set this field.
                    Reference implemntation for this is available in UI Starter Kit.
    */
    widgetCategories?: any;
    /*
    > Mandatory   : False
    > Description :
                    Framework information will be logged. Some log information like - Version, Error information, any widget reference implmentation is not available etc.,
    */
    logging?: boolean;
    /*
    > Mandatory   : False
    > Description :
                    Angular component to be passed as input which will be rendered as Banner Component on top the layout model.
                    NOTE: This is applicable only for Layout Mode and NOT for Full Page Module.
      Usage       : pageKey: Component  // Each page can have specific Banner Component passed as input. pageKey is the key configured in the Site Space portal.             
    */
    pageBanners?: { '<pagekey>' : Component };
    /*
    > Mandatory   : True
    > Description :
                    It sets the mode of preferences  - Site & Widget to be read. It can be via `service` or `local`.
                    This option will be useful, if the app doesn't require to connect with the backend to read the configuration everytime while it loads.
                    
                    NOTE: If PrefMode.local option is selected, then `preferencePath` key should
                    be set with the corresponding paths of Site and Widget preferences.
    */
    preferencesMode: PrefMode;
    /*
    > Mandatory   : Optional - Mutual Exclusive
    > Description :
                    It allows to set the path for the Site & Widget Preferences json. This field becomes mandatory, if `PrefMode.local` option is selected.             
    */
    preferencePath?: PrefPath;
}
  ```
>  NOTE: You can see the reference implementation in the Core Framework - Starter Kit.

In the above Configuration, you've seen `AppConfig` type interface and that looks like this - 

```typescript
export interface AppConfig {
  /*
    > Mandatory   : False
    > Description :
                    Framework has implemented HTTP INterceptor which intercepts all outgoing and incoming HTTP Requests. Apart from that, if uses `resources` field in the above config to acquire token if there's any URL match.
    */
    enableInterceptor?: boolean;
    /*
    > Mandatory   : True
    > Description :
                    Pass the environment type - DEV, QA or PROD to Framework since Framework doesn't hold any relationship with the environments file.
    */
    appEnv: Environments;
    /*
    > Mandatory   : True
    > Description :
                    As of v1 of Core Framework, Authentication is tightly integrated with the Core Framework and you can turn off the Microsoft ADAL authentication system and provide other authentication system.

                    We highly recommend to keep this variable to true.

                    NOTE: Please see the documentation for details instrcution on how to use other authentication instead of EMS / Microsoft ADAL.
    */
    emsLoginEnabled: boolean;
}
``` 

* Open the `app.component.html`, and add you can see the below Framework custom tag like below - 
```typescript
  <app-framework-root></app-framework-root>
```

# <a id="framework_alias">Core Framework Alias

Core Framework provides alias to the services it provides like - Components, directives, pipes etc., All these are aliased in the Core Framework - Starter Kit file `tsconfig.json` and it goes like this -

```typescript
      "@framework/*": ["framework/modules/*"],
      "@framework/components/*": ["framework/modules/commonutil/components/*"],
      "@framework/pipes/*": ["framework/modules/commonutil/pipes/*"],
      "@framework/services/*": ["framework/modules/core/services/*"],
      "@framework/eum/*": ["framework/modules/eum/*"],
      "@framework/layout/*": ["framework/modules/layouts/components/layout/*"],
      "@framework/guards/*": ["framework/modules/core/guards/*"],
```

# <a id="global_widgets"></a>How to add a Global Widget?

1. Global Widgets are the widgets developed by different teams and contributed to the global Widget catalog. If you wish to the contribute widgets to this repository, please see    the instructions in the below link. 
2. Please visit the [ITSOC - Global Widgets Catalog](https://tfs.worldbank.org/tfs/ITSOC%20Collection/ITSOC-CoreFramework-Widgets) to get a snapshopt of widgets available for       download.
3. Each Widget has instuctions in the `Readme.md` file on how to add it to the UI Starter Kit.

# <a id="api_configure"></a>How to configure the header of my site?

1. Inject **`FrameworkService`** in to the constructor of the component.

```javascript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiSetHeader`** method to set the title, breadcrumb & toggle the Widget Store and Reset Widgets. 

```javascript
const header: Header = {
      title: 'Title of the page', // Set the title
      addWidget: false, // hide the widget store icon
      resetWidget: false, // hide the reset Widget icon
      breadcrumb : [{ label: 'Home', path: '' }] // Set the breadcrumb which for the site
    };
    this.fwService.apiSetHeader(header);
```

# <a id="api_AppTitle"></a>How to set the title of the page next to the App logo?

If the App Title doen't change, then you can set the Title in the `config` object for the Framework Module. If you wish to udpate the App Title based dynamically, then this API will be useful.

1. Inject **`FrameworkService`** in to the constructor of the component.

```javascript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiSetHeader`** method to set the title, breadcrumb & toggle the Widget Store and Reset Widgets. 

```javascript
    this.fwService.apiUpdateSiteTitle('my app title');
```


# <a id="api_toggleLeftNav"></a>How to toggle Left Navigation Menu?

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiToggleLeftNav`** method to toggle left navigation menu. 

```typescript
this.fwService.apiToggleLeftNav(false); //Hide the left navigation menu
```
# <a id="api_loggedInUser"></a>How to get logged in User details?

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiGetLoggedInUser`** method to fetch the user details. It returns an `Observable` which you've to subscribe to get the data.

```typescript
this.userService.apiGetLoggedInUser().subscribe(user => {
  console.log(`user details ${user}`);
});
```

NOTE: Core Framework will fire a call to Graph API to fetch the user details of the logged in user by Microsoft EMS (ADAL). As of Core Framework v1, there is no way to by pass this and fetch from other server or end point.

# <a id="api_storeAppData"></a>How to temporarily hold Application specific data?

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiSetAppData`** method to store any TypeScript valid type data with a key.

```typescript
const userInfo = {name: 'Bill', upi: '0000000'};
this.fwService.apiSetAppData('userInfo', userInfo);
```
2. Invoke the **`apiGetAppData`** method to retrieve the data stored with the particular key.

```typescript
const userInfo = this.fwService.apiGetAppData('userInfo');
console.log(userInfo); // Outputs: {name: 'Bill', upi: '0000000'}
```

# <a id="api_http"></a>API to trigger GET, POST & DELETE Http methods.

The Api Service has two methods - `get` & `post`

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiHttpGet`** method to fire a GET Http call.

```typescript
/* apiHttpGet method takes two parameters.
  1. URL - Mandatory field. Take an url string as parameter
  2. httpOptions - Optional Field. It takes the below format as input.  
     {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
Return Type: Observable<any>
*/ 
this.fwService.apiHttpGet('http://myurltofetchdata.com', httpOptions);
```

3. Invoke the **`apiHttpPost`** method to fire a POST Http call.

```typescript
/* apiHttpPost method takes two parameters.
  1. URL - Mandatory field. Take an url string as parameter
  2. body - Payload for the post call.
  3. httpOptions - Optional Field. It takes the below format as input.  
     {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
Return Type: Observable<any>
*/ 
this.fwService.apiHttpPost('http://myurltopostdata.com', body ,httpOptions);
```

```typescript
/* apiHttpDelete method takes two parameters.
  1. URL - Mandatory field. Take an url string as parameter
  2. body - Payload for the post call.
  3. httpOptions - Optional Field. It takes the below format as input.  
     {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
}
Return Type: Observable<any>
*/ 
this.fwService.apiHttpDelete('http://myurltodeletedata.com', httpOptions);
```

# <a id="api_lstorage"></a>Store & Retrieve values from Local Storage?

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiLSSet`** method to store any TypeScript valid type data with a key.

```typescript
const userInfo = {name: 'Bill', upi: '0000000'};
/*
  Parameters - Key, Value.
  Returns - Observable<string> : 'success' | 'failure'
*/
this.fwService.apiLSSet('userInfo', userInfo);
```
2. Invoke the **`apiLSGet`** method to retrieve the data stored with the particular key.

```typescript
/*
  Parameters - Key
  Returns - Observable<any> 
*/
this.fwService.apiLSGet('userInfo').subscribe(data => {
  console.log(data); // Outputs: {name: 'Bill', upi: '0000000'}
});

```

# <a id="api_adalguard"></a>EMS / ADAL Guard

1. EMS Guard does the guarding of the routes to be protected by ADAL authentication. Reference usage is available in the Core Framework - Starter Kit.

Please find the usage below for your quick reference. guarding the `/app-landing` route with `EMSGuard`

```typescript
{
    path: 'app-landing',
    component: AppLandingComponent,
    canActivate: [EMSGuard]
  },
```

## How to run the project in the development machine?

  Run `npm run local` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## <a id="builds"></a>Building for DEV, QA & PROD Environments

  Envionment files has been created for WB specific environments like - DEV, QA & PROD. All the configurations related to those environments can in those files.

* Run `npm run build:dev` for Dev build. It refers to DEV sepific configuration file `environment.dev.ts` under `environment` folder.
* Run `npm run build:qa` for QA build. It refers to QA sepific configuration file `environment.qa.ts` under `environment` folder.
* Run `npm run build:prod` for Prod build. It refers to POD sepific configuration file `environment.prod.ts` under `environment` folder.

> The build artifacts will be stored in the `dist/` directory.


# <a id="api_refreshPages"></a>How to refresh Pages?


1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiPageRefreshHook$`** method to trigger refresh the page. It returns an `Observable` which you've to subscribe and can also do some operation while refresh the page.

```typescript
this.fwService.apiPageRefreshHook$().subscribe(() => {
      console.log(`refresh working...`);
});
```

# <a id="api_rightTrial"></a>How to load the component in RightTrial?


1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiLoadRightNavDynamicPage`** method to load the given component in RightTrial

```typescript
     this.fwService.apiLoadRightNavDynamicPage(title, component, showToggle);
```

# <a id="api_rightTrialToggle"></a>How to toggle RightTrial?

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiToggleRightNav`** method to toggle RightTrial.

```typescript
this.fwService.apiToggleRightNav(); //parameter optional, can set True or false for show or hide
```

# <a id="widgetErrorMessage"></a>How to load error and help message inside widget?

1. Emit the below method **`showErrorMessage`** from Corresponding Widget error responce

```typescript
subscribe((response) => { // widget success responce
        this.items = response.value;
      }, (error) => {     // widget error responce
        const data = {
          message : 'Error message',
          type : ''      
        };
          this.hideLoading();
          this.showErrorMessage.emit(data); 
      });
```
2. Emit the below method **`helpMesssage`** from Corresponding Widget error responce

```typescript
subscribe((response) => { // widget success responce
        this.items = response.value;
      }, (error) => {  // widget error responce
        const data = {
          message : 'Help message',
          type : '' 
        };
          this.hideLoading();
          this.helpMesssage.emit(data); 
      });
```

# <a id="WidgetBGColor"></a>How to add backGroundColor to widget?

widget backGroundColor changes was enabled only for the 
1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```
2. Invoke the **`apiGetWidgetDetails`** Get the details of given widget

```typescript
 this.widgetconfig = this.fwService.apiGetWidgetDetails(this.sanitizedWidget);
 ```
3. set the background color for widget passed to the parameter
 ```typescript
    if (this.widgetconfig.widJson) {
      const widJson = JSON.parse(this.widgetconfig.widJson);
      if (widJson.widgetStyles) {
        this.widgetStyles = widJson.widgetStyles;
      }
    }
```

# <a id="api_addCustomPage"></a>Ability for adding custom pages

Addpage's was enabled only for the individual user's

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiGetLeftNavModel`** Get the list of  pages details.

```typescript
this.fwService.apiGetLeftNavModel(); 
```

3. Invoke the **`apiSetLeftNavModel`** Set the updated pages details.

```typescript
this.fwService.apiSetLeftNavModel(this.RootLeftNav); 
```

# <a id="api_layoutChanges"></a>Fluid and Boxed layouts change

Fluid and Boxed layouts change was enabled only for the individual user's

1. Inject **`FrameworkService`** in to the constructor of the component.

```typescript
constructor(private fwService: FrameworkService) { }
```

2. Invoke the **`apiSetGlobalAppSettings`** set the updated changes with corrosponding key and value

```typescript
this.fwService.apiSetGlobalAppSettings('layout', this.layout); // parameter should be key , value
```

3. Invoke the **`apiGetGlobalAppSettings`** get the updated value using corrosponding key
```typescript
this.fwService.apiGetGlobalAppSettings('layout'); // parameter should be key 
```
