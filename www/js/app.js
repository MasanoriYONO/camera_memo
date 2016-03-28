///// Save memo and return to top page
function onSaveBtn() {
    console.log("onSaveBtn.");
    
    var t_memo = $("#photo_description").text();
    var phtoto_time = $("#saved_date").text();
    var file_path = $("#photo_path").text();
    
    console.log("t_memo:" + t_memo);
    console.log("phtoto_time:" + phtoto_time);
    console.log("file_path:" + file_path);
    
    if (t_memo != '' && phtoto_time != '' && file_path != '') {
        // Save to local storage
        addMemo(t_memo, phtoto_time, file_path);
        // Initialize top page
        initTopPage();
    }
    $.mobile.changePage("#TopPage", { reverse: true });
}
function onPhotoBtn() {
    camera();
}
function addpage_init(){
    console.log("addpage_init.");
    
    $("#saved_date").text("");
    $("#photo_description").text("");
    $("#photo_path").text("");
    
    $("#camera_pic").attr('src', '');
    $("#camera_pic").css('display', 'none');
    $("#view_date").css('display', 'none');
    
    // 画像ファイル保存のディレクトリ作成と取得。
    // saved_photo_filename = "dummy.jpg";
    // camera_readImageFile('');
}
///// Initialize top page
function initTopPage() {
    $("#TopListView").empty();
    
    var list = getMemoList();
    for (var i in list) {
        var memo = list[i];
        var d = new Date(memo.time);
        // var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var date = moment(memo.time).format("YYYY-MM-DD HH:mm:ss")
        console.log(date);
        
        $li = $("<li><a href='#' class='show'><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
        $li.data("id", memo.id);
        $li.find("h3").text(date);
        $li.find("p").text(memo.text);
        $("#TopListView").prepend($li);
    }
    if (list.length == 0) {
        $li = $("<li>No memo found</li>");
        $("#TopListView").prepend($li);
    }
    $("#TopListView").listview("refresh");  // Call refresh after manipulating list
}

///// Move to detail page
function onShowLink() {
    var $li = $(this).parent();
    var memoTitle = $li.find("h3").text();
    var memoHtml = $li.find("p").html().replace(/\n/g, "<br>");
    
    $("#ShowPage h1").text(memoTitle);
    $("#ShowPage p").html(memoHtml);
    $.mobile.changePage("#ShowPage");
}

///// Delete memo
function onDeleteLink() {
    if (!confirm("Are you sure to delete this memo?")) {
      return;
    }
    var $li = $(this).parent();
    var id = $li.data("id");
    deleteMemo(id);
    
    initTopPage();
    
    // Return to top
    $.mobile.changePage("#TopPage", { reverse: true });
}

///// Called when app launch
function onReady() {
    initTopPage();
    $("#SaveBtn").click(onSaveBtn);
    $("#TopListView").on("click", "a.show", onShowLink);
    $("#TopListView").on("click", "a.delete", onDeleteLink);
}

$(onReady); // on DOMContentLoaded

