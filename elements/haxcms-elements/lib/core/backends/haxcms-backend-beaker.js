/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@lrnwebcomponents/beaker-broker/beaker-broker.js";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";

/**
 * `haxcms-backend-beaker`
 * `a simple element to check for and fetch JWTs`
 *
 * @microcopy - the mental model for this element
 * - jwt - a json web token which is an encrypted security token to talk
 */
class HAXCMSBackendBeaker extends PolymerElement {
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "haxcms-backend-beaker";
  }
  // render function
  static get template() {
    return html`
      <beaker-broker id="beaker"></beaker-broker>
    `;
  }
  static get properties() {
    return {
      /**
       * JSON Web token, it'll come from a global call if it's available
       */
      jwt: {
        type: String
      },
      /**
       * Store manifest that makes up the site.
       */
      manifest: {
        type: Object
      },
      /**
       * Track activeItem
       */
      activeItem: {
        type: Object
      }
    };
  }
  /**
   * Attached life cycle
   */
  constructor() {
    super();
    afterNextRender(this, function() {
      document.body.addEventListener(
        "jwt-token",
        this._jwtTokenFired.bind(this)
      );
      // HAX CMS events to intercept
      document.body.addEventListener(
        "haxcms-save-site-data",
        this.saveManifest.bind(this)
      );
      document.body.addEventListener(
        "haxcms-save-outline",
        this.saveOutline.bind(this)
      );
      document.body.addEventListener(
        "haxcms-save-node",
        this.saveNode.bind(this)
      );
      document.body.addEventListener(
        "haxcms-delete-node",
        this.deleteNode.bind(this)
      );
      document.body.addEventListener(
        "haxcms-create-node",
        this.createNode.bind(this)
      );
      // listen for app being selected
      document.body.addEventListener(
        "hax-app-picker-selection",
        this._appPicked.bind(this)
      );
    });
  }
  /**
   * detached life cycle
   */
  disconnectedCallback() {
    document.body.removeEventListener(
      "jwt-token",
      this._jwtTokenFired.bind(this)
    );
    // HAX CMS events to intercept
    document.body.removeEventListener(
      "haxcms-save-site-data",
      this.saveManifest.bind(this)
    );
    document.body.removeEventListener(
      "haxcms-save-outline",
      this.saveOutline.bind(this)
    );
    document.body.removeEventListener(
      "haxcms-save-node",
      this.saveNode.bind(this)
    );
    document.body.removeEventListener(
      "haxcms-delete-node",
      this.deleteNode.bind(this)
    );
    document.body.removeEventListener(
      "haxcms-create-node",
      this.createNode.bind(this)
    );
    // listen for app being selected
    document.body.removeEventListener(
      "hax-app-picker-selection",
      this._appPicked.bind(this)
    );
    super.disconnectedCallback();
  }
  _appPicked(e) {
    if (e.detail.connection.protocol === "dat") {
      e.preventDefault();
      e.stopPropagation();
      let reader = new FileReader();
      reader.onload = event => {
        let fileLocation =
          "files/" +
          window.HaxStore.instance.haxManager.$.fileupload.files[0].name;
        this.$.beaker.write(fileLocation, event.target.result);
        window.HaxStore.instance.haxManager.$.url.value = fileLocation;
        window.HaxStore.instance.haxManager.newAssetConfigure();
      };
      reader.readAsArrayBuffer(
        window.HaxStore.instance.haxManager.$.fileupload.files[0]
      );
    }
  }
  /**
   * Save page data
   */
  async saveNode(e) {
    this.activeItem = e.detail;
    // make sure this location exists
    await this.$.beaker.write(
      this.activeItem.location,
      window.HaxStore.instance.activeHaxBody.haxToContent()
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.$.toast.show(
      "Page updated!"
    );
    const evt = new CustomEvent("haxcms-trigger-update-node", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: true
    });
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(evt);
  }
  /**
   * Outline save event.
   */
  async saveOutline(e) {
    // snag global to be sure we have it set first
    this.manifest =
      store.cmsSiteEditor.instance.haxCmsSiteEditorElement.manifest;
    // set items specifically since it's just an outline update
    this.manifest.items = e.detail;
    // loop through and match the data our backend generates
    this.manifest.items.forEach((element, index) => {
      // test for things that are not set and build the whole thing out
      if (typeof element.location === typeof undefined) {
        let id = this.generateResourceID("item-");
        element.id = id;
        element.location = "pages/" + id + "/index.html";
        element.order = index;
        element.description = "";
        element.metadata = {
          created: Math.floor(Date.now() / 1000),
          updated: Math.floor(Date.now() / 1000)
        };
        // make a directory
        this.$.beaker.archive.mkdir("pages/" + id);
        // make the page
        this.$.beaker.write(
          "pages/" + id + "/index.html",
          "<p>Ex uno Plures</p>"
        );
        this.manifest.items[index] = element;
      }
    });
    this.$.beaker.write("site.json", JSON.stringify(this.manifest, null, 2));
    // simulate save events since they wont fire
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.$.toast.show(
      "Outline saved!"
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true
      })
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("json-outline-schema-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this.manifest
      })
    );
  }
  /**
   * Outline save event.
   */
  async deleteNode(e) {
    let page = e.detail.item;
    // snag global to be sure we have it set first
    this.manifest =
      store.cmsSiteEditor.instance.haxCmsSiteEditorElement.manifest;
    // set items specifically since it's just an outline update
    this.manifest.items = e.detail;
    // loop through and match the data our backend generates
    this.manifest.items.forEach((element, index) => {
      if (element.id === page.id) {
        this.splice("manifest.items", index, 1);
      }
    });
    this.$.beaker.write("site.json", JSON.stringify(this.manifest, null, 2));
    // simulate save events since they wont fire
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.$.toast.show(
      `${page.title} deleted`
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true
      })
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("json-outline-schema-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this.manifest
      })
    );
  }
  /**
   * createNode
   */
  async createNode(e) {
    let page = e.detail.values;
    // snag global to be sure we have it set first
    this.manifest =
      store.cmsSiteEditor.instance.haxCmsSiteEditorElement.manifest;
    // set items specifically since it's just an outline update
    this.manifest.items = e.detail;
    // loop through and match the data our backend generates
    this.manifest.items.forEach((element, index) => {
      // test for things that are not set and build the whole thing out
      if (typeof element.location === typeof undefined) {
        if (!page.id) {
          page.id = this.generateResourceID("item-");
        }
        if (!page.location) {
          page.location = "pages/" + page.id + "/index.html";
        }
        let directory = page.location.replace("/index.html", "");
        element.id = page.id;
        element.location = page.location;
        element.order = page.order;
        element.indent = page.indent;
        element.parent = page.parent;
        element.description = page.description;
        element.metadata.created = Math.floor(Date.now() / 1000);
        element.metadata.updated = Math.floor(Date.now() / 1000);
        // make a directory
        this.$.beaker.archive.mkdir(directory);
        // make the page
        this.$.beaker.write(page.location, "<p>My great new content!</p>");
        this.set(`manifest.items.${index}`, element);
      }
    });
    this.$.beaker.write("site.json", JSON.stringify(this.manifest, null, 2));
    // simulate save events since they wont fire
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.$.toast.show(
      `${page.title} created!`
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true
      })
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("json-outline-schema-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this.manifest
      })
    );
  }
  /**
   * Manifest save event.
   */
  async saveManifest(e) {
    this.manifest = e.detail;
    // limits options but makes it possible to switch core themes
    if (typeof this.manifest.metadata.theme === "string") {
      const themeData = {
        "haxcms-dev-theme": {
          element: "haxcms-dev-theme",
          path: "@lrnwebcomponents/haxcms-elements/lib/haxcms-dev-theme.js",
          name: "Developer theme"
        },
        "outline-player": {
          element: "outline-player",
          path: "@lrnwebcomponents/outline-player/outline-player.js",
          name: "Outline player"
        },
        "simple-blog": {
          element: "simple-blog",
          path: "@lrnwebcomponents/simple-blog/simple-blog.js",
          name: "Simple blog"
        }
      };
      // if it's not a core theme we can't really do it
      if (themeData[this.manifest.metadata.theme]) {
        this.manifest.metadata.theme = themeData[this.manifest.metadata.theme];
      }
    }
    await this.$.beaker.write(
      "site.json",
      JSON.stringify(this.manifest, null, 2)
    );
    // simulate save events since they wont fire
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.$.toast.show(
      "Site details saved!"
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true
      })
    );
    store.cmsSiteEditor.instance.haxCmsSiteEditorElement.dispatchEvent(
      new CustomEvent("json-outline-schema-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this.manifest
      })
    );
  }
  /**
   * JWT token fired, let's capture it
   */
  _jwtTokenFired(e) {
    this.jwt = e.detail;
  }
  /**
   * Generate a uinque ID
   */
  generateResourceID(base = "") {
    function idPart() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      base +
      idPart() +
      idPart() +
      "-" +
      idPart() +
      "-" +
      idPart() +
      "-" +
      idPart() +
      "-" +
      idPart() +
      idPart() +
      idPart()
    );
  }
  /**
   * Attached life cycle
   */
  async connectedCallback() {
    super.connectedCallback();
    let beaker = this.$.beaker;
    this.jwt = beaker.archive.url;
    var info = await beaker.archive.getInfo();
    // test that we have a url (we'll call it jwt for now) and that we own the site
    if (this.jwt != null && typeof this.jwt == "string" && info.isOwner) {
      var appstore = JSON.parse(await beaker.read("appstore.json"));
      // attempt to dynamically import the hax cms site editor
      // which will appear to be injecting into the page
      // but because of this approach it should be non-blocking
      try {
        import("@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-editor.js").then(
          e => {
            let haxCmsSiteEditorElement = document.createElement(
              "haxcms-site-editor"
            );
            haxCmsSiteEditorElement.jwt = this.jwt;
            haxCmsSiteEditorElement.appStore = appstore;
            store.cmsSiteEditor.instance.haxCmsSiteEditorElement = haxCmsSiteEditorElement;
            store.cmsSiteEditor.instance.appendTarget.appendChild(
              haxCmsSiteEditorElement
            );
          },
          e => {
            //import failed
          }
        );
      } catch (err) {
        // error in the event this is a double registration
      }
    }
  }
}
window.customElements.define(HAXCMSBackendBeaker.tag, HAXCMSBackendBeaker);
export { HAXCMSBackendBeaker };
