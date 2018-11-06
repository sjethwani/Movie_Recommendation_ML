$(document).ready(function(){
	
	$(".movie-image").hover(function(){
		$(this).find(".play").show()
	},
	function()
	{
		$(this).find(".play").hide();
	});
	$(".movie-image").click(function(){
		$(this).find(".play").hide();
	},
	function()
	{
		
	});

	$(".blink").focus(function() {
            if(this.title==this.value) {
                this.value = '';
            }
        })
        .blur(function(){
            if(this.value=='') {
                this.value = this.title;                    
			}
		});
});
