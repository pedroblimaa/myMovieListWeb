import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  visible: boolean = false
  text: string = 'add'

  constructor() {}

  @Input() set modalData(data: any) {
    this.visible = data.visible
    this.text = data.text

    if (this.visible) {
      document.getElementsByTagName('body')[0].classList.add('modal-open')
    }
  }

  @Output() emiter = new EventEmitter<boolean>()

  close(doAction: boolean) {
    this.visible = false

    this.emiter.emit(doAction)

    document.getElementsByTagName('body')[0].classList.remove('modal-open')
  }

  ngOnInit(): void {}
}
