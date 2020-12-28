import { Injectable }                                                                              from '@angular/core';
import { JsfAbstractRouter, JsfRouterNavigationOptionsInterface, JsfRouterTransferValueInterface } from '@kalmia/jsf-common-es2015';
import { ActivatedRoute, Router }                                                                  from '@angular/router';
import { isEmpty }          from 'lodash';

export const routerTransferFormValueProperty = '__JSF_TRANSFER_FORM_VALUE__';

function buildQueryString(queryParams: { [parameter: string]: string }) {
  const ret = [];
  for (const d in queryParams) {
    if (queryParams.hasOwnProperty(d)) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(queryParams[d]));
    }
  }
  return ret.join('&');
}

@Injectable({
  providedIn: 'root'
})
export class JsfRouterService extends JsfAbstractRouter {

  constructor(private router: Router) {
    super();
  }

  private get activatedRoute(): ActivatedRoute {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  async navigateTo(path: string, options?: JsfRouterNavigationOptionsInterface): Promise<boolean> {
    options = {
      reload  : false,
      relative: false,

      ...(options || {})
    };

    if (!options.type) {
      throw new Error(`Missing navigation type.`);
    }

    if (options.reload) {
      location.reload();
      return true;
    }

    if (options.type === 'absolute') {
      // Absolute navigation.
      if (options.query && !isEmpty(options.query)) {
        path = `${ path }?${ buildQueryString(options.query) }`;
      }

      if (options.openInNewWindow) {
        window.open(path);
      } else {
        window.location.replace(path);
      }
    } else if (options.type === 'app') {
      // Angular navigation.
      return this.router.navigate([path], {
        relativeTo         : options.relative ? this.activatedRoute : null,
        queryParams        : options.query || {},
        queryParamsHandling: options.queryParamsHandling || '',
        state              : {
          [routerTransferFormValueProperty]: options.transferFormValue
        }
      });

    } else {
      throw new Error(`Unknown navigation type '${ options.type }'`);
    }
  }

  async getTransferFormValue(): Promise<JsfRouterTransferValueInterface> {
    const navigation = this.router.getCurrentNavigation();

    if (navigation.extras && navigation.extras.state) {
      return navigation.extras.state && navigation.extras.state[routerTransferFormValueProperty] || null;
    }

    return null;
  }
}
