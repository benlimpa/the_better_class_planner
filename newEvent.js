function addEvent()
{
	var name = $("#eventName").val();
var startTime = document.getElementByName("Day").value + "T" + "08:00:00";
$calendar.fullCalendar('renderEvent', {title: name, start: startTime})


}