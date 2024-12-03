import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})

export class DefaultLoginLayoutComponent {
  @Input() title: string = ""; //title of the form
  @Input() primaryBtnText: string = ""; //sign in button
  @Input() secondaryBtnText: string = ""; //sign up button
  @Input() disablePrimaryBtn: boolean = true; // se o botao primary esta desabilitado
  @Output("submit") onSubmit = new EventEmitter();// quando for criar a funcao submit
  @Output("navigate") onNavigate = new EventEmitter();// quando for criar a funcao submit

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

}
