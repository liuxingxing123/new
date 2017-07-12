var sass = require("gulp-sass"),
	htmlmin = require('gulp-htmlmin'),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify"),
	cleanCss = require("gulp-clean-css"),
	concat = require("gulp-concat"),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require("gulp-livereload");
	gulp.task("cleanCss",function(){
		gulp.src("css/*.css")
		.pipe(cleanCss())
		.pipe(gulp.dest("dist/css/"));
	});
	gulp.task("sass",function(){
		gulp.src("sacc/*.scss")
			.pipe(sass({outputStyle:"expanded "}))
			.pipe(cleanCss({	
				advanced:true,
				compatibility:"ie7",
				keepBreaks:false,
				keepSpecialComments:"*"
			}))
			.pipe(gulp.dest("dist/sass/"))
			.pipe(livereload());

	});
	gulp.task("htmlmin",function(){
		gulp.src("/*.html")
			.pipe(htmlmin())
			.pipe(gulp.dest("/dist/htmlmin/"));
	});
	gulp.task("uglify",function(){
		gulp.src(["js/*.js", "!js/*.min.js"])
		.pipe(uglify({
			mangle:true, 
			compress:true 
		}))
		.pipe(gulp.dest("/dist/js/"));
	});	
	gulp.task('watch', function() {
		livereload.listen(); 
		gulp.watch("scss/*.scss", ['sass']);
	});
	gulp.task('rename', function(){
		gulp.src('js/tools.js')
			.pipe(uglify())  
			.pipe(rename('tools.min.js')) 
			.pipe(gulp.dest('js'));
	});
	gulp.task('concat', function () {
		gulp.src('css/*.css') 
			.pipe(concat('style.css'))  
			.pipe(gulp.dest('dist/css'));
	});
	gulp.task('autoFx', function () {
		gulp.src('css/style.css')
			.pipe(autoprefixer({
				browsers: ['last 2 versions', 'Android >= 4.0'],
				cascade: true, // 是否美化属性值 
				remove:true // 是否去掉不必要的前缀
			}))
			.pipe(gulp.dest('dist/css'));
	});
	gulp.task("default", ["sass", "uglify","autoFx","watch"]);