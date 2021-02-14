import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NoteWithUser } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-body-image-card',
  templateUrl: './body-image-card.component.html',
  styleUrls: ['./body-image-card.component.scss'],
})
export class BodyImageCardComponent implements OnInit {
  noteWithUser$: Observable<
    NoteWithUser[]
  > = this.noteService.getNotesWithImagesAndPublic(this.authService.uid);

  constructor(
    private noteService: NoteService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
}
