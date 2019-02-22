import{html,Polymer}from"./node_modules/@polymer/polymer/polymer-legacy.js";import"./node_modules/@polymer/iron-icons/iron-icons.js";import"./node_modules/@polymer/iron-icons/editor-icons.js";import"./node_modules/@polymer/iron-icons/notification-icons.js";import"./node_modules/@polymer/iron-icons/av-icons.js";import"./node_modules/@polymer/iron-icons/device-icons.js";import"./node_modules/@polymer/iron-icons/image-icons.js";import"./node_modules/@lrnwebcomponents/simple-colors/simple-colors.js";import"./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";let PlaceHolder=Polymer({_template:html`
    <style include="simple-colors">
      :host {
        display: block;
        border: none;
        transition: 0.2s all linear;
      }
      :host([drag-over]) {
        border: 4px dashed #2196f3;
      }
      .placeholder-inner {
        text-align: center;
        padding: 16px;
        color: var(--simple-colors-default-theme-grey-11, #222222);
        background-color: var(--simple-colors-default-theme-grey-2, #eeeeee);
      }
      iron-icon.placeholder-icon {
        margin: 0 auto;
        width: 50%;
        height: 50%;
        display: block;
      }
      .placeholder-text {
        line-height: 24px;
        font-size: 24px;
        font-style: italic;
      }
    </style>
    <div class="placeholder-inner">
      <iron-icon icon="[[iconFromType]]" class="placeholder-icon"></iron-icon>
      <span class="placeholder-text">[[calcText]]</span>
    </div>
  `,is:"place-holder",behaviors:[HAXBehaviors.PropertiesBehaviors],listeners:{dblclick:"fireReplaceEvent"},properties:{iconFromType:{type:String,computed:"_getIconFromType(type, dragOver)"},text:{type:String,value:""},calcText:{type:String,computed:"_getCalcText(text, type, dragOver)"},type:{type:String,value:"text"},dragOver:{type:Boolean,value:!1,reflectToAttribute:!0}},fireReplaceEvent:function(e){this.fire("place-holder-replace",this.type)},_getCalcText:function(text,type,dragOver){if(dragOver){return"Upload file"}else if(""===text){return"Place holder for "+type+"."}else{return text}},_getIconFromType:function(type,dragOver){if(!dragOver){switch(type){case"document":return"editor:insert-drive-file";break;case"audio":return"av:music-video";break;case"video":return"notification:ondemand-video";break;case"image":return"image:crop-original";break;case"math":return"editor:functions";break;case"text":default:return"editor:format-align-left";break;}}else{return"icons:file-upload"}},attached:function(){this.addEventListener("dragover",function(e){this.dragOver=!0;e.preventDefault();e.stopPropagation();this.classList.add("dragover")});this.addEventListener("dragleave",function(e){this.dragOver=!1;e.preventDefault();e.stopPropagation();this.classList.remove("dragover")});this.addEventListener("drop",function(e){this.dragOver=!1;e.preventDefault();e.stopPropagation();this.classList.remove("dragover");try{if("file"===e.dataTransfer.items[0].kind){e.placeHolderElement=this;this.fire("place-holder-file-drop",e)}}catch(e){}});let props={canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Placeholder",description:"A place holder that can be converted into the media type that's been selected",icon:"image:transform",color:"grey",groups:["Placeholder"],handles:[],meta:{author:"LRNWebComponents"}},settings:{quick:[],configure:[{property:"type",title:"Type",description:"Type of gizmo that this accepts for replacement.",inputMethod:"select",options:{text:"Text / content",document:"Document / file",audio:"Audio",video:"Video",image:"Image",math:"Math"}}],advanced:[]},saveOptions:{wipeSlot:!0}};this.setHaxProperties(props)}});export{PlaceHolder};