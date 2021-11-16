import { User } from './../../models/user.module'
import { AuthService } from './../../services/auth.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    privateList: false,
  }
  privateListDisabled: boolean = false
  modalInfo: any = {
    visible: false,
    message: '',
    type: ''

  }
  privateList: boolean = false

  constructor(private service: AuthService) {}

  setModalInfo(message: string, type: string) {
    this.modalInfo.visible = true
    this.modalInfo.message = message
    this.modalInfo.type = type
  }

  setPrivateList() {

    if(this.privateList === this.user.privateList) {
      this.setModalInfo('You already have this option', 'error')
      return
    }

    this.privateListDisabled = true


    this.service.setPrivateList(this.user.privateList).subscribe({
      next: () => {
        this.privateListDisabled = false
        this.user.privateList = this.privateList
        this.setModalInfo('Private list updated', 'success')
      },
      error: (err: any) => {
        this.setModalInfo('Error updating private list', 'error')
        console.log(err)
      },
    })
  }

  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (data: any) => {
        this.user = data
        this.privateList = this.user.privateList
      },
      error: (err: any) => {
        console.log(err)
      },
    })
  }
}
