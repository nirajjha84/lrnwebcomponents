import{html,Polymer}from"./node_modules/@polymer/polymer/polymer-legacy.js";import"./node_modules/@polymer/paper-button/paper-button.js";import"./node_modules/@polymer/paper-card/paper-card.js";import"./node_modules/@polymer/iron-list/iron-list.js";import"./node_modules/@polymer/iron-ajax/iron-ajax.js";import"./node_modules/@polymer/iron-icons/iron-icons.js";import"./node_modules/@polymer/paper-icon-button/paper-icon-button.js";import"./node_modules/@lrnwebcomponents/simple-colors/simple-colors.js";let PerSpecTive=Polymer({_template:html`
    <style>
      :host {
        display: block;
        transition: 0.6s all linear;
        background-color: transparent;
        opacity: 1;
      }
      :host([outline-loading]) {
        opacity: 0.6;
        background-color: #999999;
      }
      paper-card {
        width: 250px;
        height: 250px;
      }
      #list {
        min-height: 50vh;
        width: 100%;
      }
    </style>
    <iron-ajax
      auto=""
      id="endpoint"
      url="[[endPoint]]"
      loading="{{outlineLoading}}"
      handle-as="json"
      last-response="{{_outlineData}}"
      debounce-duration="300"
    ></iron-ajax>
    <iron-list grid="" id="list" items="[[outline]]">
      <template>
        <paper-card
          heading="[[item.title]]"
          image=""
          elevation="1"
          animated-shadow="true"
        >
          <div class="card-content">A card</div>
          <div class="card-actions">
            <paper-icon-button icon="add"></paper-icon-button>
            <paper-icon-button icon="delete"></paper-icon-button>
          </div>
        </paper-card>
      </template>
    </iron-list>
  `,is:"per-spec-tive",properties:{outlineLoading:{type:Boolean,reflectToAttribute:!0},endPoint:{type:String},_outlineData:{type:Object,observer:"_outlineRawDataChanged"},outline:{type:Array,observer:"_outlineChanged"}},_outlineRawDataChanged:function(newValue,oldValue){if(null!=newValue&&typeof newValue.items!==typeof void 0){this.set("outline",[]);this.set("outline",newValue.items)}},_outlineChanged:function(newValue,oldValue){},_toArray:function(obj){return Object.keys(obj).map(function(key){return obj[key]})}});export{PerSpecTive};