 $(document).ready(function(){
 	window.setInterval(function () {
 		$.ajax({
 			url:'/updateMessage',
 			type:'POST',
 			data:{
 				"timed":getNowFormatDate(),
 			},

 			success:function(data){
 				console.log(data);
 				var content = "";
 				var message = JSON.parse(data);
 				console.log(message);
 				message.forEach(function(i,item){
 					console.log("i",i);
 					// 将当前时间换成时间格式字符串
 					content = content+ "<div><div class='name-wrapper'><span>"+i.timed+"</span></div><div class='content-wrapper'><span class='content'>"+i.contents+"</span><span class='avatar'></span></div></div>";
 				});
 				$(".log").html(content);
 			},
 			error:function(xhr,textStatus){
 				console.log('错误');
 				console.log(xhr);
 				console.log(textStatus);
 			}
 		})},3000);
 	$("#sub").bind("click",function sendMessage(){
 		$.ajax({
 			url:'/addMessage',
 			type:'POST',
 			data:{
 				"timed":getNowFormatDate(),
 				"message":$("#message").val()
 			},
 			success:function(data){
 				console.log(data);
 				var content = "";
 				var message = JSON.parse(data);
 				console.log(message);
 				message.forEach(function(i,item){
 					console.log("i",i);
 				
				
 					content = content+ "<div><div class='name-wrapper'><span>"+i.timed+"</span></div><div class='content-wrapper'><span class='content'>"+i.contents+"</span><span class='avatar'></span></div></div>";
 				});
 				$(".log").html(content);

 			},
 			error:function(xhr,textStatus){
 				console.log('错误');
 				console.log(xhr);
 				console.log(textStatus);
 			}
 		})
 		$("#message").val("");
 	});
 	function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
 })

