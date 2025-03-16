import { Component, inject } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
private _route = inject(Location);
  goBack():void{
    this._route.back();
  }

}
