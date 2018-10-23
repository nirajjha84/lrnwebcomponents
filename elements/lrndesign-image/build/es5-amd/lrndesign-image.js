define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.LrndesignImage = void 0;
  function _templateObject_3c46bdf0d6f911e898e24f031780d026() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_3c46bdf0d6f911e898e24f031780d026 = function() {
      return data;
    };
    return data;
  }
  var LrndesignImage = (function(_PolymerElement) {
    babelHelpers.inherits(LrndesignImage, _PolymerElement);
    function LrndesignImage() {
      babelHelpers.classCallCheck(this, LrndesignImage);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          LrndesignImage.__proto__ || Object.getPrototypeOf(LrndesignImage)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      LrndesignImage,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                LrndesignImage.prototype.__proto__ ||
                  Object.getPrototypeOf(LrndesignImage.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              LrndesignImage.haxProperties,
              LrndesignImage.tag,
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
              _templateObject_3c46bdf0d6f911e898e24f031780d026()
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
                title: "Lrndesign image",
                description: "Automated conversion of lrndesign-image/",
                icon: "icons:android",
                color: "green",
                groups: ["Image"],
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
            return "lrndesign-image";
          }
        }
      ]
    );
    return LrndesignImage;
  })(_polymerElement.PolymerElement);
  _exports.LrndesignImage = LrndesignImage;
  window.customElements.define(LrndesignImage.tag, LrndesignImage);
});