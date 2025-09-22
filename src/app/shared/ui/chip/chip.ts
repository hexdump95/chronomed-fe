import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.css'
})
export class Chip {
  @Input() label: string = '';
  @Output() removed: EventEmitter<void> = new EventEmitter();

  removeChip() {
    this.removed.emit();
  }

}
