import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addSnippet: FormGroup;
  example = { body: ""};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addSnippet = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      lang: this.fb.control('', Validators.required),
      body: this.fb.control('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.addSnippet.value);
  }
}
