import { trigger, animate, transition, style, query, state } from '@angular/animations';

export let fade = trigger('fade',[
    transition(':enter',[style({opacity: 0}),animate('0.5s ease-in')]),
    transition(':leave',[animate(500),style({opacity: 0})]),
    
]);

export let inBotom = trigger('inBotom',[
    transition(':enter',[style({top: '-40px' ,opacity: 0}),animate('0.5s ease-in')]),
    transition(':leave',[animate(500),style({opacity: 0})]),
    
]);


export let leftFed = trigger('leftFed',[
    transition(':enter',[style({transform: 'translateX(20px)' ,opacity: 0}),animate('0.5s ease-in')]),
    transition(':leave',[animate('0.5s ease-out'),style({backgroundColor: 'red', transform: 'translateX(-100%)',opacity: 0})]),
    
]);

export let bottomFade = trigger('bottomFade',[
    transition(':enter',[style({transform: 'translatey(20px)' ,opacity: 0}),animate('0.5s ease-in')]),
    transition(':leave',[animate(500),style({opacity: 0})]),
    
]);


  