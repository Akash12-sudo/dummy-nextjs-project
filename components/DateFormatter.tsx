export default function DateFormatter(props) {
  const { createdAtTimestamp } = props;

  const createdAt = new Date(createdAtTimestamp);
  const formattedCreatedAt = createdAt.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // Specify UTC for consistency
  });

  return formattedCreatedAt;
}
