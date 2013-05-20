(function()
{
//alert(id);
/*
	var info=document.getElementById("info").innerHTML;
	var pattern=/tt\d{7}/g;//tt1234567
	var id=pattern.exec(info);//get imdb id
	var id="tt0068646";//god father
	rank="";
	rating="";
*/
	//rank
	$.getJSON("http://query.yahooapis.com/v1/public/yql", {
	//q:"SELECT * FROM html WHERE url='http://www.imdb.com/title/tt0068646' and xpath=\"//div[@id='titleAwardsRanks']//a[1]//strong\"",
	q:"SELECT * FROM html WHERE url='http://www.imdb.com/title/"+id+"' and xpath=\"//div[@id='titleAwardsRanks']//a[1]//strong\"",
	format:"json"
	},function(data){
	if(data.query.results!=null)
	{
		rank=data.query.results.strong;
	}
	else
	{
		rank="0";
	}
	
	
	
	//alert(rank);
	});
	
	//rating
	$.getJSON("http://query.yahooapis.com/v1/public/yql", {
	//q:"SELECT * FROM html WHERE url='http://www.imdb.com/title/tt0068646' and xpath=\"//div[@id='titleAwardsRanks']//a[1]//strong\"",
	q:"SELECT * FROM html WHERE url='http://www.imdb.com/title/"+id+"' and xpath=\"//div[@class='titlePageSprite star-box-giga-star']\"",
	format:"json"
	},function(data){
	//alert(data.query.results.strong);
	rating=data.query.results.div.p;
	//alert(rating);
	});
	
	//alert("rating"+rating+"rank"+rank);
	

					
		    //    }); 
		
	
		
})();


