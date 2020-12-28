import { BrowserModule }             from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  JSF_API_SERVICE,
  JSF_APP_CONFIG,
  JSF_HANDLERS,
  JSF_APP_PAGE_DATA,
  JSF_APP_ROUTER,
  JSF_DEVELOPMENT_MODE,
  JSF_RUNTIME_CONTEXT,
  JsfAppConfig,
  ModuleCacheService,
  JsfModule,
  JsfResponsiveService, KalJsfBuilderModule, JsfBuilderModule, JSF_THEME_GLOBAL_MODULE_FACTORY,
} from '@kalmia/jsf-app';
import { JsfRuntimeContext }               from '@kalmia/jsf-common-es2015';
import { Angulartics2RouterlessModule }    from 'angulartics2/routerlessmodule';
import { ApiService }                      from './jsf/api.service';
import { BrowserAnimationsModule }         from '@angular/platform-browser/animations';
import { HttpClientModule }                from '@angular/common/http';
import { JsfPageDataService }              from './jsf/jsf-page-data.service';
import { JsfRouterService }                                   from './jsf/jsf-router.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }     from '@kalmia/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { BuilderComponent }                from './jsf/builder/builder.component';
import { DropdownModule }                  from '../jsf-handlers/common/handlers/dropdown/app/dropdown.module';
import { RadioModule }                     from '../jsf-handlers/common/handlers/radio/app/radio.module';
import { ButtonToggleModule }              from '../jsf-handlers/common/handlers/button-toggle/app/button-toggle.module';
import { CodeEditorModule }                from '../jsf-handlers/common/handlers/code-editor/app/code-editor.module';
import { ColorPickerModule }               from '../jsf-handlers/common/handlers/color-picker/app/color-picker.module';
import { SliderModule }                    from '../jsf-handlers/common/handlers/slider/app/slider.module';
import { ChipListModule }                  from '../jsf-handlers/common/handlers/chip-list/app/chip-list.module';
import { ButtonToggleUnknownCustomModule } from '../jsf-handlers/common/handlers/button-toggle-unknown-custom/app/button-toggle-unknown-custom.module';
import { ButtonToggleAllNoneCustomModule } from '../jsf-handlers/common/handlers/button-toggle-all-none-custom/app/button-toggle-all-none-custom.module';
import { PlaygroundComponent }             from './jsf/playground/playground.component';
import { DefaultDefaultModule }            from './jsf-themes/themes/default/variants/default/default-default.module';
import { FileUploadTokenModule }           from '../jsf-handlers/common/handlers/file-upload-token/app/file-upload-token.module';

// ENABLE JSF CTRL + I DEBUG
(window as any)._diagnostics = true;

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Angulartics2RouterlessModule.forRoot(),
    /**
     * Jsf module for forms
     */
    JsfModule,
    JsfBuilderModule,
    /**
     * Import only if you need UI builder. We recommend in submodule.
     */
    KalJsfBuilderModule,
    BrowserAnimationsModule
  ],
  providers   : [
    {
      provide : MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {
        useUtc: true
      }
    },
    {
      provide : DateAdapter,
      useClass: MomentDateAdapter,
      deps    : [MAT_DATE_LOCALE, MAT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide : JSF_THEME_GLOBAL_MODULE_FACTORY,
      useValue: DefaultDefaultModule
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (moduleCacheService: ModuleCacheService) => () => {
        moduleCacheService.manualStore('common/dropdown', DropdownModule);
        moduleCacheService.manualStore('common/radio', RadioModule);
        moduleCacheService.manualStore('common/chip-list', ChipListModule);
        moduleCacheService.manualStore('common/button-toggle', ButtonToggleModule);
        moduleCacheService.manualStore('common/code-editor', CodeEditorModule);
        moduleCacheService.manualStore('common/color-picker', ColorPickerModule);
        moduleCacheService.manualStore('common/button-toggle-all-none-custom', ButtonToggleAllNoneCustomModule);
        moduleCacheService.manualStore('common/button-toggle-unknown-custom', ButtonToggleUnknownCustomModule);
        moduleCacheService.manualStore('common/file-upload-token', FileUploadTokenModule);
        moduleCacheService.manualStore('common/slider', SliderModule);
      },
      deps: [ModuleCacheService],
      multi: true,
    },

    /* JSF */
    {
      provide : JSF_APP_CONFIG,
      useValue: {
        themePath   : null,
        handlersPath: 'src/main/webapp/jsf/jsf-handlers/',
        poweredByUrl: 'Kalmia JSF',
        builder     : {
          disablePreviewThemeRendering: true,
          disableProxyPreviewRendering: true,
        }
      } as JsfAppConfig,
    },
    {
      provide : JSF_HANDLERS,
      useValue: []
    },
    {
      provide : JSF_RUNTIME_CONTEXT,
      useValue: {
        application: {
          language: 'en',
        },
      } as JsfRuntimeContext,
    },
    {
      provide    : JSF_API_SERVICE,
      useExisting: ApiService,
    },
    {
      provide    : JSF_APP_ROUTER,
      useExisting: JsfRouterService,
    },
    {
      provide    : JSF_APP_PAGE_DATA,
      useExisting: JsfPageDataService,
    },
    {
      provide   : JSF_DEVELOPMENT_MODE,
      useFactory: () => true,
    },
    JsfResponsiveService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
