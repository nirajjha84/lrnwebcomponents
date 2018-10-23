define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.HaxContent = void 0;
  function _templateObject_01557400d6f111e8b89ef5c2d76fe4b2() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_01557400d6f111e8b89ef5c2d76fe4b2 = function() {
      return data;
    };
    return data;
  }
  var HaxContent = (function(_PolymerElement) {
    babelHelpers.inherits(HaxContent, _PolymerElement);
    function HaxContent() {
      babelHelpers.classCallCheck(this, HaxContent);
      return babelHelpers.possibleConstructorReturn(
        this,
        (HaxContent.__proto__ || Object.getPrototypeOf(HaxContent)).apply(
          this,
          arguments
        )
      );
    }
    babelHelpers.createClass(
      HaxContent,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                HaxContent.prototype.__proto__ ||
                  Object.getPrototypeOf(HaxContent.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              HaxContent.haxProperties,
              HaxContent.tag,
              this
            );
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_01557400d6f111e8b89ef5c2d76fe4b2()
            );
          }
        },
        {
          key: "haxProperties",
          get: function get() {
            return {
              canScale: !0,
              canPosition: !0,
              canEditSource: !1,
              gizmo: {
                title: "Hax content",
                description: "Automated conversion of hax-content/",
                icon: "icons:android",
                color: "green",
                groups: ["Content"],
                handles: [{ type: "todo:read-the-docs-for-usage" }],
                meta: {
                  author: "btopro",
                  owner: "The Pennsylvania State University"
                }
              },
              settings: { quick: [], configure: [], advanced: [] }
            };
          }
        },
        {
          key: "properties",
          get: function get() {
            return {};
          }
        },
        {
          key: "tag",
          get: function get() {
            return "hax-content";
          }
        }
      ]
    );
    return HaxContent;
  })(_polymerElement.PolymerElement);
  _exports.HaxContent = HaxContent;
  window.customElements.define(HaxContent.tag, HaxContent);
});