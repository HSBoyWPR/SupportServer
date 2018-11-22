function Utils() {

}

function logUtil(msg, level) {
    let logUtilContext = Conf.log;

    if (!logUtilContext.isLog) return;

    let curDate = new Date();
    let ct = 'color:#0570c5';
    let cm = 'color:#000';
    if (level == undefined) {
        level = 'un';
    }

    switch (level) {
        case 'e':
            cm = 'color:red';
            if (!logUtilContext.error) return;
            break;
        case 'w':
            cm = 'color:yellow';
            if (!logUtilContext.warn) return;
            break;
        case 'i':
            cm = 'color:#05c129e6';
            if (!logUtilContext.info) return;
            break;
        case 'un':
            cm = 'color:#000';
            if (!logUtilContext.default) return;
            break;
        case 'd':
            cm = 'color:#a33aff';
            if (!logUtilContext.debug) return;
            break;
        default:
            break;
    }

    console.log(`%c[${curDate.getHours() + ":" + curDate.getMinutes() + ':' + curDate.getSeconds()}] %c ${msg}`, ct, cm);
}

Utils.Status = {
    changeStatus: function (status) {
        $('#status_text').text(status.text);
        if (status.state) {
            switch (status.state) {
                case 'suc':

                    break
            }
        } else {
            // $("#bottom img").attr("src",'image/loading.gif')
        }
    }
};

Utils.AjaxLoadData = function (url, dat, sucess, error, opt) {
    var index;
    if (dat == undefined || dat == null) {
        dat = "";
    }

    var option = {
        url: url,
        type: 'GET',
        asyn: true,
        data: dat,
        success: suc,
        error: erro,
        complete: comp,
        beforeSend: bsend,
        timeout: 20000
    };

    if (opt != undefined && opt != null) {
        if (opt.dataType != undefined && opt.dataType != null) {
            option.dataType = opt.dataType;
        }
        if (opt.type != null && opt.type != undefined) {
            option.type = opt.type;
        }
        if (opt.contentType != undefined && opt.contentType != null) {
            option.contentType = opt.contentType;
        }
        if (opt.timeout != null && opt.timeout != undefined) {
            option.timeout = opt.timeout;
        }
        if (opt.xhrFields != undefined && opt.xhrFields != null) {
            option.xhrFields = opt.xhrFields;
        }
    }

    $.ajax(option);

    function bsend(xhr) {
      logUtil('ajax send','d')
    }

    function suc(data) {
        sucess(data)
    }

    function erro(err) {
        if (error != undefined) {
            error(err);
        }
    }

    function comp(xhr, status) {
        if (status == 'timeout') {
            xhr.abort();    // 超时后中断请求
        logUtil('ajax timeout','w')
        }
    }
}