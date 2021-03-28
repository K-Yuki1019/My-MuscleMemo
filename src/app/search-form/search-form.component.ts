import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  form = this.fb.group({
    search: ['', []],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
