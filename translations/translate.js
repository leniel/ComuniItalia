window.onload = function() {
  const handlebars = require("handlebars");
  const i18n = require("i18n");
  const ipcRenderer = require("electron").ipcRenderer;
  const electron = require('electron');

  //Setting up i18n. In this example English and Swedish are supported. Translation files
  //are put in subfolder "locales"
  i18n.configure({
    locales:['en-US', 'pt-BR', 'it'],
    directory: __dirname + '/locales'
  });

  //This helper makes the connection between Handlebars and I18n
  //In a real world application the user should of course be
  //able to choose this.
  handlebars.registerHelper('i18n', function(str){
    //return i18n.__({phrase:str, locale:"se"}); // Setting locale manually

    let app = electron.app ? electron.app : electron.remote.app
    //console.log(app.getLocale())
    return i18n.__({phrase:str, locale:app.getLocale()}); // Setting locally dynamically
  });

  //This replaces the entire document with the translation
  var template = handlebars.compile(document.documentElement.innerHTML);
  document.documentElement.innerHTML = template();

  //Notify main process that the translation is complete
  ipcRenderer.send("translation-complete", null);
};