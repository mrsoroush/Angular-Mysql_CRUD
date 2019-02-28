import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IGame } from '../../models/game';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  
  @HostBinding('class') classes = 'row';
  game: IGame = { id: 0, title: '', description: '', image: '', created_at: new Date() };
  addGame: FormGroup;
  edit: boolean = false;
  
  constructor(private gamesService: GamesService,
             private router: Router,
             private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.addGame = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required),
    });

    const params = this.route.snapshot.params;
    if (params.id) {
      this.gamesService.getGame(params.id).subscribe(
        res => {
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }
  
  saveGame() {
    delete this.game.id;
    delete this.game.created_at;
    this.game = this.addGame.value;
    this.gamesService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    );
  }

  updateGame() {
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id, this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    );
  }
  
}
