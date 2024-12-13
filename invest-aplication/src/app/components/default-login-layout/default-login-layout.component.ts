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
  @Input() disablePrimaryBtn: boolean = true; // if the primary botton is disable 
  @Output("submit") onSubmit = new EventEmitter();// when the submit function is created
  @Output("navigate") onNavigate = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

}
