var JWTDecodeDynamicValue = function() {
	this.evaluate = function(context) {

		var toDecode;
		var parts = this.jwt.split(".");

		if(this.part === "header") {
			toDecode = parts[0]
		} else {
			toDecode = parts[1]
		}

		var decoder = new DynamicValue('com.luckymarmot.Base64EncodingDynamicValue', {
			"input": toDecode, "mode": 1
		});

		toDecode = decoder.getEvaluatedString();

		if(typeof this.keypath !== "undefined" && this.keypath !== null && this.keypath !== "") {
			toDecode = JSON.parse(toDecode);
			var paths = this.keypath.split(".");

			paths.forEach(function(path) {
				toDecode = toDecode[path];
			});
		}

		return toDecode;
		}
	}


JWTDecodeDynamicValue.identifier = "com.luckymarmot.PawExtensions.JWTDecodeDynamicValue";

JWTDecodeDynamicValue.title = "JWT Decode";

JWTDecodeDynamicValue.help = "https://jwt.io/"

JWTDecodeDynamicValue.inputs = [
	InputField("jwt", "JWT", "String"),
	InputField("part", "Decode From", "Select", {"choices": {"header": "Header", "payload": "Payload"}, defaultValue: "payload"}),
	InputField("keypath", "KeyPath (optional)", "String")
]

registerDynamicValueClass(JWTDecodeDynamicValue);
