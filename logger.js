var configuration;
exports.log = function(type,location,...messages){
    console.log(type+' '+location+' '+Date.now()+this.configuration.logger.offsetMs+' '+messages)

}
exports.config = function(config){
this.configuration = config;
}