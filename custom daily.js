const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function randodandt(){
//date interval for the events so that all events should be created in between to these dates
    var start=new Date(2022,8,1);
    var end=new Date(2022,8,30);
    var dat= new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return Math.floor(dat.getTime() / 1000)
}
function randoending(dandt){
    var start=dandt;
    let difference = 1735525800 - start;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + start;
    return rand;
}
function setrrule(start,end){
    let arrule={};
    arrule["dtstart"]=start;
    arrule["until"]=end;
    arrule["freq"]=3;
    arrule["interval"]=Math.floor((Math.random()*10)+1);
    return arrule;
}
function genreq(){
    var dateandtime1= randodandt();
    dateandtime1=dateandtime1-(dateandtime1%100);
    var dateandtime2= dateandtime1+Math.floor((Math.random()*10000)+900);
    dateandtime2=dateandtime2-(dateandtime2%100);
    var lasttill=randoending(dateandtime1);
    console.log(dateandtime1);
    console.log(lasttill);
    var postRequest = {
        url: 'https://timetable.api.edvora.me/timetables',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
            'Authorization':
                pm.variables.get("auth")
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            "except_dates": [],
            "rrule": setrrule(dateandtime1,lasttill),
            "classroom_id": "632b4efce2570e5f1581cf03",
            "description": generateString(100),
            "location": generateString(5),
            "title": generateString(10),
            "start_datetime": dateandtime1,
            "end_datetime": dateandtime2,
            "participants_count": null,
            "participants": [],
            "meetlink": "",
            "extlink": "",
            "labels": [
                "test"
            ],
            "event_duration": {
                "duration": Math.floor(((dateandtime2-dateandtime1)/60)),
                "unit": "minutes"
            },
            "remind_me": [
                {
                    "duration": 3,
                    "unit": "minutes"
                }
            ],
            "priority_fields": 2
        })
        }
      };
      return postRequest;
}
for(var i=0;i<500;i++){
  var req=genreq();
  pm.sendRequest(req, (error, response) => {
    console.log(error ? error : response.json());
  });
}