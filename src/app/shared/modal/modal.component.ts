import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  @Input() title;
  @Input() body;
  @Input() buttonTitle: string = "Close";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }
  close() {
    this.activeModal.close('Close click');
  }
  dismiss() {
    this.activeModal.dismiss('Cross click');
  }
}
