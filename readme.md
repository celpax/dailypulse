# DailyPulse Client API

This is the Celpax's NodeJS DailyPulse Client API. Note that:

- All API calls are asynchronous, you need to pass a callBack function as is typical in NodeJS.
- CallBacks forllow the standard signature of `callBack(error,object).`

## Install the client

In order to install simply call `npm install dailypulse` or include it in your `package.json` file as a dependency.

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

You can retrieve the latest calculated Mood KPI for a given site as follows:

```javascript
    dailyPulseClient.getMoodKPI(mySite.id, function(err,mood){
        // err should be null if everthing went OK!
        if(mood.green > 70) Console.log("We are going very well!!");
    });
```

Note that in some cases the Mood KPI cannot be calculated (for example during rollout) and will be returned as null. A date member will also be included indicating when the Mood KPI was last updated.

Alternatively, you can retrieve the latest calculated global Mood KPI of all the sites of the account as follows:

```javascript
    dailyPulseClient.getGlobalMoodKPI(function(err,mood){
        // err should be null if everthing went OK!
        if(mood.green > 70) Console.log("We are going very well!!");
    });
```

## Historical Mood KPI

You can retrieve the historical calculated Mood KPI for a given site and the number of days to fetch since today as follows:

```javascript
   dailyPulseClient.getHistoricalMoodKPI(mySite.id,numberOfDaysToFetch,function(err,moodArray){ 
        // err should be null if everthing went OK!
        if(moodArray[0].green > 70) Console.log("We are going very well!!");
    });
```

The maximum number of allowed days to be fetched can be configured in the Celpax Dashboard console. You need administrator privileges for accessing to the configuration section. 

Alternatively you can retrieve the historical calculated global mood KPI of all the sites of the account as follows:

```javascript
    dailyPulseClient.getHistoricalGlobalMoodKPI(numberOfDaysToFetch,function(err,moodArray){ 
        // err should be null if everthing went OK!
        if(moodArray[0].green > 70) Console.log("We are going very well!!");
    });
```

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

Alternatively, you can retrieve the global pulses in a typical day of all the sites of the account as follows:
 
```javascript
dailyPulseClient.getGlobalPulsesPerTypicalDay(function(err,typicalday){
    // Some dates may not have a PulsesPerTypicalDay calculated,
    console.log("Normally there are:"+typicalday.pulses + "pulses in a typical day");
});
```
## Historical Pulses in a Typical Day

You can retrieve the historical Pulses in a Typical day for a given site and the number of days to fetch since today as follows:

```javascript
dailyPulseClient.getHistoricalPulsesPerTypicalDay(mySite.id,numberOfDaysToFetch,function(err,typicaldayArray){
    // Some dates may not have a PulsesPerTypicalDay calculated,
    console.log("Normally there are:"+typicaldayArray[0].pulses + "pulses in a typical day");
});
```

The maximum number of allowed days to be fetched can be configured in the Celpax Dashboard console. You need administrator privileges for accessing to the configuration section. 

Alternatively, you can retrieve the historical global pulses per typical day of all the sites of the account as follows:
```javascript
dailyPulseClient.getHistoricalGlobalPulsesPerTypicalDay(numberOfDaysToFetch,function(err,typicaldayArray){
    // Some dates may not have a PulsesPerTypicalDay calculated,
    console.log("Normally there are:"+typicaldayArray[0].pulses + "pulses in a typical day");
});
```

## User Interface Design

We have released user interface elements, such as: colours, fonts, widgets available in the github project: [DailyPulse-Resources](https://github.com/celpax/dailypulse-resources)

The resources provided match the User Interface of the DailyPulse Dashboard.


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


