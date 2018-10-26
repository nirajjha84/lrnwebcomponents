define(["./node_modules/@polymer/polymer/polymer-legacy.js"], function(
  _polymerLegacy
) {
  "use strict";
  function _templateObject_ab0f1a10d94311e8be8131d100d9b81b() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <custom-style>\n    <style is="custom-style">\n      :host {\n        display: inline-block;\n      }\n      :host[size="tiny"] #image {\n        width: 5em;\n        height: 5em;\n      }\n      :host[size="small"] #image {\n        width: 10em;\n        height: 10em;\n      }\n      :host[size="medium"] #image {\n        width: 15em;\n        height: 15em;\n      }\n      :host[size="large"] #image {\n        width: 20em;\n        height: 20em;\n      }\n      :host[size="epic"] #image {\n        width: 45em;\n        height: 45em;\n      }\n\n      :host[color="red"] #image {\n        filter: sepia() saturate(10000%) hue-rotate(30deg);\n      }\n      :host[color="purple"] #image {\n        filter: sepia() saturate(10000%) hue-rotate(290deg);\n      }\n      :host[color="blue"] #image {\n        filter: sepia() saturate(10000%) hue-rotate(210deg);\n      }\n      :host[color="orange"] #image {\n        filter: sepia() saturate(10000%) hue-rotate(320deg);\n      }\n      :host[color="yellow"] #image {\n        filter: sepia() saturate(10000%) hue-rotate(70deg);\n      }\n      #image {\n        width: 15em;\n        height: 15em;\n      }\n    </style>\n    </custom-style>\n    <img src="[[image]]" id="image" class="image-tag" alt="" />\n'
    ]);
    _templateObject_ab0f1a10d94311e8be8131d100d9b81b = function() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_ab0f1a10d94311e8be8131d100d9b81b()
    ),
    is: "awesome-explosion",
    listeners: {
      tap: "_setPlaySound",
      mouseover: "_setPlaySound",
      mouseout: "_setStopSound"
    },
    properties: {
      state: { type: String, value: "stop", reflectToAttribute: !0 },
      stopped: { type: Boolean, computed: "_calculateStopped(state)" },
      playing: { type: Boolean, computed: "_calculatePlaying(state)" },
      paused: { type: Boolean, computed: "_calculatePaused(state)" },
      image: {
        type: String,
        value: "assets/explode.gif",
        reflectToAttribute: !0
      },
      sound: {
        type: String,
        value: "assets/273320__clagnut__fireworks.mp3",
        reflectToAttribute: !0
      },
      size: { type: String, value: "medium", reflectToAttribute: !0 },
      color: { type: String, value: "", reflectToAttribute: !0 },
      resetSound: { type: Boolean, value: !1, reflectToAttribute: !0 }
    },
    _calculateStopped: function _calculateStopped(newValue) {
      if ("stop" == newValue) {
        this.stopped = !0;
        if (babelHelpers.typeof(window.audio) !== "undefined") {
          window.audio.currentTime = 0;
        }
        this._stopSound();
        this.fire("awesome-event", { message: "Sound stopped" });
      } else {
        this.stopped = !1;
      }
    },
    _calculatePlaying: function _calculatePlaying(newValue) {
      if ("play" == newValue) {
        this.playing = !0;
        this._playSound();
        this.fire("awesome-event", { message: "Sound played" });
      } else {
        this.playing = !1;
      }
    },
    _calculatePaused: function _calculatePaused(newValue) {
      if ("pause" == newValue) {
        this.paused = !0;
        this._stopSound();
        this.fire("awesome-event", { message: "Sound paused" });
      } else {
        this.paused = !1;
      }
    },
    _stopSound: function _stopSound() {
      if (babelHelpers.typeof(window.audio) !== "undefined") {
        window.audio.pause();
        if (this.resetSound) {
          window.audio.currentTime = 0;
        }
      }
    },
    _setPlaySound: function _setPlaySound() {
      this.state = "play";
    },
    _setStopSound: function _setStopSound() {
      this.state = "pause";
    },
    _playSound: function _playSound() {
      if (babelHelpers.typeof(window.audio) === "undefined") {
        window.audio = new Audio(this.sound);
      }
      window.audio.play();
    }
  });
});