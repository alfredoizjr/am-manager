import { trigger, animate, transition, style, query, state } from '@angular/animations';

export let fade = trigger('fade',[
    transition(':enter',[style({opacity: 0}),animate('0.5s ease-in')]),
    transition(':leave',[animate(500),style({opacity: 0})]),
    
]);

  