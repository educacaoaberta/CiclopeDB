jQuery.fn.dataTableExt.oSort['brazilian-asc']  = function(a,b) {
    var x = (a == "-") ? 0 : a.replace( /\./g, "" ).replace( /,/, "." );
    var y = (b == "-") ? 0 : b.replace( /\./g, "" ).replace( /,/, "." );
    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};
 
jQuery.fn.dataTableExt.oSort['brazilian-desc']  = function(a,b) {
    var x = (a == "-") ? 0 : a.replace( /\./g, "" ).replace( /,/, "." );
    var y = (b == "-") ? 0 : b.replace( /\./g, "" ).replace( /,/, "." );
    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ? 1 : ((x > y) ?  -1 : 0));
};