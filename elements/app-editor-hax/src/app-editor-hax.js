import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import "@lrnwebcomponents/hax-body/lib/hax-store.js";
import "@lrnwebcomponents/hax-body/hax-body.js";
import "@lrnwebcomponents/hax-body/lib/hax-autoloader.js";
import "@lrnwebcomponents/hax-body/lib/hax-manager.js";
import "@lrnwebcomponents/hax-body/lib/hax-panel.js";
import "@lrnwebcomponents/hax-body/lib/hax-app-picker.js";
import "@lrnwebcomponents/hax-body/lib/hax-export-dialog.js";
/**
`app-editor-hax`
stand alone editor intended for use in a larger application
as the editor. It is like cms-hax in that it's prepackaged
the way HAX will be integrated but the connotation is that there
is no edit state and that it is always editing effectively.

* @demo demo/index.html

@microcopy - the mental model for this element
 - app - an application desktop or mobile that's deployed this
 - editor - in this case HAX is the editor / authoring tool
 - hax - just to make sure we're aware that it's actually HAX based

*/
let AppEditorHax = Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        font-size: 16px;
        box-sizing: content-box;
      }
    </style>
    <hax-store
      skip-exit-trap=""
      hidden=""
      app-store="[[appStoreConnection]]"
    ></hax-store>
    <hax-autoloader hidden=""></hax-autoloader>
    <hax-panel
      id="panel"
      hide-panel-ops=""
      hide-export-button=""
      hide-preferences-button\$="[[hidePreferencesButton]]"
      align="right"
    ></hax-panel>
    <hax-body id="body"></hax-body>
    <hax-manager></hax-manager>
    <hax-export-dialog></hax-export-dialog>
    <hax-app-picker></hax-app-picker>
  `,

  is: "app-editor-hax",

  properties: {
    /**
     * Establish the app store connection to pull in our JSON
     */
    appStoreConnection: {
      type: Object
    },
    /**
     * Ability to hide the preferences button
     */
    hidePreferencesButton: {
      value: false,
      type: Boolean
    }
  },

  /**
   * Basic save event to make targetting easier.
   */
  save: function() {
    // convert the body area to content
    let content = window.HaxStore.instance.activeHaxBody.haxToContent();
    // fire event so apps can react correctly
    this.fire("app-editor-hax-save", content);
  },

  /**
   * Basic import capability abstraction of hax body's import capabilities
   */
  import: function(html) {
    // import the HTML blob to get going
    window.HaxStore.instance.activeHaxBody.importContent(html);
    // fire event just letting things know this happened
    this.fire("app-editor-hax-import", true);
  }
});
export { AppEditorHax };
