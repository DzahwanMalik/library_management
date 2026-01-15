const truncateText = (str: string | null, max: number) => {
  if (!str) return "";
  if (str.length <= max) return str;

  const trimmed = str.slice(0, max);

  // cari spasi terakhir supaya tidak memotong kata
  const lastSpace = trimmed.lastIndexOf(" ");

  return trimmed.slice(0, lastSpace) + "...";
};

export default truncateText;
