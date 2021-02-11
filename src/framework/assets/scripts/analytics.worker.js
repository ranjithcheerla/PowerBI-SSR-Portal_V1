onmessage = function(e) {
    switch ( e.data.event ) {
        case 'SEND_ANALYTICS': 
            postToAnalyticsServer(e.data.data);
            break;
    }
};

function postToAnalyticsServer(analytics) {
    // var oReq = new XMLHttpRequest();
    // oReq.open("POST", "https://3ociscyl67.execute-api.us-east-1.amazonaws.com/dev/postenum?v=2", true);
    // oReq.send(analytics);
    // postMessage({
    //     message: 'from web worker'
    // });
}
