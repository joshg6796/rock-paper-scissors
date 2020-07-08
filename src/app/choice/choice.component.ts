import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Choice } from '../app.component';

@Component({
  selector: 'choice-component',
  templateUrl: './choice.html',
  styleUrls: ['./choice.scss']
})
export class ChoiceComponent{

  @Input() choice: Choice;
  @Input() playersChoice: Choice;
  @Input() isResult: boolean;
  @Output() selectedChoice = new EventEmitter<Choice>();

  selectChoice(){
    this.selectedChoice.emit(this.choice)
  }
}
