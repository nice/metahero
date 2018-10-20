var m = require("mithril");

var Settings = {
  active: false,
  theme: "light",
  setTheme: function (value) {
    Settings.theme = value;
    if(value === "dark") {
      document.body.classList.add("theme-dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("theme-dark");
      window.localStorage.setItem("theme", "light");
    }
  },
  oninit: function() {
    var theme = localStorage.getItem("theme");
    if (theme) {
      Settings.theme = theme;
      Settings.setTheme(theme);
    }
  },
  view: function() {
    return m("div#modal-id.modal.modal-sm", {class: Settings.active?"active":""}, [
      m("a.modal-overlay", {
          "href": "#close",
          "aria-label": "Close",
          "className": "modal-overlay",
      }),
      m("div.modal-container", [
        m("div.modal-header", [
          m("a.btn.btn-clear.float-right", {
              "href": "#close",
              "aria-label": "Close",
              "className": "btn btn-clear float-right",
              onclick: function() {Settings.active = false;}
          }),
          m("div.modal-title.h5", 'Settings')
        ]),
        m("div.modal-body", [
          m("div.content", [
            m(".form-group", [
              m("label.form-label", "theme"),
              m("label.form-radio", [
                m("input[type='radio'][name='theme']", {
                  value: "light",
                  checked: Settings.theme === "light"?true:false,
                  onclick: m.withAttr("value", Settings.setTheme),
                }),
                m("i.form-icon", "")
              ], "light"),
              m("label.form-radio", [
                m("input[type='radio'][name='theme']", {
                  value: "dark",
                  checked: Settings.theme === "dark"?true:false,
                  onclick: m.withAttr("value", Settings.setTheme),
                }),
                m("i.form-icon", "")
              ], "dark"),
            ]),
          ])
        ]),
        m("div.modal-footer")
      ])
    ]);
  }
};

module.exports = Settings;