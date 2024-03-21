interface CalendarIconProps {
  height?: number | string;
  width?: number | string;
}
const CalendarIcon = ({ height, width }: CalendarIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
  >
    <title>Calendar</title>
    <path d="M8 12H6c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-2c0-1.103-.897-2-2-2Zm-2 4v-2h2v2H6ZM19 2h-1V1a1 1 0 1 0-2 0v1H8V1a1 1 0 1 0-2 0v1H5C2.243 2 0 4.243 0 7v12c0 2.757 2.243 5 5 5h14c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5ZM5 4h14c1.654 0 3 1.346 3 3v1H2V7c0-1.654 1.346-3 3-3Zm14 18H5c-1.654 0-3-1.346-3-3v-9h20v9c0 1.654-1.346 3-3 3Z" />
  </svg>
);

export { CalendarIcon };
