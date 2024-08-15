import { trigger, state, style, animate, transition } from '@angular/animations';

export const growAnimation = trigger('growAnimation', [
  state('open', style({
    transform: 'scale(1)',
  })),
  state('closed', style({
    transform: 'scale(0)',
  })),
  transition('open => closed', [
    animate('0.2s ease')
  ]),
  transition('closed => open', [
    animate('0.2s ease')
  ])
]);
