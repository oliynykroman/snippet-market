import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnippetModel } from 'src/app/models/snippet.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, OnChanges {
  @Input() formData = new SnippetModel;
  @Output() onSubmit = new EventEmitter<FormGroup>();
  public snippetForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    //
  }
 
  ngOnInit(): void {
    this.formInit();
  }

  ngOnChanges() {
    if(this.formData) {
      this.snippetForm.controls['title'].setValue(this.formData[0].title);
      this.snippetForm.controls['description'].setValue(this.formData[0].description);
      this.snippetForm.controls['userId'].setValue(this.formData[0].userId);
      this.snippetForm.controls['lang'].setValue(this.formData[0].lang);
      this.snippetForm.controls['body'].setValue(this.formData[0].body);
    }
  }

  formInit() {
    this.snippetForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      userId: this.fb.control(this.userService.getUser()),
      lang: this.fb.control('', Validators.required),
      body: this.fb.control('', Validators.required),
    });
  }

  submit() {
    this.onSubmit.emit(this.snippetForm);
  }
}