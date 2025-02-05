import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  dynamicWord: string = ''; // Holds the current word to display
  currentIndex: number = 0; // Index to keep track of the current word

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.changeWord();
  }

  changeWord() {
    setInterval(() => {
      this.dynamicWord = this.words[this.currentIndex]; // Set the current word
      this.currentIndex = (this.currentIndex + 1) % this.words.length; // Move to the next word, loop back to start
    }, 3000); // Change word every 3 seconds (3000ms)
  }

  words: string[] = ['Full-Stack Web Developer', 'Mobile Developer', 'Software Engineer', 'IT Graduate']; // Array of words

}
