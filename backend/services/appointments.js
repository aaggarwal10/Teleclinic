const client = require('./database').client;
function createMeeting(token,start_time){
    const meetOptions = {
        method:"POST",
        url:"https://api.zoom.us/v2/users/me/meetings",
        headers: {
            Authorization: "Bearer "+token,
            "Content-Type":"application/json"
        },
        json:{
            topic: "appointment",
            start_time: start_time,
            duration: 30,
            timezone: "UTC",
            password: "nithin",
            agenda: "Checkup",
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                enforce_login: false,
                registrants_email_notification: true
            }
        }

    };
    request(meetOptions,function(error,response,body){
        let data = JSON.parse(body);

        // data.start_url
        client.query()




    });
}

module.exports = {
    assignCode: assignCode
}
