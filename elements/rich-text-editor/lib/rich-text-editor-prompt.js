/**
 * Copyright 2019 Penn State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { RichTextEditorButton } from "./rich-text-editor-button.js";
import "@lrnwebcomponents/es-global-bridge/es-global-bridge.js";
import "@lrnwebcomponents/a11y-collapse/a11y-collapse.js";
import "./rich-text-prompt-state-manager.js";
import "@polymer/paper-input/paper-input.js";

/**
 * `rich-text-editor-prompt`
 * `a picker for rich text editor (custom buttons can extend this)`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @polymer
 */
class RichTextEditorPrompt extends RichTextEditorButton {
  // properties available to the custom element for data binding
  static get properties() {
    return {
      /**
       * the text of the prompt, as in "Link href" or "Image src"
       */
      prompt: {
        name: "prompt",
        type: String,
        value: "Value"
      },
      /**
       * the text of the prompt, as in "Link href" or "Image src"
       */
      target: {
        name: "target",
        type: Object,
        value: null
      },
      /**
       * Eco-json-schema of the prompt.
       */
      schema: {
        type: Object,
        value: {
          $schema: "http://json-schema.org/schema#",
          title: "Link",
          type: "Object",
          properties: {
            href: {
              title: "Href",
              type: "Input",
              value: null
            },
            target: {
              title: "Target",
              type: "Input",
              value: null
            }
          }
        }
      }
    };
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "rich-text-editor-prompt";
  }

  /**
   * life cycle, element is ready
   */
  ready() {
    super.ready();
    let root = this;
    this.__popover = window.RichTextPromptStateManager.requestAvailability();
  }
  /**
   * Handles button tap;
   */
  _buttonTap(e) {
    e.preventDefault();
    this.__popover.setTarget(this);
    //this.doTextOperation();
  }
}
window.customElements.define(RichTextEditorPrompt.tag, RichTextEditorPrompt);
export { RichTextEditorPrompt };
