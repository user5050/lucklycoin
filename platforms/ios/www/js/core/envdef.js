var envdef={};

envdef.init = function()
{
     document.addEventListener("offline", envdef.offlineCallBack, false);
}

envdef.offlineCallBack=function()
{
    A.showToast("似乎网络已断开");
}

envdef.isWifi=function()
{
    if(navigator.connection)
    {
        var networkState = navigator.connection.type;

        return states[Connection.WIFI] == 'WiFi connection';
    } 

    return true;
}