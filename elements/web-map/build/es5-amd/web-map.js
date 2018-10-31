define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js",
  "./lib/map-layer.js",
  "./lib/map-area.js",
  "./lib/map-styles.js"
], function(_polymerLegacy, _polymerDom) {
  "use strict";
  function _templateObject_d2632b20dbb811e8b42e65befbc72f49() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n  <!-- use the leaflet-styles style module -->\n  <style include="map-styles">\n    /* make sure the map element doesn\'t get selected and styled by document styles */\n    :host {\n        display: inline-block !important;\n        position: relative !important;\n    }\n    /* try to constrain the map and the leaflet div#map to the size of the container */\n        :host, :host #map {\n         max-width: 100%;\n         min-width: 100%;\n    }\n    /* this is a hack for shady DOM, as max-width messes with Leaflet tiles */\n    :host img {\n        max-width: none !important;\n    }\n    #map:focus {\n        outline: 2px  double lightskyblue;\n    }\n  </style>\n  <!-- giving the map div a tabindex allows the map to display its focus. -->\n  <!-- see the #map:focus selector in styles, above. -->\n  <div id="map" tabindex="0"></div>\n  <slot></slot>\n'
    ]);
    _templateObject_d2632b20dbb811e8b42e65befbc72f49 = function() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_d2632b20dbb811e8b42e65befbc72f49()
    ),
    is: "web-map",
    extends: "map",
    factoryImpl: function factoryImpl(
      width,
      height,
      lat,
      lon,
      zoom,
      projection,
      controls
    ) {
      this.width = width;
      this.height = height;
      this.lat = lat || this.lat;
      this.lon = lon || this.lon;
      this.zoom = zoom || this.zoom;
      this.projection = projection || "OSMTILE";
      this.controls = controls || this.controls;
    },
    properties: {
      lat: { type: Number, value: 0, reflectToAttribute: !0 },
      lon: { type: Number, value: 0, reflectToAttribute: !0 },
      zoom: { type: Number, value: 0, reflectToAttribute: !0 },
      projection: { type: String, value: "OSMTILE", reflectToAttribute: !1 },
      width: { type: Number, value: null, reflectToAttribute: !0 },
      height: { type: Number, value: null, reflectToAttribute: !0 },
      layers: {
        type: Object,
        value: function value() {
          return this.getElementsByTagName("layer-");
        }
      },
      areas: {
        type: Object,
        value: function value() {
          return this.getElementsByTagName("area");
        }
      },
      controls: { type: Boolean, reflectToAttribute: !0 }
    },
    observers: [
      "_widthChanged(width)",
      "_heightChanged(height)",
      "_toggleControls(controls)"
    ],
    _toggleControls: function _toggleControls(controls) {
      if (this._map) {
        if (controls) {
          this._zoomControl = L.control.zoom().addTo(this._map);
          this._layerControl = M.mapMlLayerControl(null, {
            collapsed: !0
          }).addTo(this._map);
          for (var i = 0; i < this.layers.length; i++) {
            if (!this.layers[i].hidden) {
              this._layerControl.addOverlay(
                this.layers[i]._layer,
                this.layers[i].label
              );
              this._map.on(
                "moveend",
                this.layers[i]._validateDisabled,
                this.layers[i]
              );
              this.layers[i]._layerControl = this._layerControl;
            }
          }
        } else {
          this._map.removeControl(this._layerControl);
          this._map.removeControl(this._zoomControl);
        }
      }
    },
    _widthChanged: function _widthChanged(width) {
      this.style.width = width + "px";
      this.$.map.style.width = width + "px";
      if (this._map) {
        this._map.invalidateSize(!1);
      }
    },
    _heightChanged: function _heightChanged(height) {
      this.style.height = height + "px";
      this.$.map.style.height = height + "px";
      if (this._map) {
        this._map.invalidateSize(!1);
      }
    },
    zoomTo: function zoomTo(lat, lon, zoom) {
      zoom = zoom || this.zoom;
      var location = new L.LatLng(lat, lon);
      this._map.setView(location, zoom);
      this.zoom = zoom;
      this.lat = location.lat;
      this.lon = location.lng;
    },
    _updateMapCenter: function _updateMapCenter() {
      this.lat = this._map.getCenter().lat;
      this.lon = this._map.getCenter().lng;
      this.zoom = this._map.getZoom();
    },
    ready: function ready() {
      L.Icon.Default.imagePath = (function() {
        var imp = document.querySelector(
            'link[rel="import"][href*="web-map.html"]'
          ),
          doc = imp ? imp.import : document,
          scripts = doc.getElementsByTagName("script"),
          leafletRe = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/,
          i,
          len,
          src,
          path;
        for (i = 0, len = scripts.length; i < len; i++) {
          src = scripts[i].src;
          if (src.match(leafletRe)) {
            path = src.split(leafletRe)[0];
            return (path ? path + "/" : "") + "images";
          }
        }
      })();
      if (this.hasAttribute("name")) {
        var name = this.getAttribute("name");
        if (name) {
          this.poster = document.querySelector(
            "img[usemap=" + '"#' + name + '"]'
          );
          if (this.poster) {
            if (L.Browser.gecko) {
              this.poster.removeAttribute("usemap");
            }
            (0, _polymerDom.dom)(this.$.map).appendChild(this.poster);
          }
        }
      }
    },
    detached: function detached() {
      this._removeEvents();
    },
    attached: function attached() {
      this.async(function() {
        var s = window.getComputedStyle(this),
          wpx = s.width,
          hpx = s.height,
          w = parseInt(wpx.replace("px", "")),
          h = parseInt(hpx.replace("px", ""));
        if ("" === wpx || "" === hpx) {
          return;
        }
        if (!this.width || this.width !== w) {
          this.$.map.style.width = wpx;
          this.width = w;
        } else {
          this.$.map.style.width = this.width + "px";
        }
        if (!this.height || this.height !== h) {
          this.$.map.style.height = h;
          this.height = h;
        } else {
          this.$.map.style.height = this.height + "px";
        }
        if (!this._map) {
          this._map = L.map(this.$.map, {
            center: new L.LatLng(this.lat, this.lon),
            projection: this.projection,
            crs: M[this.projection],
            zoom: this.zoom,
            zoomControl: !1,
            fadeAnimation: !0
          });
          if (this.controls) {
            this._layerControl = M.mapMlLayerControl(null, {
              collapsed: !0
            }).addTo(this._map);
            this._zoomControl = L.control.zoom().addTo(this._map);
          }
          this._attributionControl = this._map.attributionControl.setPrefix(
            '<a href="https://www.w3.org/community/maps4html/" title="W3C Maps4HTML Community Group">Maps4HTML</a> | <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
          );
          for (var i = 0; i < this.layers.length; i++) {
            this.layers[i]._attachedToMap();
          }
          for (var i = 0; i < this.areas.length; i++) {
            this.areas[i]._attachedToMap();
          }
          if (
            this.layers[0] &&
            "undefined" === typeof this.layers[0]._layer.error &&
            this.layers[0]._layer._extent
          ) {
            if (this.poster) {
              this.poster.style.display = "none";
            }
          }
          this._setUpEvents();
          this.fire("load", { target: this });
        }
      }, 10);
    },
    _removeEvents: function _removeEvents() {
      if (this._map) {
        this._map.off(
          "preclick click dblclick mousemove mouseover mouseout mousedown mouseup contextmenu",
          !1,
          this
        );
        this._map.off(
          "load movestart move moveend zoomstart zoom zoomend",
          !1,
          this
        );
      }
    },
    _setUpEvents: function _setUpEvents() {
      this._map.on(
        "load",
        function() {
          this.fire("load", { target: this });
        },
        this
      );
      this._map.on(
        "preclick",
        function(e) {
          this.fire("preclick", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "click",
        function(e) {
          this.fire("click", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "dblclick",
        function(e) {
          this.fire("dblclick", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "mousemove",
        function(e) {
          this.fire("mousemove", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "mouseover",
        function(e) {
          this.fire("mouseover", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "mouseout",
        function(e) {
          this.fire("mouseout", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "mousedown",
        function(e) {
          this.fire("mousedown", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "mouseup",
        function(e) {
          this.fire("mouseup", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "contextmenu",
        function(e) {
          this.fire("contextmenu", {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            x: e.containerPoint.x,
            y: e.containerPoint.y
          });
        },
        this
      );
      this._map.on(
        "movestart",
        function() {
          this._updateMapCenter();
          this.fire("movestart", { target: this });
        },
        this
      );
      this._map.on(
        "move",
        function() {
          this._updateMapCenter();
          this.fire("move", { target: this });
        },
        this
      );
      this._map.on(
        "moveend",
        function() {
          this._updateMapCenter();
          this.fire("moveend", { target: this });
        },
        this
      );
      this._map.on(
        "zoomstart",
        function() {
          this._updateMapCenter();
          this.fire("zoomstart", { target: this });
        },
        this
      );
      this._map.on(
        "zoom",
        function() {
          this._updateMapCenter();
          this.fire("zoom", { target: this });
        },
        this
      );
      this._map.on(
        "zoomend",
        function() {
          this._updateMapCenter();
          this.fire("zoomend", { target: this });
        },
        this
      );
    }
  });
});