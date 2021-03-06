import{html,Polymer}from"./node_modules/@polymer/polymer/polymer-legacy.js";import{dom}from"./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js";import"./node_modules/@polymer/paper-icon-button/paper-icon-button.js";import"./node_modules/@polymer/paper-button/paper-button.js";import"./node_modules/@polymer/iron-icons/iron-icons.js";let ItemOverlayOps=Polymer({_template:html`
    <style>
      :host {
        display: block;
        outline: none;
      }
      #container {
        display: none;
        opacity: 0;
        background-color: transparent;
        transition: background-color 0.6s linear, visibility 0.6s linear,
          opacity 0.6s linear;
        visibility: hidden;
      }
      :host([edit-mode]) #container {
        display: block;
        opacity: 0.4;
        visibility: visible;
        background-color: var(--item-overlay-ops, #999999);
        position: absolute;
        z-index: 1;
        @apply --item-overlay-ops-container;
      }
      :host([edit-mode]) #container:hover,
      :host([edit-mode]) #container:focus,
      :host([focused]) #container {
        opacity: 0.8;
        background-color: var(--item-overlay-ops, #ffffff);
      }
      .ops {
        width: 100%;
        height: 39px;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid rgba(100, 100, 100, 0.4);
        text-align: center;
      }
      .ops paper-icon-button {
        display: inline-flex;
        width: 26px;
        height: 26px;
        padding: 1px;
        margin: 6px;
        color: #999999;
      }
      .ops paper-icon-button#cancel {
        width: 16px;
        height: 16px;
        padding: 0px;
        margin: 4px;
        position: absolute;
      }
      .ops paper-icon-button.active {
        color: #000000;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
      }
      .active-op {
        text-transform: capitalize;
        margin: 0;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
      }
      #workingarea {
        width: 100%;
        padding: 0;
        margin: 0 auto;
        align-content: center;
      }
      #workingarea paper-icon-button {
        width: 50%;
        height: 100%;
        display: inline-flex;
        min-width: unset;
        padding: 16px;
        margin: 0;
        border: none;
        border-radius: 0;
      }
      #workingarea #option1 {
        background-color: rgba(100, 255, 100, 0.6);
      }
      #workingarea #option2 {
        background-color: rgba(255, 100, 100, 0.6);
      }
      #workingarea #option1:hover,
      #workingarea #option1:focus {
        background-color: rgba(100, 255, 100, 1);
      }
      #workingarea #option2:hover,
      #workingarea #option2:focus {
        background-color: rgba(255, 100, 100, 1);
      }
      #workingarea {
        display: none;
      }
      #workingarea.move {
        display: flex;
      }
      #workingarea.move #option1,
      #workingarea.move #option2 {
        background-color: rgba(200, 200, 200, 0.5);
      }
      #workingarea.move #option1:hover,
      #workingarea.move #option1:focus,
      #workingarea.move #option2:hover,
      #workingarea.move #option2:focus {
        background-color: rgba(200, 200, 200, 1);
      }
      #workingarea.remove {
        display: flex;
      }
      #workingarea.duplicate {
        display: flex;
      }
    </style>
    <div id="container">
      <div class="ops">
        <paper-icon-button
          on-tap="_opTap"
          icon="icons:add"
          id="add"
          hidden\$="[[!add]]"
          title="Add to this"
        ></paper-icon-button>
        <paper-icon-button
          on-tap="_opTap"
          icon="icons:create"
          id="edit"
          hidden\$="[[!edit]]"
          title="Edit this"
        ></paper-icon-button>
        <paper-icon-button
          on-tap="_opTap"
          icon="icons:swap-horiz"
          id="move"
          hidden\$="[[!move]]"
          title="Move this"
        ></paper-icon-button>
        <paper-icon-button
          on-tap="_opTap"
          icon="icons:delete"
          id="remove"
          hidden\$="[[!remove]]"
          title="Delete this"
        ></paper-icon-button>
        <paper-icon-button
          on-tap="_opTap"
          icon="icons:content-copy"
          id="duplicate"
          hidden\$="[[!duplicate]]"
          title="Duplicate this"
        ></paper-icon-button>
        <paper-icon-button
          on-tap="_opTap"
          icon="icons:cancel"
          id="cancel"
          hidden\$="[[!__anyOp]]"
          title="Cancel"
        ></paper-icon-button>
      </div>
      <div class="active-op">[[activeTitle]]</div>
      <div id="workingarea" class\$="[[activeOp]]">
        <paper-icon-button
          on-tap="_optionSelected"
          id="option1"
          title="[[__option1Text]]"
          icon="[[__option1Icon]]"
        ></paper-icon-button>
        <paper-icon-button
          on-tap="_optionSelected"
          id="option2"
          title="[[__option2Text]]"
          icon="[[__option2Icon]]"
        ></paper-icon-button>
      </div>
    </div>
    <slot></slot>
  `,is:"item-overlay-ops",listeners:{focusin:"_inFocus",focusout:"_outFocus"},hostAttributes:{tabindex:"0"},properties:{editMode:{type:Boolean,reflectToAttribute:!0,value:!1},focused:{type:Boolean,reflectToAttribute:!0,value:!1},activeTitle:{type:String},activeOp:{type:String},add:{type:Boolean,value:!1},edit:{type:Boolean,value:!1},move:{type:Boolean,value:!1},fixedHeight:{type:Number,observer:"fixedHeightChanged"},disableAutoHeight:{type:Boolean,value:!1},remove:{type:Boolean,value:!1},duplicate:{type:Boolean,value:!1},__anyOp:{type:Boolean,value:!1}},attached:function(){setTimeout(()=>{this._windowResize()},5);window.addEventListener("resize",this._windowResize.bind(this))},detached:function(){window.removeEventListener("resize",this._windowResize.bind(this))},fixedHeightChanged:function(newValue,oldValue){if(newValue){if(!this.disableAutoHeight){this.$.container.style.height=this.fixedHeight+"px";this.$.workingarea.style.height=this.fixedHeight-80+"px"}}},_windowResize:function(e){let rect=this.getBoundingClientRect();this.$.container.style.width=rect.width+"px";if(!this.disableAutoHeight){if(!this.fixedHeight||typeof this.fixedHeight===typeof void 0){this.$.container.style.height=rect.height+"px";this.$.workingarea.style.height=rect.height-80+"px"}else{this.$.container.style.height=this.fixedHeight+"px";this.$.workingarea.style.height=this.fixedHeight-80+"px"}}else{this.$.workingarea.style.height=rect.height-80+"px"}},_opTap:function(e){let normalizedEvent=dom(e),local=normalizedEvent.localTarget;this.activeTitle=local.getAttribute("id");this.activeOp=local.getAttribute("id");this._resetActive();this.__anyOp=!0;local.classList.add("active");switch(this.activeOp){case"cancel":local.classList.remove("active");this.activeTitle=null;this.activeOp=null;this.__anyOp=!1;break;case"remove":this.__option1Icon="icons:check";this.__option1Text="Confirm deleting this";this.__option2Icon="icons:clear";this.__option2Text="Cancel";break;case"duplicate":this.__option1Icon="icons:check";this.__option1Text="Confirm duplicating this";this.__option2Icon="icons:clear";this.__option2Text="Cancel";break;case"move":this.__option1Icon="icons:arrow-back";this.__option1Text="Move item left";this.__option2Icon="icons:arrow-forward";this.__option2Text="Move item right";break;}let op={element:this,operation:this.activeOp};this.fire("item-overlay-op-changed",op)},_inFocus:function(e){if(this.editMode){this.focused=!0}},_outFocus:function(e){if(this.editMode){this.focused=!1}},_optionSelected:function(e){let normalizedEvent=dom(e),local=normalizedEvent.localTarget,ops={element:this,operation:this.activeOp,option:local.getAttribute("id")};this.fire("item-overlay-option-selected",ops);if("move"!=this.activeOp){this._resetActive();this.activeOp=null}},_resetActive:function(){this.$.add.classList.remove("active");this.$.edit.classList.remove("active");this.$.move.classList.remove("active");this.$.remove.classList.remove("active");this.$.duplicate.classList.remove("active")}});export{ItemOverlayOps};