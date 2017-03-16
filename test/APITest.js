/**
 *
 * DailyPulse NodeJS client API test.
 *
 * You can use this file to test your DailyPulse API settings.
 *
 * Created by rafael on 15/09/14.
 */


const access_key_id="your-access-key-here";
const secret_access_key="your-secret-access-key-here";


var DailyPulse=require("../lib"),
    expect=require('chai').expect;

describe("DailyPulse API test",function(){
    var site;

    /**
     * Create a DailyPulse client instance using your account keys.
     * @type {DailyPulse}
     */

    var dailyPulseClient=new DailyPulse(access_key_id,secret_access_key);

    it("Will test the basic ECHO Service",function(done){
        dailyPulseClient.echo("helloworld",function(err,obj){
            expect(err).to.be.null;
            expect(obj.msg).to.equal("helloworld");
            console.log("Echo Result:"+JSON.stringify(obj));
            done();
        })
    });

    it("Will get the sites for the given account",function(done){
        dailyPulseClient.getSites(function(err,sites){
            expect(err).to.be.null;
            expect(sites.length).to.be.above(0);
            site=sites[0];
            console.log("sites result:"+JSON.stringify(sites));
            done();
        });
    });

    it("Will get the mood KPI for one site",function(done){
        dailyPulseClient.getMoodKPI(site.id,function(err,mood){
            expect(err).to.be.null;
            expect(mood.date).not.to.be.null;
            // Some dates may not have a KPI calculated, in which case read and green is returned as null
            if(mood.green){
                // if they are returned they follow:
                // both values with be rounded and returned matching the ones on the console
                // they must sum 100%
                expect(mood.green).to.be.equal(100-mood.red);
                console.log("Mood KPI result:"+JSON.stringify(mood));

            }
            done();
        });
    });

    it("Will get the pulses per typical day for one site",function(done){
        dailyPulseClient.getPulsesPerTypicalDay(site.id,function(err,typicalday){
            expect(err).to.be.null;
            expect(typicalday.date).not.to.be.null;
            // Some dates may not have a PulsesPerTypicalDay calculated,
            if(typicalday.pulses){
                // if they are returned they follow:
                expect(typicalday.pulses).to.be.a("number");
            }
            console.log("Typical day result:"+JSON.stringify(typicalday));

            done();
        })
    });

    var numberOfDaysToFetch = 28;

    it("Will get the historical mood KPI for one site",function(done){
        dailyPulseClient.getHistoricalMoodKPI(site.id,numberOfDaysToFetch,function(err,moodArray){
            expect(err).to.be.null;
            expect(moodArray[0].date).not.to.be.null;
            // Some dates may not have a KPI calculated, in which case read and green is returned as null
            if(moodArray[0].green){
                // if they are returned they follow:
                // both values with be rounded and returned matching the ones on the console
                // they must sum 100%
                expect(moodArray[0].green).to.be.equal(100-moodArray[0].red);
                console.log("Historical Mood KPI result:"+JSON.stringify(moodArray));

            }
            done();
        });
    });

    it("Will get the historical pulses per typical day for one site",function(done){
        dailyPulseClient.getHistoricalPulsesPerTypicalDay(site.id,numberOfDaysToFetch,function(err,typicaldayArray){
            expect(err).to.be.null;
            expect(typicaldayArray[0].date).not.to.be.null;
            // Some dates may not have a PulsesPerTypicalDay calculated,
            if(typicaldayArray[0].pulses){
                // if they are returned they follow:
                expect(typicaldayArray[0].pulses).to.be.a("number");
            }
            console.log("Historical Typical day result:"+JSON.stringify(typicaldayArray));

            done();
        })
    });
});

describe("DailyPulse global data API test",function(){

    /**
     * Create a DailyPulse client instance using your account keys.
     * @type {DailyPulse}
     */

    var dailyPulseClient=new DailyPulse(access_key_id,secret_access_key);


    it("Will get the global mood KPI",function(done){
        dailyPulseClient.getGlobalMoodKPI(function(err,mood){
            expect(err).to.be.null;
            expect(mood.date).not.to.be.null;
            // Some dates may not have a KPI calculated, in which case read and green is returned as null
            if(mood.green){
                // if they are returned they follow:
                // both values with be rounded and returned matching the ones on the console
                // they must sum 100%
                expect(mood.green).to.be.equal(100-mood.red);
                console.log("Mood KPI result:"+JSON.stringify(mood));

            }
            done();
        });
    });

    it("Will get the global pulses per typical day",function(done){
        dailyPulseClient.getGlobalPulsesPerTypicalDay(function(err,typicalday){
            expect(err).to.be.null;
            expect(typicalday.date).not.to.be.null;
            // Some dates may not have a PulsesPerTypicalDay calculated,
            if(typicalday.pulses){
                // if they are returned they follow:
                expect(typicalday.pulses).to.be.a("number");
            }
            console.log("Typical day result:"+JSON.stringify(typicalday));

            done();
        })
    });

    var numberOfDaysToFetch = 28;

    it("Will get the historical global mood KPI",function(done){
        dailyPulseClient.getHistoricalGlobalMoodKPI(numberOfDaysToFetch,function(err,moodArray){
            expect(err).to.be.null;
            expect(moodArray[0].date).not.to.be.null;
            // Some dates may not have a KPI calculated, in which case read and green is returned as null
            if(moodArray[0].green){
                // if they are returned they follow:
                // both values with be rounded and returned matching the ones on the console
                // they must sum 100%
                expect(moodArray[0].green).to.be.equal(100-moodArray[0].red);
                console.log("Historical Mood KPI result:"+JSON.stringify(moodArray));

            }
            done();
        });
    });

    it("Will get the historical global pulses per typical day",function(done){
        dailyPulseClient.getHistoricalGlobalPulsesPerTypicalDay(numberOfDaysToFetch,function(err,typicaldayArray){
            expect(err).to.be.null;
            expect(typicaldayArray[0].date).not.to.be.null;
            // Some dates may not have a PulsesPerTypicalDay calculated,
            if(typicaldayArray[0].pulses){
                // if they are returned they follow:
                expect(typicaldayArray[0].pulses).to.be.a("number");
            }
            console.log("Historical Typical day result:"+JSON.stringify(typicaldayArray));

            done();
        })
    });
});
