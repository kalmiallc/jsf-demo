import { Component }               from '@angular/core';
import { Bind, JsfBuilder, JsfDefinition } from '@kalmia/jsf-common-es2015';
import { demoJsfDoc }    from './demo.jsf';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

  jsfDoc: JsfDefinition = demoJsfDoc;

  builder: JsfBuilder;

  get value() {
    return this.builder?.getJsonValue();
  }

  @Bind()
  public formBuilderCreated(builder: JsfBuilder) {
    this.builder = builder;
  }

  @Bind()
  public jsfError(e: any) {
    console.error(e);
  }
}
