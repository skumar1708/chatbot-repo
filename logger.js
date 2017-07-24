var fs = require("fs");
const fname = require('fullname');
const logger = {
	log:function(session,ans){
	console.log("Inside logger");
		fname().then(name => {console.log("Inside fname");
			var fullName = name.split(",").reverse().join(" ");
			fs.appendFile('input.txt', '\n'+session.message.text, function (err) {
  				if (err) throw err;
			});		
		});
	}
}
module.exports = logger