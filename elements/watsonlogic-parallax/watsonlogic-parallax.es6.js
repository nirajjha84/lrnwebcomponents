import{html,Polymer}from"./node_modules/@polymer/polymer/polymer-legacy.js";let WatsonlogicParallax=Polymer({_template:html`
    <style>
      :host {
        display: block;
        --parallax-background-height: 300px;
        --parallax-slogan-top: 150px;
        --parallax-background-image: url("https://static.pexels.com/photos/2324/skyline-buildings-new-york-skyscrapers.jpg");
      }

      .parallax-background {
        background: var(--parallax-background-image);
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: var(--parallax-background-height);
        position: relative;
      }

      .slogan {
        bottom: 0;
        left: 0;
        opacity: 1;
        position: absolute;
        right: 0;
        text-align: center;
        top: var(--parallax-slogan-top);
        transform-origin: center top !important;
      }
    </style>

    <div class="parallax-background">
      <div id="slogan" class="slogan">[[parallaxText]]</div>
    </div>
  `,is:"watsonlogic-parallax",properties:{parallaxText:{type:String},parallaxImage:{type:String,notify:!0,reflectToAttribute:!0},parallaxImageHeight:{type:String,notify:!0,reflectToAttribute:!0}},ready:function(){let self=this;self.parallaxImage=self.parallaxImage||"https://static.pexels.com/photos/2324/skyline-buildings-new-york-skyscrapers.jpg";Number.isNaN(parseInt(self.parallaxImageHeight))?"300":parseInt(self.parallaxImageHeight);this.updateStyles({"--parallax-background-image":"url("+self.parallaxImage+")","--parallax-background-height":self.parallaxImageHeight+"px","--parallax-slogan-top":parseInt(self.parallaxImageHeight)/2+"px"})}});export{WatsonlogicParallax};