import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/editor-icons.js";
import "@polymer/iron-icons/device-icons.js";
import "@polymer/iron-icons/hardware-icons.js";
import "@polymer/iron-icons/communication-icons.js";
import "@polymer/iron-icons/social-icons.js";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/iron-icons/maps-icons.js";
import "@lrnwebcomponents/simple-colors/simple-colors.js";
import "./hax-panel-item.js";
import "./hax-shared-styles.js";
/**
`hax-panel`
A LRN element that provides a panel / pallet of options to choose from.
This is intended to be placed in a larger system for creating content quickly
as the events being bubbled up include HTML nodes to inject into something

* @demo demo/index.html

@microcopy - the mental model for this element
 - panel - the flyout from left or right side that has elements that can be placed
 - element - buttons on the panel which when pressed will trigger an event

*/
Polymer({
  _template: html`
    <style include="simple-colors hax-shared-styles">
      :host {
        display: block;
        position: absolute;
        z-index: 1000000;
      }
      :host *[hidden] {
        display: none;
      }
      app-drawer {
        z-index: 100001;
        height: 40px;
        padding: 8px 16px;
        left: 0;
        top: 0;
        align-items: center;
        touch-action: auto;
        visibility: hidden;
        opacity: 0;
        display: flex;
        --app-drawer-width: 100%;
        --app-drawer-content-container: {
          align-items: center;
          width: 100%;
          left: 0;
          right: 0;
          background-color: var(--hax-color-bg);
          border: 1px solid var(--hax-color-bg-accent);
          padding: 0 16px;
          display: flex;
          touch-action: auto;
          overflow-x: auto;
          overflow: visible !important;
          -webkit-overflow-scrolling: touch;
          white-space: nowrap;
        }
      }
      hax-panel-item {
        margin: 8px 2px;
      }
      hax-panel-item[right] {
        float: right;
      }
      #haxcancelbutton {
        margin-right: 48px;
      }
      :host([align="right"]) app-drawer {
        right: 0;
        left: unset;
      }
      :host([edit-mode]) app-drawer {
        visibility: visible;
        transition: 0.3s ease opacity;
        opacity: 1;
        right: 0;
        left: 0;
        top: 0;
      }

      #button {
        position: fixed;
        top: 0;
        left: 0;
        visibility: visible;
        z-index: 10000;
        transition: all 0.3s ease;
        margin: 0;
        border-top-left-radius: 0;
      }
      :host([edit-mode]) #button {
        visibility: hidden;
        opacity: 0;
      }
      #button:hover {
        opacity: 1;
      }
      :host([align="right"]) #button {
        right: 0;
        left: unset;
        border-top-right-radius: 0;
        border-top-left-radius: unset;
      }
      .active-op-name {
        display: none;
      }
      :host([edit-mode]) .active-op-name {
        display: flex;
        top: 0;
        right: 0;
        z-index: 1000000;
        position: fixed;
        font-size: 14px;
        font-weight: bold;
        padding: 16px 28px 16px 16px;
        line-height: 24px;
        height: 24px;
        min-width: 120px;
        justify-content: space-evenly;
        background-color: var(--hax-color-bg-accent);
        color: var(--hax-color-text);
        vertical-align: middle;
      }
      @media screen and (max-width: 600px) {
        :host([edit-mode]) .hide-small {
          display: none;
        }
      }
      @media screen and (max-width: 800px) {
        :host([edit-mode]) #haxcancelbutton {
          margin-right: 2px;
        }
        :host([edit-mode]) .active-op-name {
          display: none;
        }
      }
    </style>
    <div hidden$="[[hidePanelOps]]">
      <hax-panel-item
        dark
        large
        data-opened$="[[editMode]]"
        on-tap="_clickEditButton"
        icon="create"
        id="button"
        edged="[[align]]"
        label="[[__tipText]]"
      ></hax-panel-item>
    </div>
    <app-drawer
      id="drawer"
      opened="{{editMode}}"
      disable-swipe
      persistent
      transition-duration="300"
      align="[[align]]"
    >
      <hax-panel-item
        hidden$="[[hidePanelOps]]"
        on-tap="_clickSaveButton"
        icon="save"
        id="haxsavebutton"
        label="[[__tipText]]"
        event-name="save"
        voice-command="save content"
      ></hax-panel-item>
      <hax-panel-item
        hidden$="[[hidePanelOps]]"
        icon="cancel"
        id="haxcancelbutton"
        label="Cancel"
        event-name="cancel"
        voice-command="cancel hax"
      ></hax-panel-item>
      <hax-panel-item
        icon="image:add-to-photos"
        label="Add"
        event-name="hax-manager-open"
        value="0"
      ></hax-panel-item>
      <hax-panel-item
        icon="search"
        label="Find"
        event-name="hax-manager-open"
        value="1"
      ></hax-panel-item>
      <hax-panel-item
        icon="hardware:toys"
        label="Make"
        event-name="hax-manager-open"
        value="2"
      ></hax-panel-item>
      <hax-panel-item
        icon="view-quilt"
        label="Layouts"
        event-name="hax-blox-picker-open"
        voice-command="insert block"
      ></hax-panel-item>
      <hax-panel-item
        icon="view-agenda"
        label="Templates"
        event-name="hax-stax-picker-open"
        voice-command="insert stack"
      ></hax-panel-item>
      <hax-panel-item
        icon="editor:text-fields"
        label="Paragraph"
        event-name="text"
        voice-command="insert text"
        class="hide-small"
      ></hax-panel-item>
      <hax-panel-item
        icon="editor:title"
        label="Heading"
        event-name="header"
        voice-command="insert heading"
        class="hide-small"
      ></hax-panel-item>
      <hax-panel-item
        icon="editor:space-bar"
        label="Divider"
        event-name="divider"
        voice-command="insert divider"
        class="hide-small"
      ></hax-panel-item>
      <hax-panel-item
        icon="image:transform"
        label="Placeholder"
        event-name="placeholder"
        voice-command="insert placeholder"
        class="hide-small"
      ></hax-panel-item>
      <hax-panel-item
        hidden$="[[hideExportButton]]"
        on-tap="_htmlExportDialog"
        icon="code"
        label="Source view"
      ></hax-panel-item>
      <slot></slot>
      <hax-panel-item
        right
        hidden$="[[hidePreferencesButton]]"
        on-tap="_preferencesDialog"
        icon="settings"
        label="Preferences"
      ></hax-panel-item>
    </app-drawer>
    <div class="active-op-name">[[activeOperationName]]</div>
  `,

  is: "hax-panel",

  listeners: {
    "hax-item-selected": "_processItemEvent"
  },

  observers: ["_globalPreferencesChanged(globalPreferences.*)"],

  properties: {
    /**
     * Light variant for save button
     */
    light: {
      type: Boolean
    },
    /**
     * Display to the right corner instead of the left (default)
     */
    align: {
      type: String,
      reflectToAttribute: true,
      value: "left"
    },
    /**
     * State of the panel
     */
    editMode: {
      type: Boolean,
      reflectToAttribute: true,
      observer: "_editModeChanged"
    },
    /**
     * Showing export area.
     */
    hideExportButton: {
      type: Boolean,
      value: false
    },
    /**
     * Show developer mode
     */
    haxDeveloperMode: {
      type: Boolean,
      value: false
    },
    /**
     * active item name, useful to show users what they are working with
     */
    activeOperationName: {
      type: String
    },
    /**
     * Showing preferences area.
     */
    hidePreferencesButton: {
      type: Boolean,
      value: false
    },
    /**
     * Showing button area at all a well as internal
     * state managing buttons like cancel and save
     */
    hidePanelOps: {
      type: Boolean,
      value: false
    },
    /**
     * Global preferences for HAX overall
     */
    globalPreferences: {
      type: Object
    }
  },
  /**
   * Attached to the DOM; now we can fire event to the store that
   * we exist and are the thing being edited.
   */
  attached: function() {
    this.fire("hax-register-panel", this);
    document.body.addEventListener(
      "hax-store-property-updated",
      this._haxStorePropertyUpdated.bind(this)
    );
    document.body.addEventListener(
      "hax-active-hover-name",
      this._activeNameChange.bind(this)
    );
    document.body.addEventListener(
      "hax-panel-operation",
      this._processItemEvent.bind(this)
    );
  },

  /**
   * Detached life cycle
   */
  detached: function() {
    document.body.removeEventListener(
      "hax-store-property-updated",
      this._haxStorePropertyUpdated.bind(this)
    );
    document.body.removeEventListener(
      "hax-active-hover-name",
      this._activeNameChange.bind(this)
    );
    document.body.removeEventListener(
      "hax-panel-operation",
      this._processItemEvent.bind(this)
    );
  },

  _activeNameChange: function(e) {
    this.activeOperationName = e.detail;
  },
  /**
   * Global preference changed.
   */
  _globalPreferencesChanged: function(value) {
    if (typeof value !== typeof undefined) {
      if (
        value.value != null &&
        typeof value.value.haxShowExportButton !== typeof undefined
      ) {
        this.hideExportButton = !value.value.haxShowExportButton;
      }
      if (
        value.value != null &&
        typeof value.value.haxDeveloperMode !== typeof undefined
      ) {
        this.haxDeveloperMode = value.value.haxDeveloperMode;
      }
    }
  },

  /**
   * Store updated, sync.
   */
  _haxStorePropertyUpdated: function(e) {
    if (
      e.detail &&
      typeof e.detail.value !== typeof undefined &&
      e.detail.property
    ) {
      if (typeof e.detail.value === "object") {
        this.set(e.detail.property, null);
      }
      this.set(e.detail.property, e.detail.value);
    }
  },

  /**
   * Process event for simple content inserts.
   */
  _processItemEvent: function(e) {
    let detail = e.detail;
    // support a simple insert event to bubble up or everything else
    switch (detail.eventName) {
      case "open-panel":
        this._clickButton();
        break;
      case "cancel":
        this.toggle();
        this.fire("hax-cancel", detail);
        break;
      case "text":
        detail.tag = "p";
        detail.content = "";
        this.fire("hax-insert-content", detail);
        break;
      case "divider":
        detail.tag = "hr";
        detail.content = "";
        detail.properties = {
          style: "width:100%;"
        };
        this.fire("hax-insert-content", detail);
        break;
      case "header":
        detail.tag = "h2";
        detail.content = "Header";
        this.fire("hax-insert-content", detail);
        break;
      case "placeholder":
        detail.tag = "place-holder";
        detail.content = "";
        detail.properties = {
          style: "width:50%;"
        };
        this.fire("hax-insert-content", detail);
        break;
      case "image":
        detail.tag = "img";
        detail.content = "";
        detail.properties = {
          src:
            pathFromUrl(decodeURIComponent(import.meta.url)) +
            window.HaxStore.instance.defaults.image.src,
          alt: window.HaxStore.instance.defaults.image.alt,
          style: "width:100%;"
        };
        this.fire("hax-insert-content", detail);
        break;
      case "iframe":
        detail.tag = "iframe";
        detail.content = "";
        detail.properties = {
          src: window.HaxStore.instance.defaults.iframe.src,
          height: "400px",
          width: "100%",
          style: "width:100%;"
        };
        this.fire("hax-insert-content", detail);
        break;
      case "blockquote":
        detail.tag = "blockquote";
        detail.content = "";
        this.fire("hax-insert-content", detail);
        break;
      case "hax-manager-open":
        window.HaxStore.write("activeHaxElement", {}, this);
        window.HaxStore.instance.haxManager.resetManager(
          parseInt(detail.value)
        );
        window.HaxStore.instance.haxManager.toggleDialog(false);
        break;
      case "hax-stax-picker-open":
        window.HaxStore.instance.haxStaxPicker.toggleDialog();
        break;
      case "hax-blox-picker-open":
        window.HaxStore.instance.haxBloxPicker.toggleDialog();
        break;
      case "undo":
        document.execCommand("undo");
        break;
      case "redo":
        document.execCommand("redo");
        break;
      default:
        // we sit on this, something else will have to handle it
        break;
    }
  },

  /**
   * _editModeChanged
   */
  _editModeChanged: function(newValue, oldValue) {
    if (typeof newValue !== typeof undefined && newValue) {
      this.__tipText = "Save";
      this.$.button.icon = "save";
    } else {
      this.__tipText = "Edit";
      this.$.button.icon = "create";
    }
  },

  /**
   * Toggle the drawer when the button is clicked.
   */
  _clickEditButton: function(e) {
    this.toggle();
  },

  /**
   * Toggle the drawer when the button is clicked.
   */
  _clickSaveButton: function(e) {
    this.toggle();
    this.fire("hax-save", e.detail);
  },

  /**
   * HTML Export trigger.
   */
  _htmlExportDialog: function(e) {
    window.HaxStore.instance.haxExport.toggleDialog();
  },

  /**
   * Preferences trigger.
   */
  _preferencesDialog: function(e) {
    window.HaxStore.instance.haxPreferences.toggleDialog();
  },

  /**
   * Toggle the panel.
   */
  toggle: function(e) {
    window.HaxStore.write("editMode", !this.editMode, this);
    this.$.drawer.opened = this.editMode;
    if (!this.$.drawer.opened) {
      window.HaxStore.instance.closeAllDrawers();
    }
  }
});
