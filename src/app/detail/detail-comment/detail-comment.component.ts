import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment, CommentWithUser } from '../../interfaces/comment';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-comment.component.html',
  styleUrls: ['./detail-comment.component.scss'],
})
export class DetailCommentComponent implements OnInit {
  @Input() noteId: string;
  userId: string = this.authService.uid;
  processing: boolean;
  user$: Observable<User>;
  allComments$: Observable<CommentWithUser[]>;

  form = this.fb.group({
    comment: [''],
  });

  constructor(
    private fb: FormBuilder,
    public commentService: CommentService,
    public authService: AuthService,
    private db: AngularFirestore
  ) {}

  sendComment(userId: string) {
    const comment = this.form.value.comment;
    const sendData: Omit<Comment, 'createdAt' | 'commentId'> = {
      noteId: this.noteId,
      userId,
      comment,
    };
    this.processing = true;
    this.commentService.sendComment(this.noteId, userId, comment);
    this.form.reset();
    this.processing = false;
  }

  ngOnInit(): void {
    this.allComments$ = this.commentService.getAllCommentsByNoteId(this.noteId);
  }
}
