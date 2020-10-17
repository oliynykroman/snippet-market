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
  @Input() closeButtonTitle: string = "Close";
  @Input() confirmButtonTitle: string = null;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }
  confirm() {
    this.activeModal.close('confirm');
  }
  dismiss() {
    this.activeModal.close('dismiss');
  }
  close() {
    this.activeModal.close('close');
  }
}
