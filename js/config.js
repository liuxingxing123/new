require.config({
	paths:{
		"jquery":"http://localhost/new/js/jquery-1.12.4.min",
		"cookie":"http://localhost/new/js/jquery.cookie",
		"template":"http://localhost/new/js/template-native",
		"bootstrap":"http://localhost/new/js/bootstrap.min",
		"include":"http://localhost/new/js/include",
		"magnifier":"http://localhost/new/js/magnifier",
		"fly":"http://localhost/new/js/jquery.fly.min"
	},
	shim:{
		"fly" : {
            deps : ["jquery"]
        }
	}
});