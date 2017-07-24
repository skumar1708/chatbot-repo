var launcher = {
	launch:function(recastClient,config,session,builder){
		 return new Promise(function(resolve,reject){
		 
		 recastClient.analyseText(session.message.text)
  		.then(function(res) {
 		   if (res.intent()) { console.log('Intent: ', res.intent().slug) }
 		   if (config.intentData.hasOwnProperty(res.intent().slug)) {
 		   		
 		   		var reply = config.intentData[res.intent().slug];
  			  	session.send(reply);
  			  	resolve(reply);
  			  }
  		  else{
  			  resolve(session.send( "Hi, kindly give us sometime to answer your question, our representative will contact you shortly. Or call us directly on (877) 598-6568"));
			}
  				}).catch(() => {
  					reject(session.send("Woops! didn't get you dear.can you please be more elaborative about your query?"));
  				})
  			
  			
		 
		 });
  		}
	}
module.exports = launcher;