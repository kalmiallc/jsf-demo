import { Injectable }                                        from '@angular/core';
import { JsfAbstractPageDataService, JsfBreadcrumbFragment } from '@kalmia/jsf-common-es2015';

@Injectable({
  providedIn: 'root'
})
export class JsfPageDataService extends JsfAbstractPageDataService {

  public getActiveBreadcrumbs(): JsfBreadcrumbFragment[] {
    return [];
  }

  public getActivePageTitle(): string {
    return 'Example title';
  }
}
