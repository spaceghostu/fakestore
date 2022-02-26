import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CartActions from './cart.actions';
import * as CartFeature from './cart.reducer';

@Injectable()
export class CartEffects {

    constructor(private readonly actions$: Actions) { }
}
