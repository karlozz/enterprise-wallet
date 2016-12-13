var $jscomp={scope:{},checkStringArgs:function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""}};
$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(b.get||b.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,d){if(c){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in b||(b[e]={});b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,b){var c=$jscomp.checkStringArgs(this,a,"startsWith");a+="";for(var e=c.length,g=a.length,h=Math.max(0,Math.min(b|0,c.length)),f=0;f<g&&h<e;)if(c[h++]!=a[f++])return!1;return f>=g}},"es6-impl","es3");
$("#generate-source").on("change",function(){selected=$("#generate-source option:selected").val();"new-external-address"==selected?$("#sec-pub").text("Public"):$("#sec-pub").text("Private");"import-address"==selected||"new-external-address"==selected||"import-koinify"==selected?($("#private-key-input").prop("disabled",!1),$("#private-key-input").removeClass("disabled-input"),$("#nickname-input").addClass("input-group-error"),$("#private-key-input-container").addClass("input-group-error")):($("#private-key-input").prop("disabled",
!0),$("#private-key-input").addClass("disabled-input"),$("#nickname-input").addClass("input-group-error"),$("#private-key-input-container").removeClass("input-group-error"))});$("#private-key-input-container").on("click",function(){$(this).removeClass("input-group-error")});$("#nickname-input").on("click",function(){$(this).removeClass("input-group-error")});
$("#generate-source").on("change",function(){selected=$("#generate-source option:selected").val();$("#private-key-input").val("");"import-address"==selected?$("#private-key-input").attr("placeholder","Type address private key"):"random-ec"==selected?$("#private-key-input").attr("placeholder","A new entry credit address will be created"):"random-factoid"==selected?$("#private-key-input").attr("placeholder","A new factoid address will be created"):"new-external-address"==selected?$("#private-key-input").attr("placeholder",
"Type a public address to add to your contacts"):"import-koinify"==selected&&$("#private-key-input").attr("placeholder","Type in your Koinify phrase")});
$("#add-to-addressbook").on("click",function(){$("#error-zone").slideUp(100);Name=$("#nickname-input").val();""==Name?(SetError("Need a NickName for the new address"),$("#nickname-input").addClass("input-group-error")):(selected=$("#generate-source option:selected").val(),"import-address"==selected?(sec=$("#private-key-input").val(),sec.startsWith("Fs")||sec.startsWith("Es")?postRequest("is-valid-address",sec,function(a){"false"==a?(SetError("Not a valid private key."),$("#private-key-input-container").addClass("input-group-error")):
(j=JSON.stringify({Name:Name,Secret:sec}),postRequest("new-address",j,function(a){obj=JSON.parse(a);"none"==obj.Error?SetSuccess(obj):SetError(obj.Error)}))}):(SetError("Not a valid private key. Should start with 'Fs' for a factoid address or 'Es' for an entry credit address"),$("#private-key-input-container").addClass("input-group-error"))):"random-ec"==selected?postRequest("generate-new-address-ec",Name,function(a){obj=JSON.parse(a);"none"==obj.Error?SetSuccess(obj):SetError(obj.Error)}):"random-factoid"==
selected?postRequest("generate-new-address-factoid",Name,function(a){obj=JSON.parse(a);"none"==obj.Error?SetSuccess(obj):SetError(obj.Error)}):"new-external-address"==selected?(pub=$("#private-key-input").val(),pub.startsWith("FA")||pub.startsWith("EC")?postRequest("is-valid-address",pub,function(a){"false"==a?(SetError("Not a valid public key."),$("#private-key-input-container").addClass("input-group-error")):(j=JSON.stringify({Name:Name,Public:pub}),postRequest("new-external-address",j,function(a){obj=
JSON.parse(a);"none"==obj.Error?SetSuccess(obj):SetError(obj.Error)}))}):(SetError("Not a valid public key. Should start with 'FA' for a factoid address or 'EC' for an entry credit address. This option adds an address to your external addresses for easier use."),$("#private-key-input-container").addClass("input-group-error"))):"import-koinify"==selected?(koinify=$("#private-key-input").val(),j=JSON.stringify({Name:Name,Koinify:koinify}),postRequest("import-koinify",j,function(a){obj=JSON.parse(a);
"none"==obj.Error?SetSuccess(obj):SetError(obj.Error)})):SetError("An error has occurred. No address type selected, please try selecting from the dropdown menu again, or reload this page."))});function SetError(a){$("#success-zone").slideUp(100);$("#error-zone").text(a);$("#error-zone").slideDown(100)}
function SetSuccess(a){$("#error-zone").slideUp(100);$("#success-link").attr("href","/receive-factoids?address="+a.Content.Address+"&name="+a.Content.Name);$("#success-zone > #name").text(a.Content.Name);$("#success-zone > pre").text(a.Content.Address);$("#success-zone").slideDown(100)};
