import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormuleService {

  constructor() { }

  getFormule() {
    return [['A', 'U'],
        ['B', 'V'],
        ['C', 'W'],
        ['B', 'U'],
        ['A', 'W'],
        ['C', 'V'],
        ['D1', 'D1'],
        ['B', 'W'],
        ['C', 'U'],
        ['A', 'V'],
        ['D', 'X'],
        ['E', 'Y'],
        ['F', 'Z'],
        ['D2', 'D2'],
        ['E', 'X'],
        ['D', 'Z'],
        ['F', 'Y'],
        ['E', 'Z'],
        ['F', 'X'],
        ['D', 'Y'],
      ];
  }
}
