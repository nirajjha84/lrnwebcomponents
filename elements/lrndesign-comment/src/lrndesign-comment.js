import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import "@lrnwebcomponents/lrndesign-avatar/lrndesign-avatar.js";
import "time-elements/dist/time-elements.js";
/**
 * `lrndesign-comment`
 * A LRN element
 *
 * @demo demo/index.html
 */
let LrndesignComment = Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }
      .comment-left {
        float: left;
        display: inline-block;
      }
      .comment-right {
        display: inline-block;
      }
    </style>
    <div class="comment-container">
      <div class="comment-left"><lrndesign-avatar></lrndesign-avatar></div>
      <div class="comment-right">
        <div class="row-1">
          <span>{{name}}</span>
          <relative-time datetime\$="{{date}}"> </relative-time>
        </div>
        <div class="row-2"><slot></slot></div>
        <div class="row-3">{{links}}</div>
      </div>
    </div>
  `,

  is: "lrndesign-comment",

  properties: {
    avatar: {
      type: Object,
      reflectToAttribute: true,
      notify: true
    },
    name: {
      type: String,
      reflectToAttribute: true,
      notify: true
    },
    date: {
      type: String,
      value: "2014-04-01T00:00:00.000Z",
      reflectToAttribute: true,
      notify: true
    },
    links: {
      type: Object,
      notify: true
    }
  }
});
export { LrndesignComment };
