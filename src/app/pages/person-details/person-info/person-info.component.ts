import { Component, Input } from '@angular/core';
import { IPersonDetails } from '../../../models/interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-person-info',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './person-info.component.html',
  styleUrl: './person-info.component.scss'
})
export class PersonInfoComponent {
  @Input({required: true}) data!: IPersonDetails;

  constructor(
  ) { }
}
