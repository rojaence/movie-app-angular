import { trigger, state, style, animate, transition } from '@angular/animations';

export const slideDownAnimation = trigger('slideDownAnimation', [
  state('open', style({
    transform: 'translateY(0)',
    // height: '*'
  })),
  state('closed', style({
    transform: 'translateY(-100%)',
    // height: '0'
  })),
  transition('open => closed', [
    animate('0.2s ease')
  ]),
  transition('closed => open', [
    animate('0.2s ease')
  ])
]);
