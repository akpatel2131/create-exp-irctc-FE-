export const MOCK_TRAINS = [
    {
      id: "12952",
      name: "Mumbai Rajdhani",
      from: { code: "NDLS", name: "New Delhi", time: "16:55" },
      to: { code: "MMCT", name: "Mumbai Central", time: "08:35" },
      durationMin: 700,
      days: "Daily",
      classes: [
        { code: "1A", name: "First AC", price: 5890, avail: 4 },
        { code: "2A", name: "AC 2 Tier", price: 3250, avail: 18 },
        { code: "3A", name: "AC 3 Tier", price: 2160, avail: 28 },
        { code: "CC", name: "Chair Car", price: 0, avail: 0, hidden: true },
      ],
      onTime: 92, // % last 30 days
    },
    {
      id: "12263",
      name: "Pune Duronto",
      from: { code: "NDLS", name: "New Delhi", time: "23:10" },
      to: { code: "PUNE", name: "Pune Jn", time: "21:45" },
      durationMin: 1155,
      days: "Tue, Thu, Sat",
      classes: [
        { code: "3A", name: "AC 3 Tier", price: 2795, avail: 9 },
        { code: "2A", name: "AC 2 Tier", price: 3890, avail: 3 },
        { code: "SL", name: "Sleeper", price: 920, avail: 0 },
      ],
      onTime: 84,
    },
    {
      id: "12426",
      name: "Jammu Rajdhani",
      from: { code: "NDLS", name: "New Delhi", time: "20:40" },
      to: { code: "MMCT", name: "Mumbai Central", time: "12:40" },
      durationMin: 960,
      days: "Mon, Wed, Fri",
      classes: [
        { code: "3A", name: "AC 3 Tier", price: 2380, avail: 0 },
        { code: "2A", name: "AC 2 Tier", price: 3410, avail: 12 },
        { code: "1A", name: "First AC", price: 6140, avail: 2 },
      ],
      onTime: 88,
    },
    {
      id: "12910",
      name: "BDTS Garib Rath",
      from: { code: "NZM", name: "Hazrat Nizamuddin", time: "15:50" },
      to: { code: "BDTS", name: "Bandra Terminus", time: "07:35" },
      durationMin: 825,
      days: "Daily",
      classes: [
        { code: "3A", name: "AC 3 Tier", price: 1320, avail: 54 },
      ],
      onTime: 76,
    },
  ];