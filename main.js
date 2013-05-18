(function()
{
	function getImageUrl(type) {
	return chrome.extension.getURL("image/" + type + ".png");
	};
		
	var info=document.getElementById("info").innerHTML;
	var pattern=/tt\d{7}/g;//tt1234567
	var id=pattern.exec(info);//get imdb id
	if(id!="")
	{
		 $.ajax({
            type: "GET",
			url: "http://imdbapi.notimportant.org/imdb/"+id,
            success: function(msg){//get object
			if(msg.rank!=null)//top 250
			{
				type="imdb";
				$("div.rating_wrap.clearbox").before("<div id=\"imdbDiv\" style=\"font-size:19px;font-weight:blod;width:70px;height:28px;padding-left:52px;padding-top:0px; background-image:url("+ (getImageUrl(type)) +");\"><div>"+msg.rating+"</div></div>");
				$("#imdbDiv").before("<div id=\"topDiv\">"+msg.rank+"</div>");
				$("#topDiv").css({
				"font-size":"19px",
				"font-weight": "bold",
				//"color":"#70579d" //purple
				"color":"#136cb2" //blue
				});
			}
			else 
			{
				if(msg.rating==null)
				{
					msg.rating="N/A";
				}
				type="imdb";			
				$("div.rating_wrap.clearbox").before("<div style=\"font-size:19px;font-weight:blod;width:70px;height:28px;padding-left:52px;padding-top:0px; background-image:url("+ (getImageUrl(type)) +");\"><div>"+msg.rating+"</div></div>");		
			}
			
			}
		});
		
		$.ajax({
            type: "GET",
			url:"http://imdbapi.notimportant.org/rotten/"+id,
            success: function(msg2){//get object	                	
				if(msg2.score>=60)
				{
					type="fresh";
					color="red";
				}
				else if(msg2.score===-1)//
				{
					type="none";
					color="grey";
					msg2.score="N/A";
				}
				else
				{
					type="rotten";
					color="green";
				}
				$("span.year").after("<span id=\"rottenDiv\" dir=\"ltr\"><img width='25px' src='"+ (getImageUrl(type)) +"'/>"+msg2.score+"%</span>")
				$("#rottenDiv").css({
				"margin-left": "10px",
				"font-size":"25px",
				"font-weight": "bold",
				"color":color
				});
            }
        }); 
		
	}
	else return;	
})();