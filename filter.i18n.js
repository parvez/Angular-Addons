/**
 * Translation for strings in your entire angular application
 * It depends on 
 *
 * You need a javascript opject with your translations like this:
 * (Supports JSON reference like "Section1.Name" instead of one long list)
 * lang = {
 *   'Section1': {
 *      'Name':'Name'
 *   },
 *   'Section2': {
 *      'City': 'Ort'
 *   },
 *   Section3: {
 *      'Population': 'Einwohner'
 *   }
 * }
 * You could include it as a file depending on e.g. url (http://domain.tld/de/) or session
 *
 * Usage in template:
 * {{'Section1.Name'|i18n}}
 *
 * Usage in controller/directrive/widget:
 * angular.filter.i18n('Section1.Name');
 *
 */
angular.filter('i18n', function(string) { 
    // FIXME allow injection of $xhr service
    var log_untranslated = false;
    var placeholders = [];

    for(var i=1; i < arguments.length; i++) {
        if(typeof(arguments[i]) == 'object') {
            angular.forEach(arguments[i], function(item) {
                placeholders.push(item);
            })
        }
        else {
            placeholders.push(arguments[i]);
        }
    }

    function __getObjectValue(name, obj) {
      name+='';    
      var val, arr;
      if ( ! name || ! obj) return null;
      arr = name.split('.');
      for (var i = 0; i < arr.length; i++) {
        obj = obj[arr[i]];
        if (obj == null || obj == undefined) break;
      }
      return obj;
    }

    var translated = ( __getObjectValue(string, lang) );
    // var translated = lang[string]; // lang ist from the language file, e.g. de_DE.js
    if (translated === undefined) {
        if (log_untranslated == true) {
            // here we could track unreanslated strings by sending them to the server...
        }
        return sprintf(string, placeholders);
    }
    return sprintf(translated, placeholders);

});

/**
 * formats date _object_ to localized string by using date.js
 * See http://www.datejs.com/
 *
 * Usage in template:
 * Date only: {created_at|i18nDate}}
 * Date and time: {created_at|i18nDate:true}}
 *
 * Usage in controller:
 * angular.filter.i18nDate(self.created_at);
 */
angular.filter('i18nDate', function(date,time) {
    var time = time || false;
    if(typeof date === 'string') {
        var date = Date.parse(date);
    }

    if(!date) {
        return;
    }

    if(time) {
        return date.toString(angular.filter.i18n('M/d/yyyy HH:mm'));
    }
    else {
        return date.toString(angular.filter.i18n('M/d/yyyy'));
    }
});
