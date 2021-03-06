/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { HAXWiring } from "@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";
/**
 * `relative-heading`
 * `outputs the correct heading hierarchy based on parent&#39;s heading`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RelativeHeading extends PolymerElement {
  /* REQUIRED FOR TOOLING DO NOT TOUCH */

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "relative-heading";
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    super.connectedCallback();
    this.HAXWiring = new HAXWiring();
    this.HAXWiring.setup(
      RelativeHeading.haxProperties,
      RelativeHeading.tag,
      this
    );
  }
  /**
   * update this level when the parent id changes
   */
  _getLevel(parentId, defaultLevel) {
    let root = this,
      parent = document.querySelector("#" + parentId),
      parentLvl =
        parent !== null && parent.level !== undefined
          ? parent.level
          : defaultLevel - 1,
      level = parentLvl < 6 ? parentLvl + 1 : 6;
    return level;
  }
  _updateChildren() {
    document
      .querySelectorAll('relative-heading[parent-id="' + this.id + '"]')
      .forEach(child => {
        child.parentId = null;
        child.parentId = this.id;
      });
  }
  /**
   * determines if the level matches a specific level
   *
   * @param {number} the heading level
   * @param {number} the level it might match
   * @returns {boolean} whether or not they match
   */
  _isLevel(level, testLevel) {
    return level === testLevel;
  }
  /**
   * life cycle, element is removed from the DOM
   * /
  disconnectedCallback() {
  }*/
}
window.customElements.define(RelativeHeading.tag, RelativeHeading);
export { RelativeHeading };
