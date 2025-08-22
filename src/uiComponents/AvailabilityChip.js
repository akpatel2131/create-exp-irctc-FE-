import Badge from "./Badge";

const AvailabilityChip = ({ avail }) => {
  if (avail > 20) return <Badge tone="success">Available · {avail}</Badge>;
  if (avail > 0) return <Badge tone="warn">Few left · {avail}</Badge>;
  return <Badge>WL/Not Available</Badge>;
};

export default AvailabilityChip;
