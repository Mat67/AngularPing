import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormuleService {

  constructor() { }

  getFormule() {
    return [['A', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
        ['B', 'X'],
      ];
  }
}
