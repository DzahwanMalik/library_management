const formattedDate = (dateString: Date | null) => {
  const date = new Date(dateString!);

  const formatted = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted;
};

export default formattedDate;
