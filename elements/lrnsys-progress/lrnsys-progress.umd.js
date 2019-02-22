!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-legacy.js"),require("@polymer/polymer/lib/utils/resolve-url.js"),require("@polymer/paper-progress/paper-progress.js"),require("@lrnwebcomponents/circle-progress/circle-progress.js"),require("@polymer/paper-button/paper-button.js"),require("@polymer/paper-tooltip/paper-tooltip.js"),require("@polymer/paper-styles/paper-styles.js"),require("@polymer/paper-spinner/paper-spinner.js"),require("@polymer/neon-animation/neon-animation.js"),require("@polymer/iron-icons/iron-icons.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-legacy.js","@polymer/polymer/lib/utils/resolve-url.js","@polymer/paper-progress/paper-progress.js","@lrnwebcomponents/circle-progress/circle-progress.js","@polymer/paper-button/paper-button.js","@polymer/paper-tooltip/paper-tooltip.js","@polymer/paper-styles/paper-styles.js","@polymer/paper-spinner/paper-spinner.js","@polymer/neon-animation/neon-animation.js","@polymer/iron-icons/iron-icons.js"],t):t((e=e||self).LrnsysProgress={},e.polymerLegacy_js,e.resolveUrl_js)}(this,function(e,t,s){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function a(){var e=n(['\n    <custom-style>\n      <style is="custom-style" include="paper-material-styles">\n        :host {\n          --paper-button-ink-color: var(\n            --lrnsys-progress-color,\n            var(--paper-green-500)\n          );\n          display: block;\n          transition: box-shadow var(--lrnsys-progress-circle-transition, 0.5s)\n              linear,\n            color var(--lrnsys-progress-circle-transition, 0.5s) ease-in-out,\n            background-color var(--lrnsys-progress-circle-transition, 0.5s)\n              ease-in-out;\n        }\n        :host([status="complete"]) .circle-wrapper {\n          --paper-button-ink-color: var(\n            --lrnsys-progress-complete-color,\n            var(--paper-green-500)\n          );\n          box-shadow: 0px 0px 0px 0.16px\n            var(--lrnsys-progress-complete-color, var(--paper-green-900));\n        }\n        :host([status="disabled"]) .circle-wrapper {\n          box-shadow: none;\n        }\n        :host([status="available"]) .circle-wrapper {\n          box-shadow: none;\n        }\n        :host([active]) .circle-wrapper {\n          box-shadow: 0px 0px 0px 0.16px var(--google-grey-500, #555555);\n        }\n        .circle-wrapper {\n          border-radius: 100%;\n        }\n        .button {\n          margin: 0;\n          padding: 0;\n          display: flex;\n          min-width: 40px;\n          border-radius: 100%;\n        }\n        paper-button {\n          width: var(--lrnsys-progress-circle-size, 40px);\n          height: var(--lrnsys-progress-circle-size, 40px);\n        }\n        circle-progress {\n          margin: 0;\n          --circle-progress-width: var(--lrnsys-progress-circle-size, 40px);\n          --circle-progress-height: var(--lrnsys-progress-circle-size, 40px);\n          --circle-progress-stroke-color: var(\n            --lrnsys-progress-color,\n            var(--paper-green-500)\n          );\n          --circle-progress-bg-stroke-color: var(\n            --lrnsys-progress-container-color,\n            var(--google-grey-300)\n          );\n          --circle-progress-transition: 0.5s;\n          --circle-progress-stroke-linecap: square;\n          transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out;\n        }\n        paper-spinner {\n          display: block;\n          font-size: 16px;\n          width: var(--lrnsys-progress-spinner-size, 32px);\n          height: var(--lrnsys-progress-spinner-size, 32px);\n          position: absolute;\n          z-index: 1;\n          margin: 4px;\n          padding: 0;\n          visibility: visible;\n          opacity: 1;\n          transition: visibility 0.4s, opacity 0.4s ease;\n        }\n        paper-spinner.multi {\n          --paper-spinner-layer-1-color: var(--paper-purple-500);\n          --paper-spinner-layer-2-color: var(--paper-cyan-500);\n          --paper-spinner-layer-3-color: var(--paper-blue-grey-500);\n          --paper-spinner-layer-4-color: var(--paper-amber-500);\n        }\n        .transition {\n          opacity: 0.4;\n          width: calc(var(--lrnsys-progress-icon-size, 24px) - 8px);\n          height: calc(var(--lrnsys-progress-icon-size, 24px) - 8px);\n        }\n        iron-icon {\n          visibility: visible;\n          opacity: 1;\n          transition: width 0.1s linear, height 0.1s linear,\n            visibility 0.4s ease, opacity 0.4s ease;\n          width: var(--lrnsys-progress-icon-size, 24px);\n          height: var(--lrnsys-progress-icon-size, 24px);\n        }\n        .disabled {\n          background-color: var(\n            --lrnsys-progress-disabled-color,\n            var(--google-grey-500)\n          );\n          color: white;\n        }\n        .loading {\n          background-color: white;\n          color: black;\n        }\n        .finished iron-icon:not(.activeIcon) {\n          width: calc(var(--lrnsys-progress-icon-size, 24px) - 8px);\n          height: calc(var(--lrnsys-progress-icon-size, 24px) - 8px);\n        }\n        .available {\n          background-color: var(\n            --lrnsys-progress-active-color,\n            var(--google-grey-300)\n          );\n          color: var(\n            --lrnsys-progress-active-text-color,\n            var(--google-grey-500)\n          );\n        }\n        .activeIcon {\n          color: black;\n        }\n        .complete .activeIcon {\n          color: white;\n        }\n        :host([active]) .complete .activeIcon,\n        :host([active]) .finished .activeIcon {\n          color: black;\n        }\n        .complete,\n        .finished {\n          background-color: var(\n            --lrnsys-progress-container-color,\n            var(--paper-green-500)\n          );\n          color: white;\n        }\n        :host([active]) circle-progress {\n          background-color: white;\n          color: black;\n        }\n        .listview-title {\n          font-size: 16px;\n          padding: 0;\n          margin: 0;\n        }\n        .description-content {\n          font-size: 8px;\n          font-style: italic;\n        }\n        .circle-wrapper {\n          display: inline-block;\n        }\n        .listview {\n          height: 32px;\n          padding: 4px 0;\n          margin: 0;\n          vertical-align: top;\n        }\n        .link {\n          height: 40px;\n          width: 100%;\n        }\n        :host([list-view]) .button {\n          margin: 0;\n          padding: 0;\n          display: block;\n          min-width: 40px;\n          border-radius: 0;\n        }\n      </style>\n    </custom-style>\n    <paper-tooltip\n      hidden$="[[!toolTip]]"\n      for="button"\n      position="bottom"\n      offset="8"\n      animation-delay="0"\n    >\n      [[label]]\n    </paper-tooltip>\n    <paper-button\n      id="button"\n      class="button"\n      disabled$="[[disabled]]"\n      title="[[label]]"\n    >\n      <span class="circle-wrapper">\n        <paper-spinner\n          active$="[[loading]]"\n          hidden$="[[!loading]]"\n          class="multi"\n          alt$="Loading content for [[label]]"\n        ></paper-spinner>\n        <circle-progress\n          class$="[[status]]"\n          value="[[value]]"\n          max="[[max]]"\n          stroke-width="[[strokeWidth]]"\n          angle="180"\n        >\n          <iron-icon\n            id="icon"\n            icon="[[activeIcon]]"\n            hidden$="[[!activeIcon]]"\n          ></iron-icon>\n          <slot name="image"></slot>\n        </circle-progress>\n      </span>\n      <span hidden$="[[!listView]]" id="listview" class="listview">\n        <h3 class="listview-title">[[label]]</h3>\n        <div class="description-content">\n          <slot name="description"></slot> <slot></slot>\n        </div>\n      </span>\n    </paper-button>\n  ']);return a=function(){return e},e}function r(){var e=n(['\n    <custom-style>\n      <style is="custom-style" include="paper-material-styles">\n        :host {\n          display: block;\n          margin-top: 24px;\n        }\n        :host([size="tiny"]) {\n          font-size: 12.8px;\n        }\n        :host([size="small"]) {\n          font-size: 19.2px;\n        }\n        :host([size="medium"]) {\n          font-size: 25.6px;\n        }\n        :host([size="large"]) {\n          font-size: 44.8px;\n        }\n        :host([size="x-large"]) {\n          font-size: 64px;\n        }\n        :host([size="epic"]) {\n          font-size: 96px;\n        }\n        #circle-container {\n          display: flex;\n          justify-content: space-between;\n          margin: -24px 0 0 0;\n          padding: 0;\n          list-style: none;\n        }\n        .progress-title {\n          position: absolute !important;\n          clip: rect(1px 1px 1px 1px); /* IE6, IE7 */\n          clip: rect(1px, 1px, 1px, 1px);\n          overflow: hidden;\n          height: 1px;\n        }\n        paper-progress {\n          --paper-progress-height: 8px;\n          --paper-progress-transition-duration: 0.5s;\n          --paper-progress-transition-timing-function: ease;\n          --paper-progress-transition-delay: 0.4s;\n          width: 100%;\n        }\n        /* required to get the box shadow above the progress bar */\n        .circle-node {\n          z-index: 1;\n        }\n        ul#circle-container li.circle-node {\n          list-style-type: none;\n        }\n\n        :host([vertical]) {\n          width: max-content;\n        }\n        :host([vertical]) #circle-container {\n          display: block;\n        }\n        :host([vertical]) paper-progress {\n          display: none !important;\n        }\n        :host([vertical]) lrnsys-progress-circle {\n          margin: 16px 0;\n          padding: 0;\n          width: 100%;\n        }\n\n        lrnsys-progress-circle {\n          width: 40px;\n          height: 40px;\n          --lrnsys-progress-circle-size: 40px;\n          --lrnsys-progress-spinner-size: 32px;\n          --lrnsys-progress-icon-size: 24px;\n          --paper-spinner-stroke-width: 1.2px;\n        }\n      </style>\n    </custom-style>\n    <iron-ajax\n      id="ajax"\n      url="[[activeNodeURL]]"\n      handle-as="json"\n      last-error="{{nodeDataError}}"\n      on-response="handleNodeResponse"\n    ></iron-ajax>\n    <h3 class="progress-title">[[title]]</h3>\n    <paper-progress\n      id="progress"\n      value="[[overallPercentage]]"\n    ></paper-progress>\n    <ul id="circle-container">\n      <template is="dom-repeat" items="[[items]]" as="item">\n        <li class="circle-node">\n          <lrnsys-progress-circle\n            play-finish-sound="[[soundFinish]]"\n            play-sound="[[sound]]"\n            complete-sound="[[completeSound]]"\n            finished-sound="[[finishedSound]]"\n            active="[[_isActive(index, active)]]"\n            step="[[index]]"\n            label="[[item.title]]"\n            icon="[[item.metadata.icon]]"\n            icon-complete="[[item.metadata.iconComplete]]"\n            data-url="[[item.metadata.dataUrl]]"\n            url="[[item.location]]"\n            status="[[item.metadata.status]]"\n            value="[[item.metadata.value]]"\n            max="[[item.metadata.max]]"\n            stroke-width="[[strokeWidth]]"\n            tool-tip="[[!vertical]]"\n            list-view="[[vertical]]"\n            class$="[[size]]"\n          >\n            <span slot="description">[[item.description]]</span>\n          </lrnsys-progress-circle>\n        </li>\n      </template>\n    </ul>\n  '],['\n    <custom-style>\n      <style is="custom-style" include="paper-material-styles">\n        :host {\n          display: block;\n          margin-top: 24px;\n        }\n        :host([size="tiny"]) {\n          font-size: 12.8px;\n        }\n        :host([size="small"]) {\n          font-size: 19.2px;\n        }\n        :host([size="medium"]) {\n          font-size: 25.6px;\n        }\n        :host([size="large"]) {\n          font-size: 44.8px;\n        }\n        :host([size="x-large"]) {\n          font-size: 64px;\n        }\n        :host([size="epic"]) {\n          font-size: 96px;\n        }\n        #circle-container {\n          display: flex;\n          justify-content: space-between;\n          margin: -24px 0 0 0;\n          padding: 0;\n          list-style: none;\n        }\n        .progress-title {\n          position: absolute !important;\n          clip: rect(1px 1px 1px 1px); /* IE6, IE7 */\n          clip: rect(1px, 1px, 1px, 1px);\n          overflow: hidden;\n          height: 1px;\n        }\n        paper-progress {\n          --paper-progress-height: 8px;\n          --paper-progress-transition-duration: 0.5s;\n          --paper-progress-transition-timing-function: ease;\n          --paper-progress-transition-delay: 0.4s;\n          width: 100%;\n        }\n        /* required to get the box shadow above the progress bar */\n        .circle-node {\n          z-index: 1;\n        }\n        ul#circle-container li.circle-node {\n          list-style-type: none;\n        }\n\n        :host([vertical]) {\n          width: max-content;\n        }\n        :host([vertical]) #circle-container {\n          display: block;\n        }\n        :host([vertical]) paper-progress {\n          display: none !important;\n        }\n        :host([vertical]) lrnsys-progress-circle {\n          margin: 16px 0;\n          padding: 0;\n          width: 100%;\n        }\n\n        lrnsys-progress-circle {\n          width: 40px;\n          height: 40px;\n          --lrnsys-progress-circle-size: 40px;\n          --lrnsys-progress-spinner-size: 32px;\n          --lrnsys-progress-icon-size: 24px;\n          --paper-spinner-stroke-width: 1.2px;\n        }\n      </style>\n    </custom-style>\n    <iron-ajax\n      id="ajax"\n      url="[[activeNodeURL]]"\n      handle-as="json"\n      last-error="{{nodeDataError}}"\n      on-response="handleNodeResponse"\n    ></iron-ajax>\n    <h3 class="progress-title">[[title]]</h3>\n    <paper-progress\n      id="progress"\n      value="[[overallPercentage]]"\n    ></paper-progress>\n    <ul id="circle-container">\n      <template is="dom-repeat" items="[[items]]" as="item">\n        <li class="circle-node">\n          <lrnsys-progress-circle\n            play-finish-sound="[[soundFinish]]"\n            play-sound="[[sound]]"\n            complete-sound="[[completeSound]]"\n            finished-sound="[[finishedSound]]"\n            active="[[_isActive(index, active)]]"\n            step="[[index]]"\n            label="[[item.title]]"\n            icon="[[item.metadata.icon]]"\n            icon-complete="[[item.metadata.iconComplete]]"\n            data-url="[[item.metadata.dataUrl]]"\n            url="[[item.location]]"\n            status="[[item.metadata.status]]"\n            value="[[item.metadata.value]]"\n            max="[[item.metadata.max]]"\n            stroke-width="[[strokeWidth]]"\n            tool-tip="[[!vertical]]"\n            list-view="[[vertical]]"\n            class\\$="[[size]]"\n          >\n            <span slot="description">[[item.description]]</span>\n          </lrnsys-progress-circle>\n        </li>\n      </template>\n    </ul>\n  ']);return r=function(){return e},e}t.Polymer({_template:t.html(a()),is:"lrnsys-progress-circle",listeners:{tap:"tapEventOn",mouseover:"focusOn",mouseout:"focusOff","focused-changed":"focusEvent"},properties:{value:{type:Number,value:0,notify:!0,reflectToAttribute:!0,observer:"_testValueComplete"},toolTip:{type:Boolean,value:!0,reflectToAttribute:!0},listView:{type:Boolean,value:!0,reflectToAttribute:!0},icon:{type:String,value:"icons:description",reflectToAttribute:!0},iconComplete:{type:String,value:"icons:description",reflectToAttribute:!0},loadingIcon:{type:String,value:"hourglass-full",reflectToAttribute:!0},finishedIcon:{type:String,value:"thumb-up",reflectToAttribute:!0},activeIcon:{type:String,notify:!0,computed:"_getActiveIcon(icon, iconComplete, status)"},step:{type:Number,value:0,reflectToAttribute:!0},active:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0},status:{type:String,value:"available",reflectToAttribute:!0,notify:!0,observer:"_statusChange"},disabled:{type:Boolean,computed:"_disableStatus(status)"},loading:{type:Boolean,computed:"_loadingStatus(status)"},finished:{type:Boolean,computed:"_finishedStatus(status)"},max:{type:String,reflectToAttribute:!0},__chimed:{type:Boolean,value:!1},__finishchimed:{type:Boolean,value:!1},url:{type:String,value:"#",reflectToAttribute:!0},dataUrl:{type:String,value:!1,reflectToAttribute:!0},strokeWidth:{type:Number,value:4},focusState:{type:Boolean,value:!1},playSound:{type:Boolean,value:!1,reflectToAttribute:!0},playFinishSound:{type:Boolean,value:!1,reflectToAttribute:!0},completeSound:{type:String,value:s.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href))+"assets/complete.mp3",reflectToAttribute:!0},finishedSound:{type:String,value:s.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href))+"assets/finished.mp3",reflectToAttribute:!0},_bubbleProgress:{type:Object,value:{25:!1,50:!1,75:!1}}},ready:function(e){this._bubbleProgress={25:!1,50:!1,75:!1}},_testValueComplete:function(e,t){e>=this.max&&"available"==this.status?this.status="complete":e/this.max>=.75&&!this._bubbleProgress[75]?(this.fire("node-percent-milestone",{percentage:75}),this._bubbleProgress[75]=!0):e/this.max>=.5&&!this._bubbleProgress[50]?(this.fire("node-percent-milestone",{percentage:50}),this._bubbleProgress[50]=!0):e/this.max>=.25&&!this._bubbleProgress[25]&&(this.fire("node-percent-milestone",{percentage:25}),this._bubbleProgress[25]=!0)},focusEvent:function(e){this.disabled||"loading"==this.status||(this.focusState?(this.$.icon.icon=this.icon,this.$.icon.classList.add("activeIcon")):("complete"!=this.status&&"finished"!=this.status||(this.$.icon.icon=this.activeIcon),this.$.icon.classList.remove("activeIcon")),this.focusState=!this.focusState)},focusOn:function(e){this.disabled||"loading"==this.status||(this.$.icon.icon=this.icon,this.$.icon.classList.add("activeIcon"))},focusOff:function(e){this.disabled||"loading"==this.status||("complete"!=this.status&&"finished"!=this.status||(this.$.icon.icon=this.activeIcon),this.$.icon.classList.remove("activeIcon"))},tapEventOn:function(e){var t=e.target;this.fire("node-is-active",{target:t})},_getActiveIcon:function(e,t,s){if("undefined"!==i(e)){var n=e;return"loading"==s?(n=this.loadingIcon,this.$.icon.classList.add("transition")):"finished"==s?n=this.finishedIcon:"complete"==s&&"undefined"!==i(t)?(this.playSound&&!this.__chimed&&this._playSound(),n=t):this.$.icon.classList.remove("transition"),n}return!1},_playSound:function(){"complete"==this.status?(window.audio=new Audio(this.completeSound),this.__chimed=!0):"finished"==this.status?(window.audio=new Audio(this.finishedSound),this.__finishchimed=!0):window.audio=new Audio,window.audio.play()},_loadingStatus:function(e){return"loading"==e},_finishedStatus:function(e){return"finished"==e&&(this.playFinishSound&&!this.__finishchimed&&this._playSound(),!0)},_statusChange:function(e,t){"undefined"!==i(t)&&e!==t&&this.fire("node-status-change",{status:e})},_disableStatus:function(e){return"disabled"==e}});var o=t.Polymer({_template:t.html(r()),is:"lrnsys-progress",listeners:{"node-is-active":"_bubbleUpChangeActive","node-status-change":"_statusChanged"},properties:{disableAjaxCalls:{type:Boolean,value:!1,reflectToAttribute:!0},items:{type:Array,value:[],notify:!0,observer:"_itemsChanged"},sound:{type:Boolean,value:!1,reflectToAttribute:!0},soundFinish:{type:Boolean,value:!1,reflectToAttribute:!0},completeSound:{type:String,value:s.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href))+"lib/assets/complete.mp3",reflectToAttribute:!0},finishedSound:{type:String,value:s.pathFromUrl(decodeURIComponent("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href))+"lib/assets/finished.mp3",reflectToAttribute:!0},title:{type:String,value:"Steps to completion",reflectToAttribute:!0},keyItems:{type:Array,value:[],notify:!0},active:{type:Number,value:0,notify:!0,reflectToAttribute:!0,observer:"_activeChanged"},progressiveUnlock:{type:Boolean,value:!0,reflectToAttribute:!0,notify:!0},state:{type:String,value:null,reflectToAttribute:!0,observer:"_reportState"},overallPercentage:{type:Number,computed:"_overallPercentageCompute(items, active)",reflectToAttribute:!0},_responseList:{type:Array,value:[]},activeNodeResponse:{type:String,value:"",observer:"_activeResponseChanged"},manifest:{type:Object,value:{},notify:!0,observer:"_manifestChanged"},nodeDataError:{type:Object,value:[],observer:"_handleNodeError"},vertical:{type:Boolean,value:!1},size:{type:String,value:"medium",notify:!0,reflectToAttribute:!0},strokeWidth:{type:Number,computed:"_getStrokeWidth(size)"}},_getStrokeWidth:function(e){var t=4;return"tiny"==e?t=3:"small"==e?t=4:"medium"==e?t=5:"large"==e?t=6:"x-large"==e?t=7:"epic"==e&&(t=8),t},_reportState:function(e,t){null!=e&&this.items.length>0&&this.fire("progress-state-change",{state:this.state,active:this.items[this.active]})},_itemsChanged:function(e,t){var s=this;"undefined"!==i(t)&&"undefined"!==i(e)&&e.length!=t.length&&"undefined"===i(this._responseList[this.active])&&(e[this.active].metadata.status="loading",this.set("items."+this.active+".metadata.status","loading"),this.notifyPath("items."+this.active+".metadata.status"),"undefined"===i(e[this.active].dataUrl)||this.disableAjaxCalls?setTimeout(function(){e[s.active].metadata.status="available",s.set("items."+s.active+".metadata.status","available"),s.notifyPath("items."+s.active+".metadata.status"),s._responseList[s.active]={},s.activeNodeResponse=s._responseList[s.active]},1200):(this.$.ajax.url=e[this.active].dataUrl,this.$.ajax.generateRequest()))},_isActive:function(e,t){return e===t},_activeResponseChanged:function(e){this.fire("progress-response-loaded",{response:e})},_bubbleUpChangeActive:function(e){this.active=e.detail.target.step,this.fire("json-outline-schema-active-item-changed",this.items[this.active])},_manifestChanged:function(e,t){e&&(this.set("items",e.items),this.notifyPath("items.*"))},_activeChanged:function(e,t){var s=this;this.state="active item is "+this.active,this.items.forEach(function(e,t,n){"disabled"==s.items[t].metadata.status?0!=t&&s.progressiveUnlock&&"complete"==s.items[t-1].metadata.status&&(s.items[t].metadata.status="loading",s.set("items."+t+".metadata.status","loading"),s.notifyPath("items."+t+".metadata.status")):s.items[t].metadata.value>=s.items[t].metadata.max&&t==s.items.length-1?(s.items[t].metadata.status="finished",s.set("items."+t+".metadata.status","finished"),s.notifyPath("items."+t+".metadata.status")):s.items[t].metadata.value>=s.items[t].metadata.max?(s.items[t].metadata.status="complete",s.set("items."+t+".metadata.status","complete"),s.notifyPath("items."+t+".metadata.status")):t==s.active?"undefined"===i(s._responseList[t])?(s.items[t].metadata.status="loading",s.set("items."+t+".metadata.status","loading"),s.notifyPath("items."+t+".metadata.status")):(s.activeNodeResponse=s._responseList[t],s.items[t].metadata.status="available",s.set("items."+t+".metadata.status","available"),s.notifyPath("items."+t+".metadata.status")):(s.items[t].metadata.status="available",s.set("items."+t+".metadata.status","available"),s.notifyPath("items."+t+".metadata.status"))})},_statusChanged:function(e){var t=this;"loading"==e.target.status?"undefined"===i(this.items[this.active].metadata.dataUrl)||this.disableAjaxCalls?setTimeout(function(){t.items[t.active].metadata.status="available",t.set("items."+t.active+".metadata.status","available"),t.notifyPath("items."+t.active+".metadata.status"),t._responseList[t.active]={},t.activeNodeResponse=t._responseList[t.active]},1500):(this.$.ajax.url=this.items[this.active].metadata.dataUrl,this.$.ajax.generateRequest()):"complete"==e.target.status&&this.items.length===this.active+1&&setTimeout(function(){t.items[t.active].metadata.status="finished",t.set("items."+t.active+".metadata.status","finished"),t.notifyPath("items."+t.active+".metadata.status")},100)},handleNodeResponse:function(e){var t=this,s=e.detail;i(s.response)===i(null)?setTimeout(function(){t.items[t.active].metadata.status="available",t.set("items."+t.active+".metadata.status","available"),t.notifyPath("items."+t.active+".metadata.status"),t._responseList[t.active]=s.response,t.activeNodeResponse=t._responseList[t.active]},1500):(this.items[this.active].metadata.status="available",this.set("items."+this.active+".metadata.status","available"),this.notifyPath("items."+this.active+".metadata.status"),this._responseList[this.active]=s.response,this.activeNodeResponse=this._responseList[this.active])},_handleNodeError:function(e,t){"undefined"!==i(t)&&null!=e&&0!=e.length&&(this._responseList[this.active]=e,this.activeNodeResponse=this._responseList[this.active],this.items[this.active].metadata.status="available",this.set("items."+this.active+".metadata.status","available"),this.notifyPath("items."+this.active+".metadata.status"),this.fire("node-load-failed",{message:e,node:this.items[this.active]}))},_overallPercentageCompute:function(e,t){return"undefined"!==i(e)?(this.$.progress.classList.add("transiting"),t/(e.length-1)*100):0},changePercentage:function(e,t){var s=0;(s="add"==t?this.items[this.active].metadata.value+e:"subtract"==t?this.items[this.active].metadata.value-e:e)>=this.items[this.active].metadata.max?(this.items.length==this.active+1?(this.state="finished",this.items[this.active].metadata.status="finished",this.set("items."+this.active+".metadata.status","finished"),this.notifyPath("items."+this.active+".metadata.status"),this.items[this.active].metadata.value=this.items[this.active].metadata.max,this.set("items."+this.active+".metadata.value",this.items[this.active].metadata.max),this.notifyPath("items."+this.active+".metadata.value")):(this.items[this.active].metadata.value=this.items[this.active].metadata.max,this.set("items."+this.active+".metadata.value",this.items[this.active].metadata.max),this.notifyPath("items."+this.active+".metadata.value")),this.items.length>this.active+1&&((this.progressiveUnlock&&"complete"==this.items[this.active].metadata.status&&"disabled"==this.items[this.active+1].metadata.status||"undefined"===i(this._responseList[this.active+1]))&&(this.items[this.active+1].metadata.status="loading",this.set("items."+(this.active+1)+".metadata.status","loading"),this.notifyPath("items."+(this.active+1)+".metadata.status")),this.state="active item is "+(this.active+1),this.active=this.active+1)):(this.items[this.active].metadata.value=s,this.set("items."+this.active+".metadata.value",s),this.notifyPath("items."+this.active+".metadata.value"))},updateItems:function(e,t){var s=!1;"push"==e?(this.push("items",t),s=!0):"pop"==e?s=this.pop("items"):"splice"==e&&(this.splice("items",this.items.length,0,t),s=!0);var i=this.active;return this.set("active",0),this.set("active",i),this.notifyPath("active"),s}});e.LrnsysProgress=o,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=lrnsys-progress.umd.js.map
