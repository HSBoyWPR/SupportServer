function Utils() {

}

function Sys() {

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

Sys.Status = {
    changeStatus: function (status) {
        $('#status_text').text(status.t);
        if (status.s) {
            switch (status.s) {
                case 'suc':
                    $("#bottom img").attr("src", '../../../static/image/suc.png');
                    break
                case 'err':
                    $("#bottom img").attr("src", '../../../static/image/suc.png');
                    break;
                case 'wat':
                    $("#bottom img").attr("src", '../../../static/image/loading.gif');
                    break;
            }
        } else {
            $("#bottom img").attr("src", '../../../static/image/loading.gif')
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
        Sys.Status.changeStatus(Conf.Sys.statusEmum.busying);
    }

    function suc(data) {
        Sys.Status.changeStatus(Conf.Sys.statusEmum.success);
        sucess(data)
    }

    function erro(err) {
        let s = Conf.Sys.statusEmum.error;

        if (error !== undefined) {
            s.t += err;
            Sys.Status.changeStatus(Conf.Sys.statusEmum.error);
            error(err);
        }

    }

    function comp(xhr, status) {
        if (status == 'timeout') {
            xhr.abort();    // 超时后中断请求
            logUtil('ajax timeout', 'w')
        }
    }
};


/**
 * 清除并加载数组到表格中
 * @param table_id 表格ID 需要带#
 * @param arr_data 数组数据
 * @param arr_params_name 需要显示的属性 对象名的属性名
 * @param generate_row_num 是否生成行号
 * @param row_class 行的样式 class 可选
 */
Utils.loadListToTable = function (table_id, arr_data, arr_params_name, generate_row_num, row_class) {
    if (row_class == undefined) row_class = '';
    //移除已经存在的行
    $(table_id + " tr:not(:first)").remove();

    if (arr_data.length < 1) {
        let non = '<tr rowspan="3"class="text-center"><td colspan="' + $(table_id + " th").length + '" style="color: #9e9e9e57;">什么都没有</td></tr>';
        $(table_id + " tbody:last").append(non);
        return;
    }

    for (let j = 0; j < arr_data.length; j++) {
        let _tr = '<tr>';

        if (generate_row_num) {
            _tr += `<td>${j + 1}</td>`;
        }
        for (let k = 0; k < arr_params_name.length; k++) {
            _tr += (`<td title='${arr_data[j][arr_params_name[k]]}'>${arr_data[j][arr_params_name[k]]}</td>`);
        }
        _tr += "</tr>";

        $(table_id + " tbody:last").append(_tr);
    }

};
