import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {
  
  gameSubscription: Subscription;
  games: any = [];
  
  constructor(private gamesService: GamesService) { }
  
  ngOnInit() {
    this.gameSubscription = this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err)
      );
    }
    
    ngOnDestroy(): void {
      this.gameSubscription.unsubscribe();
    }
}
