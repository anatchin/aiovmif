import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LightboxModule } from 'ngx-lightbox';

import { DragDropDirective } from './drag-drop.directive';


import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UploadRoutingModule,
    ChartsModule,
    BsDropdownModule,
    LightboxModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ 
    UploadComponent,
    DragDropDirective
   ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UploadModule { }
