function Utils() {

}

Utils.Status = {
    changeStatus: function (status) {
        $('#status_text').text(status.text);
        if (status.state){
            switch (status.state) {
                case 'suc':

                    break
            }
        }else {
                // $("#bottom img").attr("src",'image/loading.gif')
        }
    }
};