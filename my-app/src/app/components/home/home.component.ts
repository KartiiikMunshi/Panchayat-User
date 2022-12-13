import { Component, OnInit, ViewChild } from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  isSearchSelected = false;
  isSearch : boolean = false;
  lang: any = [];
  searches : any;

  @ViewChild(MainComponent, { static: false })
  child !: MainComponent;
  
  constructor() {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.fireFilterEvents;
  }

  changelang(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  search(){
    this.isSearch = true;
  }

  fireFilterEvents(event: Event) {
    console.log("Welcome Main page from home");
    const input = (event.target as HTMLInputElement).value;
    // this.applyFilter(input);
    this.child.applyFilter(input);
  }

}
