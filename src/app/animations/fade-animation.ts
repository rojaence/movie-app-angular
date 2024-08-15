import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  state('open', style({
    opacity: .5,
  })),
  state('closed', style({
    opacity: 1,
  })),
  transition('open => closed', [
    animate('0.2s ease')
  ]),
  transition('closed => open', [
    animate('0.2s ease')
  ])
]);
