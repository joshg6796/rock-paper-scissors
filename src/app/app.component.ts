import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rock Paper Scissors';
  resultJSON;
  result: string;
  score = {
    player: 0,
    computer: 0
  }
  choices: Choice[] = 
  [
    {
      description : 'Rock',
      photo: '../assets/Rock-50.png',
    },
    {
      description : 'Paper',
      photo: '../assets/Paper-50.png',
    },
    {
      description : 'Scissors',
      photo: '../assets/Scissors-50.png',
    }
  ];

  playersChoice : Choice;
  computersChoice : Choice;

  setPlayersChoice(event){
    this.resultJSON = undefined;
    this.playersChoice = event;
  }

  playGame(){
    if(!this.playersChoice){
      alert('Please select a move in order to play.')
    } else{
      this.getResponse((resp)=>{
        this.resultJSON = JSON.parse(resp)
        this.computersChoice = this.choices.find(f =>{return f.description.toLowerCase() === this.resultJSON.computerChoice})
        this.result = this.resultJSON.result;
        this.updateScore()
      })
    }
  }

  getResponse(callback){
    var http = new XMLHttpRequest();
    var url = 'http://localhost:3000/api/match';
    var params = 'choice=' + this.playersChoice.description;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        } else if (http.readyState == 4 && http.status == 500) {
          alert('Internal Server Error: Please try again.')
        }
    }
    http.send(params);
  }

  displayResult(result){
    if(result === 'win'){
      return 'You Win'
    } else if (result === 'lose'){
      return 'You Lost'
    } else if(result === 'tie'){
      return 'Tie'
    }
  }

  updateScore(){
    if(this.result === 'win'){
      this.score.player++;
    } else if (this.result === 'lose'){
      this.score.computer++;
    } 
  }

  playAgain(){
    this.resultJSON = undefined;
    this.playersChoice = undefined;
    this.computersChoice = undefined;
  }
}

export interface Choice{
  description: string;
  photo: string;
}