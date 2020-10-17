import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnippetModel } from 'src/app/models/snippet.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  @Input() formData = new SnippetModel;
  @Output() onSubmit = new EventEmitter<FormGroup>();
  public addSnippet: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    //
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addSnippet = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      userId: this.fb.control(this.userService.getUser()),
      lang: this.fb.control('', Validators.required),
      body: this.fb.control('', Validators.required),
    });
  }

  submit() {
    this.onSubmit.emit(this.addSnippet);
  }
}