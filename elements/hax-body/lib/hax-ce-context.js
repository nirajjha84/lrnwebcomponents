import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/paper-input/paper-textarea.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@lrnwebcomponents/simple-colors/lib/simple-colors-picker.js";
import "./hax-context-item-menu.js";
import "./hax-context-item.js";
import "./hax-toolbar.js";
import "./hax-shared-styles.js";
/**
`hax-ce-context`
A context menu that provides common custom-element based authoring options. While
trying to call for haxProperties which can automatically generate the buttons
required for populating input.

* @demo demo/index.html

@microcopy - the mental model for this element
 - context menu - this is a menu of custom-element based buttons and events for use in a larger solution.
*/
Polymer({
  _template: html`
    <style includes="hax-shared-styles">
      :host *[hidden] {
        display: none;
      }
      :host {
        display: block;
        height: 36px;
      }
      hax-context-item {
        margin: 0;
        height: 36px;
      }
      :host(.hax-context-pin-top) hax-toolbar {
        position: fixed;
        top: 64px;
        opacity: 0.9;
      }
      :host(.hax-context-pin-bottom) hax-toolbar {
        position: fixed;
        bottom: 0;
        opacity: 0.9;
      }
      :host(.hax-context-pin-top) hax-toolbar:hover,
      :host(.hax-context-pin-bottom) hax-toolbar:hover {
        opacity: 1;
      }
    </style>
    <hax-toolbar hax-properties="[[haxProperties]]" size="{{ceSize}}">
      <slot slot="primary"></slot>
      <hax-context-item
        slot="primary"
        icon="icons:settings"
        label="Settings"
        event-name="hax-manager-configure"
        hidden$="[[!__hasSettingsForm]]"
      ></hax-context-item>
      <hax-context-item
        slot="primary"
        icon="icons:view-quilt"
        label="[[__parentName]]"
        event-name="hax-manager-configure-container"
        hidden$="[[!__hasParentSettingsForm]]"
      ></hax-context-item>
    </hax-toolbar>
  `,

  is: "hax-ce-context",

  properties: {
    /**
     * ce size.
     */
    ceSize: {
      type: Number,
      value: 100,
      observer: "_ceSizeChanged"
    },
    /**
     * Selected value to match ce direction currently.
     */
    haxProperties: {
      type: Object,
      value: {},
      observer: "_haxPropertiesChanged"
    }
  },

  /**
   * Set haxProperties.
   */
  setHaxProperties: function(props) {
    // be aggressive w/ reset
    this.set("haxProperties", {});
    this.set("haxProperties", props);
  },

  /**
   * ce size changed.
   */
  _ceSizeChanged: function(newValue, oldValue) {
    if (
      typeof newValue !== typeof undefined &&
      typeof oldValue !== typeof undefined
    ) {
      this.fire("hax-context-item-selected", {
        eventName: "hax-size-change",
        value: newValue
      });
    }
  },

  /**
   * HAX properties changed, update buttons available.
   */
  _haxPropertiesChanged: function(newValue, oldValue) {
    if (
      typeof oldValue !== typeof undefined &&
      typeof newValue.settings !== typeof undefined
    ) {
      // clear current slot for the tag
      let slot = dom(this);
      while (slot.firstChild !== null) {
        slot.removeChild(slot.firstChild);
      }
      let settings = newValue.settings.quick;
      let configure = newValue.settings.configure;
      let advanced = newValue.settings.advanced;
      // support things that could technically have no configuration
      // or advanced form but have quick settings
      // This doesn't make a ton of sense but it is possible
      if (
        (configure.length || advanced.length) &&
        newValue.element.tagName !== "HR"
      ) {
        this.__hasSettingsForm = true;
      } else {
        this.__hasSettingsForm = false;
      }
      this.__hasParentSettingsForm = false;
      // test for parent being different from child
      if (
        window.HaxStore.instance.activeContainerNode !==
          window.HaxStore.instance.activeNode &&
        window.HaxStore.instance.activeContainerNode !== null
      ) {
        this.__hasParentSettingsForm = true;
        switch (window.HaxStore.instance.activeContainerNode.tagName) {
          case "P":
          case "UL":
          case "OL":
          case "DIV":
            this.__parentName = "Text block settings";
            break;
          case "GRID-PLATE":
            this.__parentName = "Layout settings";
            break;
          default:
            this.__parentName = window.HaxStore.instance.activeContainerNode.tagName
              .replace("-", " ")
              .toLowerCase();
            +" settings";
            break;
        }
      }
      var item;
      // @todo kick stuff into the local dom as options
      for (var i = 0; i < settings.length; i++) {
        let setting = settings[i];
        // create a new context item for the quick
        item = document.createElement("hax-context-item");
        item.eventName = "hax-edit-property";
        item.label = setting.title;
        item.options = setting.options;
        item.icon = setting.icon;
        item.inputMethod = setting.inputMethod;
        item.required = setting.required;
        item.options = setting.options;
        item.validation = setting.validation;
        item.validationType = setting.validationType;
        item.description = setting.description;
        // property or slot if it doesn't exist
        if (typeof setting.property !== typeof undefined) {
          item.propertyToBind = setting.property;
        } else if (typeof setting.attribute !== typeof undefined) {
          item.propertyToBind = setting.attribute;
        } else {
          item.slotToBind = setting.slot;
        }
        slot.appendChild(item);
      }
    }
  }
});
