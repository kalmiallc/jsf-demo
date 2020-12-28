import { Component, OnInit } from '@angular/core';
import { JsfDefinition }     from '@kalmia/jsf-common-es2015';
import { demoJsfDoc }        from '../playground/demo.jsf';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  jsfDoc: JsfDefinition = demoJsfDoc;

  constructor() { }

  ngOnInit(): void {
  }

}
