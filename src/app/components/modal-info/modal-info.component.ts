import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {
  message: string = ''
  type: string = 'info'
  visible: boolean = false
  startTransition: boolean = false

  constructor() {}

  @Input() set infoData(data: any) {
    this.message = data.message
    this.type = data.type
    this.visible = true

    if (this.visible) {
      setTimeout(() => {
        this.startTransition = true
        this.close()
      }, 3000)

      setTimeout(() => {
        this.visible = false
        this.startTransition = false
      }, 4000)
    }
  }

  @Output() closeModal = new EventEmitter<any>()

  close() {
    this.closeModal.emit()
  }

  ngOnInit(): void {}
}
