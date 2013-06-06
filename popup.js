//set background
$(document).ready(function(){
		$("#upload").bind("change",function(){
			var oFile = this.files[0];  
			var oFReader = new FileReader();  
			oFReader.onload = function (oFREvent)
			{  
				var url= oFREvent.target.result; 
				$("body").css({
					"background-image":"url("+url+")",
					"background-repeat":"no-repeat",
					"background-position": "center"
				});
				chrome.tabs.getSelected(null, function(tab)
				{
					chrome.tabs.sendMessage(tab.id,url);
				});			
			};  
			oFReader.readAsDataURL(oFile); 
		});
});
//cancel background
$(document).ready(function(){
		$("#cancel").bind("click",function(){
			chrome.tabs.getSelected(null, function(tab)
			{
				chrome.tabs.sendMessage(tab.id,"");
			});		
		});
});
	