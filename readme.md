# DailyPulse Client API

This is the Celpax's NodeJS DailyPulse Client API. Note that:

- All API calls are asynchronous, you need to pass a callBack function as is typical in NodeJS.
- CallBacks forllow the standard signature of `callBack(error,object).`

## Install the client

In order to install simply call `npm install daylypulse` or include it in your `package.json` file as a dependency.

## create a dailypulse instance

In order to instanciate the dailypulse client and start making request you need to do:

```javascript
const access_key_id="your-access-key-here";
const secret_access_key="your-secret-access-key-here";

var DailyPulse=require("dailypulse");
var dailyPulseClient=new DailyPulse(access_key_id,secret_access_key);
```
You can download your access and secret api keys from DailyPulse dashboard.

## Get your sites

DailyPulse can be deployed on one or more company sites. In either case you will need to know the Site ID before you can download metrics related to it.

You can get your sites as follows:
```javascript
    dailyPulseClient.getSites(function(err,sites){
        // err should be null if everthing went OK!
        // sites will be an arry of objects with id and description
        var mySite=sites[0];
    });
```

## Mood KPI

You can retrieve the latest calculated Mood KPI for a give site as follows:

```javascript
    dailyPulseClient.getMoodKPI(mySite.id, function(err,mood){
        // err should be null if everthing went OK!
        if(mood.green > 70) Console.log("We are goind very well!!");
    });
```

Note that in some cases the Mood KPI cannot be calculated (for example during rollout) and will be returned as null. A date member will also be included indicating when the Mood KPI was last updated.

## Pulses in a Typical Day

Dailypulse will track how many pulses are registered in a typical day. DailyPulse will detect and exclude from this statist days such as weekends in which a couple of people turn up to work, or company parties when there might be an unusual number of pulses.

Again, pulses per typical day might not be callculated for a given site yet, in which case null can be returned.

You can get it in a similar way by doing:

```javascript
dailyPulseClient.getPulsesPerTypicalDay(site.id,function(err,typicalday){
    // Some dates may not have a PulsesPerTypicalDay calculated,
    console.log("Normally there are:"+typicalday.pulses + "pulses in a typical day");
});
```
A date member will also be returned indicating when the pulses per typical day was last updated.

## Testing

An echo test method has also been include so that you can test your setup as much as you want before pulling real data.

You can use it as follows, for example in one of your unit tests:

```javascript
dailyPulseClient.echo("helloworld",function(err,obj){
    expect(err).to.be.null;
    expect(obj.msg).to.equal("helloworld");
    console.log("Echo Result:"+JSON.stringify(obj));
    done();
});
```


