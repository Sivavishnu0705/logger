var config;
exports.log = function(type,location,...messages){
    console.log(type+' '+location+' '+Date.now()+this.config.logger.offsetMs+' '+messages)

}
exports.config = function(config){
this.config = config;
}