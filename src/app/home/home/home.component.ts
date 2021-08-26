import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteWithUser } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notes$: Observable<NoteWithUser[]>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
