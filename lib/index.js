/**
 * Created by rafael on 12/09/14.
 */

var urlsign=require("urlsign"),
    restify=require("restify"),
    fs=require("fs"),
    semver=require("semver"),
    path=require("path");

const API_ENDPOINT="https://api.celpax.com"

function DailyPulse(access_key_id,secret_access_key){

    var myVersion=new semver.SemVer(JSON.parse(fs.readFileSync(path.join(__dirname,"..",'package.json'), 'utf8')).version);

    function signRequest(request){
        request.setHeader("X-Celpax-Access-Key-Id",access_key_id);
        request.setHeader("X-Celpax-Signature",urlsign(request.path,secret_access_key));
    };

    var client = restify.createJsonClient({
        url: API_ENDPOINT,
        version: '~'+myVersion.major+"."+myVersion.minor,
        signRequest: signRequest,
        headers:{
            "X-Celpax-Api-Client":"Node "+myVersion.toString()
        }
    });

    this.getClient=function(){
        return client;
    }

    return this;
}


/**
 * Converts a date into a path of the URL
 * @param date
 * @returns {string}
 */
function datePath(date){
   return '/'+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDay();
}


/**
 * Echo test. Use to test your credentials.
 */

DailyPulse.prototype.echo=function(msg, callBack){
    this.getClient().get({
        path:'/test/echo/'+msg
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}

/**
 * Returns an array holding the list of sites configured in this account.
 */
DailyPulse.prototype.getSites=function(callBack){
    this.getClient().get({
            path:'/profile/sites'
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}

/**
 * Returns the current Mood KPI of a give site.
 */
DailyPulse.prototype.getMoodKPI=function(site_id,callBack){
    this.getClient().get({
            path:'/latest/mood/'+site_id
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}


/**
 * Returns the current global Mood KPI for all the sites of the account.
 */
DailyPulse.prototype.getGlobalMoodKPI=function(callBack){
    this.getClient().get({
            path:'/latest/mood'
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}

/**
 * Return the current
 */
DailyPulse.prototype.getPulsesPerTypicalDay=function(site_id,callBack){
    this.getClient().get({
            path:'/latest/pulsesperday/'+site_id
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}


/**
 * Return the current global pulses per typical day for all the sites of the account
 */
DailyPulse.prototype.getGlobalPulsesPerTypicalDay=function(callBack){
    this.getClient().get({
            path:'/latest/pulsesperday'
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}


/**
 * Returns the historical Mood KPI of a given site and the number of days to fetch since today.
 */
DailyPulse.prototype.getHistoricalMoodKPI=function(site_id,days_to_fetch,callBack){
    this.getClient().get({
            path:'/historical/mood/'+days_to_fetch+'/'+site_id
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}

/**
 * Returns the historical global Mood KPI of all the sites od the account, and the number of days to fetch since today.
 */
DailyPulse.prototype.getHistoricalGlobalMoodKPI=function(days_to_fetch,callBack){
    this.getClient().get({
            path:'/historical/mood/'+days_to_fetch
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}

/**
 * Returns the historical Pulses per Day of a given site and the number of days to fetch since today
 */
DailyPulse.prototype.getHistoricalPulsesPerTypicalDay=function(site_id,days_to_fetch,callBack){
    this.getClient().get({
            path:'/historical/pulsesperday/'+days_to_fetch+'/'+site_id
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}


/**
 * Returns the historical Pulses per Day of a given site and the number of days to fetch since today
 */
DailyPulse.prototype.getHistoricalGlobalPulsesPerTypicalDay=function(days_to_fetch,callBack){
    this.getClient().get({
            path:'/historical/pulsesperday/'+days_to_fetch
        }, function (err, req, res, obj) {
            callBack(err,obj);
        }
    );
}

module.exports=DailyPulse;