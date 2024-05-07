const TodayDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {weekday: 'long'};
    const dayName = date.toLocaleDateString('en-US', options);
    const today = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getMonth()];
  
    return (
      <>
        <p>
          {dayName}, {month} {today}
        </p>
      </>
    );
  };
  
  export default TodayDate;