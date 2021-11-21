import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// The url length of the icon handler.
const URL_LENGTH = 13;

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.css']
})
export class IconDisplayComponent implements OnInit, AfterViewInit {

  onAfterSVGSourced: boolean = false;

  @ViewChild("svgImage") svgImageView!: ElementRef;
  @ViewChild("svgObject") svgObjectView!: ElementRef;

  iconUrl!: string;   //The icon url given by user
  iconUri!: string;   //The icon asset path
  oldIcon: HTMLLinkElement | null = document.querySelector('#tab-favicon');
  imageSelector: string = "/materialicons/24px.svg";


  //Styling
  fillColor: string = "red";

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  //Callback once the svg object gets loaded
  svgLoaded(){
    if(this.onAfterSVGSourced){   //Do not run when setting data source
      console.warn("Loaded");
      let styleElement = this.renderer.createElement("style", "http://www.w3.org/2000/svg");
      let styleEntry = this.renderer.createText(":nth-child(2) { fill: " + this.fillColor + "; }");
      console.warn(styleElement);
      console.warn(styleEntry);
  
      this.renderer.appendChild(styleElement, styleEntry);
      let svgObjectViewNE = this.svgObjectView.nativeElement;
      let svgObject = svgObjectViewNE.contentDocument.children[0];
      console.warn(svgObject);

      this.renderer.appendChild(svgObject, styleElement);
      if(this.oldIcon != null){
        this.oldIcon.href = "data:image/svg+xml," + (new XMLSerializer().serializeToString(svgObject));
      }

    }
  }

  ngOnInit(): void {
    console.warn("Init");
    // Find the url that the user "searched" for.
    this.iconUrl = this.router.url.slice(URL_LENGTH);
    this.iconUri = "/assets/icons" + this.iconUrl + this.imageSelector;

    // If the old icon exists:
    // if(this.oldIcon != null){
    //   // Set the link to the url.
    //   // this.oldIcon.href = "/assets/icons" + this.iconUrl + this.imageSelector;
    //   this.renderer.setAttribute(this.svgObjectView.nativeElement, "data", this.iconUri);
    // }
  }

  ngAfterViewInit(){
    if(this.oldIcon != null){
      //Set the svgobject data
      this.renderer.setAttribute(this.svgObjectView.nativeElement, "data", this.iconUri);
      this.onAfterSVGSourced = true;  //Enable next SVG callback
    }
  }

}
