function getImageUrl(type) {
	return chrome.extension.getURL("image/" + type + ".png");
	};
(function()
{	
	var info=document.getElementById("info").innerHTML;
	var pattern=/tt\d{7}/g;//tt1234567
	id=pattern.exec(info);//get imdb id
	if(id!=null)
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
				else //server maybe error
				{	/*			
					//rank in www.imdb.com
					$.getJSON("http://query.yahooapis.com/v1/public/yql", {
					q:"SELECT * FROM html WHERE url='http://www.imdb.com/title/"+id+"' and xpath=\"//div[@id='titleAwardsRanks']//a[1]//strong\"",
					format:"json"
					},function(data){
						if(data.query.results!=null)
						{
							rank=data.query.results.strong;
							msg.rank=rank;
							alert("rank from imdb");
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
					});					
					*/
					if(msg.rating===null)//api doesn't have a rating
					{						
						//query rating from www.imdb.com
						$.getJSON("http://query.yahooapis.com/v1/public/yql", {
						q:"SELECT * FROM html WHERE url='http://www.imdb.com/title/"+id+"' and xpath=\"//div[@class='titlePageSprite star-box-giga-star']\"",
						format:"json"
						},function(data){
							if(data.query.results!=null)//imdb have a rating
							{
								msg.rating=data.query.results.div.p;
							}
							else//imdb doesn't have a rating
							{
								msg.rating="N/A";
							}
							type="imdb";			
							$("div.rating_wrap.clearbox").before("<div style=\"font-size:19px;font-weight:blod;width:70px;height:28px;padding-left:52px;padding-top:0px; background-image:url("+ (getImageUrl(type)) +");\"><div>"+msg.rating+"</div></div>");
						});
					}
					else//api have a rating
					{
						type="imdb";			
						$("div.rating_wrap.clearbox").before("<div style=\"font-size:19px;font-weight:blod;width:70px;height:28px;padding-left:52px;padding-top:0px; background-image:url("+ (getImageUrl(type)) +");\"><div>"+msg.rating+"</div></div>");	
					}						
				}				
			}
		});
		//rottentomatoes score
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
				if($("span.year").length>0)//title have a year label
				{
					$("span.year").after("<span id=\"rottenDiv\" dir=\"ltr\"><img width='25px' src='"+ (getImageUrl(type)) +"'/>"+msg2.score+"%</span>");
				}
				else//title doesn't have a year label
				{
					$("h1>span").after("<span id=\"rottenDiv\" dir=\"ltr\"><img width='25px' src='"+ (getImageUrl(type)) +"'/>"+msg2.score+"%</span>");
				}
				
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