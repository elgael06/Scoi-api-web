
function ExportToExcel(id,nombre) {
    let htmlExport = jQuery(`#${id}`).prop("outerHTML");
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");

    //other browser not tested on IE 11
    // If Internet Explorer
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        jQuery('body').append(" <iframe id=\"iframeExport\" style=\"display:none\"></iframe>");
        iframeExport.document.open("txt/html", "replace");
        iframeExport.document.write(htmlExport);
        iframeExport.document.close();
        iframeExport.focus();
        sa = iframeExport.document.execCommand("SaveAs", true, `${nombre}.xls`);
    }
    else {
        var link = document.createElement('a');

        document.body.appendChild(link); // Firefox requires the link to be in the body
        link.download = `${nombre}.xls`;
        link.href = 'data:application/vnd.ms-excel,' + escape(htmlExport);
        link.click();
        document.body.removeChild(link);
    }
}

export default ExportToExcel;