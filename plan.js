$(document).ready(function() {
  var $calendar = $("#calendar").fullCalendar(
    {
      events: [
        {
            title  : 'Math',
            start  : '2017-11-13T08:30:00'
        },
        {
            title  : 'CS',
            start  : '2017-11-15T10:30:00'
        }
    ],
      header: {
          left: '',
          center: '',
          right: '',
      },
      editable: true,
      height: "auto",
      views: {
          settimana: {
              type: 'agendaWeek',
              allDaySlot: false,
              duration: {
                  days: 7
              },
              minTime: "08:00:00",
              maxTime: "21:00:00",
              columnFormat: 'dddd', // Format the day to only show like 'Monday'
              hiddenDays: [0, 6] // Hide Sunday and Saturday?
          }
      },
      defaultView: 'settimana',
    }
  );
  });
