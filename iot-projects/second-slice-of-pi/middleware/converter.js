const json2html = require('node-json2html');

module.exports = function () {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if (req.result) {
			console.log(req.result)
			if (req.accepts("html")) {
				let transform = {
					"<>": "div",
					html: [
						{
							"<>": "p",
							html: [
								{ "<>": "b", html: "Name: " },
								{ "<>": "p", html: "${name}" },
							],
						},
						{
							"<>": "p",
							html: [
								{ "<>": "b", html: "Description: " },
								{ "<>": "p", html: "${description}" },
							],
						},
						{
							"<>": "p",
							html: [
								{ "<>": "b", html: "Value: " },
								{ "<>": "p", html: "${value}" },
							],
						},
					],
				};
				console.log(json2html);
				res.send(json2html.render(req.result, transform))
			} else {
				res.send(req.result);
			}
		} else {
			next();
		}
	};
};
