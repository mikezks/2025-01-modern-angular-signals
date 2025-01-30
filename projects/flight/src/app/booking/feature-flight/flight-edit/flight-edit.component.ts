import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';
import { FlightService } from '../../api-boarding';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-flight-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent {
  private store = inject(Store);
  private flightService = inject(FlightService);

  readonly id = input(0, { transform: numberAttribute });
  readonly flightResource = this.flightService.findByIdAsResource(this.id);

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor() {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    const effectRef = effect(() => {
      const flight = this.flightResource.value();
      if (flight) {
        this.editForm.patchValue(flight)
      }
    });

    effectRef.destroy();

    this.flightResource.set
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
