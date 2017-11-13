$(document).ready(function() {
  var $calendar = $("#calendar").fullCalendar(
    {
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
