function Conf() {
    
}

Conf.Server={
    address:'http://127.0.0.1',
    port:'8000'
};

Conf.log={
    isLog: true//全局配置是否打印日志
    //指定各级别是否打印
    , debug: true
    , error: true
    , warn: true
    , info: true
    , default: false
};

Conf.Sys={
    statusEmum:{
        error:{t:"错误",s:"err"}
        ,success:{t:"就绪",s:"suc"}
        ,busying:{t:"处理中...",s:"wat"}
    }
};

Conf.Url={
    getPointsByTkID:`${Conf.Server.address}:${Conf.Server.port}/record/data/getPointsByTkID/`
};