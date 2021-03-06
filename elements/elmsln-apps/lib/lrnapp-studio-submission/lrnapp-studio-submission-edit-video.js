import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@lrnwebcomponents/secure-request/secure-request.js";
import "./lrnapp-studio-submission-edit-add-asset.js";
import "./lrnapp-studio-submission-media-editoverlay.js";
Polymer({
  _template: html`
    <style>
      :host {
        display: flex;
        position: relative;
        align-items: stretch;
      }

      :host * {
        background: lightgray;
        display: flex;
        align-items: center;
        margin-right: 1em;
      }

      iframe {
        display: block;
      }

      .videosfield__create {
        display: block;
        height: 250px;
        width: 300px;
      }

      paper-dialog {
        width: 50%;
        width: 50vmax;
        padding: 1em;
      }
    </style>

    <template is="dom-repeat" items="{{videos}}" as="video">
      <lrnapp-studio-submission-media-editoverlay
        on-delete="_videoDelete"
        data-index\$="[[index]]"
      >
        <iframe class="videosfield__iframe" src="{{video.video_src}}"></iframe>
      </lrnapp-studio-submission-media-editoverlay>
    </template>

    <lrnapp-studio-submission-edit-add-asset
      icon="av:video-library"
      on-click="_openDialog"
    ></lrnapp-studio-submission-edit-add-asset>

    <paper-dialog
      id="dialog"
      entry-animation="scale-up-animation"
      exit-animation="fade-out-animation"
      with-backdrop=""
    >
      <h2>Add Video</h2>
      <paper-dialog-scrollable>
        <paper-input label="Video URL" value="{{newvideo}}"></paper-input>
      </paper-dialog-scrollable>
      <div class="buttons">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button dialog-confirm="" on-click="_addImage"
          >Add Video</paper-button
        >
      </div>
    </paper-dialog>

    <template is="dom-if" if="[[videoGenerateSourceUrl]]">
      <!-- Generate Video Source Url for preview -->
      <iron-ajax
        id="videoGenerateSourceUrl"
        url="[[videoGenerateSourceUrl]]"
        method="POST"
        body="[[newvideo]]"
        content-type="application/json"
        handle-as="json"
        on-response="_addImage"
      ></iron-ajax>
    </template>
  `,

  is: "lrnapp-studio-submission-edit-video",
  behaviors: [SecureRequest.xhr],

  properties: {
    videos: {
      type: Array,
      value: [],
      notify: true
    },
    selectedPage: {
      type: String,
      value: "0"
    },
    newvideo: {
      type: String,
      value: ""
    },
    videoGenerateSourceUrl: {
      type: String,
      value: null
    }
  },
  _openDialog: function(e) {
    // @todo use singleton
    this.$.dialog.open();
  },

  _addImage: function(e) {
    var video_url = this.newvideo;
    var normalizedEvent = dom(e);
    var tagname = normalizedEvent.localTarget.tagName;
    // find out if the component that called this function
    // if it's the iron-ajax then that means we have what we
    // need to add this new video to the array.
    if (tagname === "IRON-AJAX") {
      var video_src = e.detail.response.data;
      // make sure we upgrade from NULL to an array if needed
      if (Object.prototype.toString.call(this.videos) != "[object Array]") {
        this.videos = [];
      }
      this.push("videos", { video_url: this.newvideo, video_src: video_src });
      this.newvideo = "";
    }
    // if it wasn't iron ajax, then we need to go get the
    // newvideo's source url from the api
    else {
      this.shadowRoot
        .querySelector("#videoGenerateSourceUrl")
        .generateRequest();
    }
  },

  _videoDelete: function(e) {
    var normalizedEvent = dom(e);
    var deleteIndex = normalizedEvent.localTarget.getAttribute("data-index");
    this.splice("videos", deleteIndex, 1);
  },

  ready: function() {
    const url = this.generateUrl("/api/video/generate-source-url");
    this.set("videoGenerateSourceUrl", url);
  }
});
