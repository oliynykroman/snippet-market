import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SnippetsService } from 'src/app/services/snippets.service';
import { UserService } from 'src/app/services/user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addSnippet: FormGroup;
  example = { body: "" };

  constructor(private fb: FormBuilder, private snippetService: SnippetsService, private userService: UserService) { }

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

  onSubmit() {
    this.snippetService.addSnippet(this.addSnippet.value).subscribe({
      next(data) {
      },
      error(msg) {
      }
    });
  }
}
