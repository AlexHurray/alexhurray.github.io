var QueryStringObject = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  // http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

// excludedKeys - Какие ключи убрать из параметров URL
getQueryStringWithout = function(excludedKeys) {
  var value, 
    i, length,
    parameters = new Array(),
    exclude = false;
  for (var key in QueryStringObject) {
    if (key == "") {
      continue;
    }
    exclude = false;
    if (typeof excludedKeys === 'object') {
      // TODO: Salyamov. Optimize it!
      for (i = 0, length = excludedKeys.length; i < length; i++) {
        if (excludedKeys[i] == key) {
          exclude = true;
          break;
        }
      }
    } 
    if (exclude) {
      continue;
    }
    
    value = QueryStringObject[key];
    
    if (typeof value === Array) {
      for (i = 0, length = value.length; i < length; i++) {
        // TODO: If empty?
        parameters.push(key + "=" + value[i]);
      }
    } else if (typeof value !== 'undefined') {
      parameters.push(key + "=" + value);
    }
  }
  return parameters.join("&");
}

var QueryString = getQueryStringWithout();