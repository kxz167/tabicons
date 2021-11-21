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

  iconUrl: string | undefined;
  oldIcon: HTMLLinkElement | null = document.querySelector('#tab-favicon');
  imageSelector: string = "/materialicons/24px.svg";

  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {
    this.iconUrl = this.router.url.slice(URL_LENGTH);
    console.warn(this.iconUrl);

    // If the old icon exists:
    if(this.oldIcon != null){
      // Set the link to the url.
      console.warn(this.oldIcon);
      this.oldIcon.href = "/assets/icons" + this.iconUrl + this.imageSelector;
    }
  }

}
