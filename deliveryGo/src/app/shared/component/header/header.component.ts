import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() verMenuLateral: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  verMenu() {
    this.verMenuLateral.emit(true);
  }

}
