import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-button/paper-button.js";
import "@vaadin/vaadin-upload/vaadin-upload.js";
import "@lrnwebcomponents/secure-request/secure-request.js";
import "./lrnapp-studio-submission-edit-add-asset.js";
import "./lrnapp-studio-submission-edit-file.js";
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: relative;
        min-height: 200px;
      }

      #pages {
        display: block;
      }

      .files__files {
        display: flex;
        flex-wrap: wrap;
      }

      .files__files > * {
        margin-right: 16px;
        min-width: 200px;
      }

      neon-animated-pages .iron-selected {
        position: static;
      }

      paper-dialog {
        width: 50%;
        width: 50vmax;
        padding: 16px;
      }
    </style>

    <div class="files__files">
      <template is="dom-repeat" items="{{files}}" as="file">
        <lrnapp-studio-submission-edit-file
          file="{{file}}"
          on-deleted="_deleteImage"
          data-index\$="[[index]]"
        ></lrnapp-studio-submission-edit-file>
      </template>
      <lrnapp-studio-submission-edit-add-asset
        on-click="_addImage"
        icon="editor:attach-file"
      ></lrnapp-studio-submission-edit-add-asset>
    </div>

    <paper-dialog
      id="dialog"
      entry-animation="scale-up-animation"
      exit-animation="fade-out-animation"
      with-backdrop=""
    >
      <h2>Add Files(s)</h2>
      <paper-dialog-scrollable>
        <div class="files__upload">
          <template is="dom-if" if="[[uploadUrl]]">
            <vaadin-upload
              accept="[[fileTypes]]"
              target="[[uploadUrl]]"
              method="POST"
              form-data-name="file-upload"
              on-upload-success="_handleImageUploadSuccess"
            >
              <div class="files__drop-label">
                <iron-icon icon="description"></iron-icon>
                Upload files here:
              </div>
            </vaadin-upload>
          </template>
        </div>
      </paper-dialog-scrollable>
      <div class="buttons">
        <paper-button dialog-dismiss="">Cancel</paper-button>
      </div>
    </paper-dialog>
  `,

  is: "lrnapp-studio-submission-edit-files",
  behaviors: [SecureRequest.xhr],

  properties: {
    files: {
      type: Array,
      notify: true,
      value: null
    },
    selectedPage: {
      type: String,
      value: 0
    },
    uploadUrl: {
      type: String,
      value: null,
      observer: "log"
    },
    fileTypes: {
      type: String,
      value: ""
    }
  },

  observers: ["_filesChanged(files)"],

  _filesChanged: function(files) {},

  _addImage: function(e) {
    // @todo switch to singleton
    this.$.dialog.open();
  },

  _selectPage: function(e) {
    var normalizedEvent = dom(e);
    var page = normalizedEvent.localTarget.getAttribute("data-page");
    this.set("selectedPage", page);
  },

  _handleImageUploadSuccess: function(e) {
    this.set("selectedPage", 0);
    var files = [];
    var response = e.detail.xhr.response;
    // normalize response string
    var response = JSON.parse(response);
    // get the newely created file
    if (response.data.file) {
      var file = response.data.file;
      if (this.files === null) {
        this.set("files", []);
      }
      this.push("files", file);
      this.$.dialog.close();
    }
  },

  _deleteImage: function(e) {
    var normalizedEvent = dom(e);
    var deleteIndex = normalizedEvent.localTarget.getAttribute("data-index");
    this.splice("files", Number(deleteIndex), 1);
  },

  _canUpload: function() {
    const uploadUrl = this.uploadUrl;
    if (uploadUrl !== null) {
      return true;
    } else {
      return false;
    }
  },

  log: function(property) {},
  /**
   * attached life cycle
   */
  attached: function() {
    const uploadUrl = this.generateUrl("/api/files");
    if (uploadUrl !== null) {
      this.set("uploadUrl", uploadUrl);
    }
  }
});
