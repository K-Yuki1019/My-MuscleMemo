import { Component, OnInit, Input } from '@angular/core';
import { NoteWithUser } from 'src/app/interfaces/note';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() note: NoteWithUser;
  constructor() {}

  ngOnInit(): void {}
}
