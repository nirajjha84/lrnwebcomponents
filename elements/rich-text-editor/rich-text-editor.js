/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { HAXWiring } from "@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";
import { ResponsiveUtility } from "@lrnwebcomponents/responsive-utility/responsive-utility.js";
import "./lib/rich-text-editor-button.js";
import "./lib/rich-text-editor-more-button.js";
import "./lib/rich-text-editor-heading-picker.js";
import "./lib/rich-text-editor-symbol-picker.js";
import "./lib/rich-text-editor-link.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/editor-icons.js";
import "@polymer/iron-icons/image-icons.js";
import "@lrnwebcomponents/md-extra-icons/md-extra-icons.js";
/**
 * `rich-text-editor`
 * `a standalone rich text editor`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @polymer
 * @demo demo/index.html demo
 * @demo demo/content.html easy implementation
 * @demo demo/config.html custom configuration
 */
class RichTextEditor extends PolymerElement {
  // render function
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
          z-index: 9999;
          --rich-text-editor-bg: #fafafa;
          --rich-text-editor-button-color: #444;
          --rich-text-editor-border: 1px solid #ddd;
          --rich-text-editor-button-border: transparent;
          --rich-text-editor-button-disabled-color: #666;
          --rich-text-editor-button-disabled-bg: transparent;
          --rich-text-editor-button-toggled-color: #222;
          --rich-text-editor-button-toggled-bg: #ddd;
          --rich-text-editor-button-hover-color: #000;
          --rich-text-editor-button-hover-bg: #f0f0f0;
          --rich-text-editor-picker-border: #fafafa;
          @apply --rich-text-editor;
        }
        :host([sticky]) {
          position: sticky;
          top: 0;
        }
        :host #toolbar {
          display: flex;
          opacity: 1;
          margin: 0;
          align-items: stretch;
          flex-wrap: wrap;
          justify-content: flex-start;
          background-color: var(--rich-text-editor-bg);
          border: var(--rich-text-editor-border);
          font-size: 12px;
          transition: all 0.5s;
          @apply --rich-text-editor-toolbar;
        }
        :host #toolbar[aria-hidden] {
          visibility: hidden;
          opacity: 0;
          height: 0;
        }
        :host #toolbar .group {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-evenly;
          align-items: stretch;
          padding: 0 3px;
          @apply --rich-text-editor-toolbar-group;
        }
        :host #toolbar .group:not(:last-of-type) {
          margin-right: 3px;
          border-right: var(--rich-text-editor-border);
          @apply --rich-text-editor-toolbar-divider;
        }
        :host #toolbar .button {
          display: flex;
          flex: 0 0 auto;
          align-items: stretch;
          margin: 3px;
        }
        :host #toolbar #morebutton {
          flex: 1 0 auto;
          justify-content: flex-end;
        }

        :host([responsive-size="xs"]) #morebutton[collapse-max="xs"],
        :host([responsive-size="sm"]) #morebutton[collapse-max*="s"],
        :host([responsive-size="md"]) #morebutton:not([collapse-max*="l"]),
        :host([responsive-size="lg"]) #morebutton:not([collapse-max="xl"]),
        :host([responsive-size="xl"]) #morebutton,
        :host([responsive-size="xs"])
          #toolbar[collapsed]
          *[collapsed-until*="m"],
        :host([responsive-size="xs"])
          #toolbar[collapsed]
          *[collapsed-until*="l"],
        :host([responsive-size="sm"])
          #toolbar[collapsed]
          *[collapsed-until="md"],
        :host([responsive-size="sm"])
          #toolbar[collapsed]
          *[collapsed-until*="l"],
        :host([responsive-size="md"])
          #toolbar[collapsed]
          *[collapsed-until*="l"],
        :host([responsive-size="lg"])
          #toolbar[collapsed]
          *[collapsed-until="xl"] {
          display: none;
        }
      </style>
      <div id="toolbar" aria-hidden$="[[!controls]]" collapsed$="[[collapsed]]">
        <rich-text-editor-more-button
          id="morebutton"
          class="button"
          controls="toolbar"
          icon="more-vert"
          label="More buttons"
          label-toggled="Fewer buttons"
          toggled$="[[!collapsed]]"
          on-tap="_toggleMore"
        >
        </rich-text-editor-more-button>
      </div>
    `;
  }

  // haxProperty definition
  static get haxProperties() {
    return {
      canScale: true,
      canPosition: true,
      canEditSource: false,
      gizmo: {
        title: "Rich text-editor",
        description: "a standalone rich text editor",
        icon: "icons:android",
        color: "green",
        groups: ["Text"],
        handles: [
          {
            type: "todo:read-the-docs-for-usage"
          }
        ],
        meta: {
          author: "nikkimk",
          owner: "Penn State University"
        }
      },
      settings: {
        quick: [],
        configure: [
          {
            property: "title",
            description: "",
            inputMethod: "textfield",
            required: false,
            icon: "icons:android"
          }
        ],
        advanced: []
      }
    };
  }
  // properties available to the custom element for data binding
  static get properties() {
    return {
      /**
       * The editor buttons.
       */
      buttons: {
        name: "buttons",
        type: "Array",
        computed: "_getButtons(config)"
      },
      /**
       * The editable content, if edits are canceled.
       */
      canceled: {
        name: "canceled",
        type: "Object",
        value: true
      },
      /**
       * Is the menu collapsed.
       */
      collapsed: {
        name: "collapsed",
        type: "Boolean",
        value: true
      },
      /**
       * The button config on the toolbar.
       */
      config: {
        name: "config",
        type: "Object",
        value: [
          {
            label: "History",
            type: "button-group",
            buttons: [
              {
                command: "undo",
                icon: "undo",
                label: "Undo",
                type: "rich-text-editor-button"
              },
              {
                command: "redo",
                icon: "redo",
                label: "Redo",
                type: "rich-text-editor-button"
              }
            ]
          },
          {
            label: "Basic Inline Operations",
            type: "button-group",
            buttons: [
              {
                label: "Heading",
                type: "rich-text-editor-heading-picker"
              },
              {
                command: "bold",
                icon: "editor:format-bold",
                label: "Bold",
                toggles: true,
                type: "rich-text-editor-button"
              },
              {
                command: "italic",
                icon: "editor:format-italic",
                label: "Italics",
                toggles: true,
                type: "rich-text-editor-button"
              },
              {
                command: "removeFormat",
                icon: "editor:format-clear",
                label: "Erase Format",
                type: "rich-text-editor-button"
              }
            ]
          },
          {
            label: "Links",
            type: "button-group",
            buttons: [
              {
                command: "link",
                icon: "link",
                label: "Link",
                prompt: "href",
                toggledCommand: "unlink",
                toggledIcon: "mdextra:unlink",
                toggledLabel: "Unink",
                toggles: true,
                type: "rich-text-editor-prompt"
              }
            ]
          },
          {
            label: "Clipboard Operations",
            type: "button-group",
            buttons: [
              {
                command: "cut",
                icon: "content-cut",
                label: "Cut",
                type: "rich-text-editor-button"
              },
              {
                command: "copy",
                icon: "content-copy",
                label: "Copy",
                type: "rich-text-editor-button"
              },
              {
                command: "paste",
                icon: "content-paste",
                label: "Paste",
                type: "rich-text-editor-button"
              }
            ]
          },
          {
            collapsedUntil: "md",
            label: "Subscript and Superscript",
            type: "button-group",
            buttons: [
              {
                command: "subscript",
                icon: "mdextra:subscript",
                label: "Subscript",
                toggles: true,
                type: "rich-text-editor-button"
              },
              {
                command: "superscript",
                icon: "mdextra:superscript",
                label: "Superscript",
                toggles: true,
                type: "rich-text-editor-button"
              }
            ]
          },
          {
            collapsedUntil: "sm",
            icon: "editor:functions",
            label: "Insert Symbol",
            symbolTypes: ["symbols"],
            type: "rich-text-editor-symbol-picker"
          },
          {
            collapsedUntil: "sm",
            label: "Lists and Indents",
            type: "button-group",
            buttons: [
              {
                command: "insertOrderedList",
                icon: "editor:format-list-numbered",
                label: "Ordered List",
                toggles: true,
                type: "rich-text-editor-button"
              },
              {
                command: "insertUnorderedList",
                icon: "editor:format-list-bulleted",
                label: "Unordered List",
                toggles: true,
                type: "rich-text-editor-button"
              },
              {
                collapsedUntil: "lg",
                command: "formatBlock",
                commandVal: "blockquote",
                label: "Blockquote",
                icon: "editor:format-quote",
                type: "rich-text-editor-button"
              },
              {
                label: "Increase Indent",
                icon: "editor:format-indent-increase",
                event: "text-indent",
                command: "indent",
                type: "rich-text-editor-button"
              },
              {
                label: "Decrease Indent",
                icon: "editor:format-indent-decrease",
                event: "text-outdent",
                command: "outdent",
                type: "rich-text-editor-button"
              }
            ]
          }
        ]
      },
      /**
       * The target element's id attribute.
       */
      controls: {
        name: "controls",
        type: "String",
        value: null
      },
      /**
       * The editableElement element for the editor.
       */
      editableElements: {
        name: "editableElements",
        type: "Array",
        value: []
      },
      /**
       * The editableElement element for the editor.
       */
      editableElement: {
        name: "editableElement",
        type: "Object",
        value: null
      },
      /**
       * The the size of the editor.
       */
      responsiveSize: {
        name: "responsiveSize",
        type: "String",
        value: "xs",
        reflectToAttribute: true
      },
      /**
       * The current text selection.
       */
      savedSelection: {
        name: "savedSelection",
        type: "Object",
        value: null
      },
      /**
       * The current text selection.
       */
      selection: {
        name: "selection",
        type: "Object",
        value: null
      },
      /**
       * Should the toolbar stick to the top so that it is always visible.
       */
      sticky: {
        name: "sticky",
        type: "Boolean",
        value: false,
        reflectToAttribute: true
      }
    };
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "rich-text-editor";
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    super.connectedCallback();
    let root = this;
    window.ResponsiveUtility.requestAvailability();
    window.dispatchEvent(
      new CustomEvent("responsive-element", {
        detail: {
          element: root,
          attribute: "responsive-size",
          relativeToParent: true
        }
      })
    );
    document.designMode = "on";
    document.addEventListener("selectionchange", e => {
      root.getUpdatedSelection();
    });
  }

  /**
   * life cycle, element is disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    let root = this;
    document.removeEventListener("selectionchange", e => {
      root.getUpdatedSelection();
    });
  }

  /**
   * cancels edits to the active editableElement
   */
  cancel() {
    this.editableElement.innerHTML = this.canceled;
    this.editTarget(null);
  }
  /**
   * makes a editableElement editable
   *
   * @param {object} an HTML object that can be edited
   */
  editTarget(editableElement) {
    let root = this;
    if (
      editableElement.getAttribute("id") === undefined ||
      editableElement.getAttribute("id") === null
    )
      editableElement.setAttribute("id", root._generateUUID());

    if (root.editableElement !== editableElement) {
      //save changes to previous editableElement
      if (root.editableElement !== null) {
        root.editableElement.contentEditable = false;
        root.editableElement = null;
      }
      //activate the editableElement
      editableElement.parentNode.insertBefore(root, editableElement);
      root.editableElement = editableElement;
      root.canceled = editableElement.innerHTML;
      root.editableElement.contentEditable = true;
      root.controls = editableElement.getAttribute("id");
    }
  }

  /**
   * Gets the updated selection.
   */
  getUpdatedSelection() {
    let root = this;
    root.selection =
      root.editableElement === undefined || root.editableElement === null
        ? null
        : root.editableElement.getSelection
        ? root.editableElement.getSelection()
        : root._getRange();
    this.buttons.forEach(button => {
      button.selection = null;
      button.selection = root.selection;
    });
  }

  /**
   * removes an editable region to the list of editableElements
   *
   * @param {object} an HTML object that can be edited
   */
  removeEditableRegion(editableElement) {
    let root = this;
    for (let i = 0; i < this.editableElements.length; i++) {
      let item = this.editableElements[i];
      if (item[0] === editableElement) {
        item[0].removeEventListener("click", e => {
          root.editTarget(editableElement);
        });
        editableElement.removeEventListener("blur", e => {
          root.getUpdatedSelection();
        });
        editableElement.removeEventListener("mouseout", e => {
          root.getUpdatedSelection();
        });
        item[1].disconnect();
        this.set("editableElements", this.editableElements.splice(i, 1));
      }
    }
  }

  /**
   * adds an editable region to the list of editableElements
   *
   * @param {object} an HTML object that can be edited
   */
  addEditableRegion(editableElement) {
    let root = this,
      observer = new MutationObserver(e => {
        root.getUpdatedSelection();
      });
    editableElement.addEventListener("click", e => {
      root.editTarget(editableElement);
    });
    editableElement.addEventListener("blur", e => {
      root.getUpdatedSelection();
    });
    editableElement.addEventListener("mouseout", e => {
      root.getUpdatedSelection();
    });
    observer.observe(editableElement, {
      attributes: false,
      childList: true,
      subtree: true,
      characterData: false
    });
    root.push("editableElements", [editableElement, observer]);
  }

  /**
   * Adds a button to the toolbar
   *
   * @param {object} the child object in the config object
   * @param {object} the parent object in the config object
   */
  _addButton(child, parent) {
    let root = this,
      button = document.createElement(child.type);
    for (var key in child) {
      button[key] = child[key];
    }
    button.setAttribute("class", "button");
    /*button.addEventListener("mousedown", (e) => {
      e.preventDefault();
      root._preserveSelection(button);
    });
    button.addEventListener("keydown", (e) => {
      e.preventDefault();
      root._preserveSelection(button);
    });*/
    button.addEventListener("deselect", e => {
      console.log("deselect");
      root._getRange().collapse(false);
    });
    parent.appendChild(button);
    return button;
  }

  /**
   * Generate a UUID
   */
  _generateUUID() {
    return "ss-s-s-s-sss".replace(/s/g, this._uuidPart);
  }
  /**
   * Gets the groups array for the dom-repeat.
   *
   * @param {object} the toolbar buttons config object
   * @param {array} an array the buttons grouped by size
   */
  _getButtons(config) {
    let root = this,
      toolbar = root.$.toolbar,
      more = this.$.morebutton,
      max = 0,
      sizes = ["xs", "sm", "md", "lg", "xl"],
      temp = [];
    toolbar.innerHTML = "";
    config.forEach(item => {
      if (item.type === "button-group") {
        let group = document.createElement("div");
        group.setAttribute("class", "group");
        if (item.collapsedUntil !== undefined && item.collapsedUntil !== null)
          group.setAttribute("collapsed-until", item.collapsedUntil);
        max = Math.max(max, sizes.indexOf(item.collapsedUntil));
        item.buttons.forEach(button => {
          max = Math.max(max, sizes.indexOf(button.collapsedUntil));
          temp.push(root._addButton(button, group));
        });
        toolbar.appendChild(group);
      } else {
        max = Math.max(max, sizes.indexOf(item.collapsedUntil));
        temp.push(root._addButton(item, toolbar));
      }
      toolbar.appendChild(more);
      more.collapseMax = sizes[max];
    });
    return temp;
  }

  /**
   * Normalizes selection data.
   *
   * @returns {object} the selection
   */
  _getRange() {
    let sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    } else if (sel) {
      return sel;
    } else false;
  }

  /**
   * Preserves the selection when a button is pressed
   *
   * @param {object} the button
   */
  _preserveSelection() {
    let sel = window.getSelection(),
      temp = this.selection;
    this.buttons.forEach(button => {
      button.selection = temp;
    });
    sel.removeAllRanges();
    sel.addRange(temp);
  }

  /**
   * Toggles collapsed mode
   */
  _toggleMore(e) {
    this.collapsed = !this.collapsed;
  }

  /**
   * Generate UUID
   */
  _uuidPart() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}

export { RichTextEditor };

window.customElements.define(RichTextEditor.tag, RichTextEditor);
