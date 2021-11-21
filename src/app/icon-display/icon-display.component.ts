import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// The url length of the icon handler.
const URL_LENGTH = 13;

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.css']
})
export class IconDisplayComponent implements OnInit {

  let iconUrl: string;
  let oldIcon: HTMLLinkElement = document.querySelector('#favicon');

  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {
    iconUrl = this.router.url.slice(URL_LENGTH);
    console.warn(iconUrl);
    this.oldIcon.data = "/assets/icons" + iconUrl;
  }

}
