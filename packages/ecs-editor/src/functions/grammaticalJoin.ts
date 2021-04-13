export function grammaticalJoin(parts: string[]) {
  switch (parts.length) {
    case 0:
      return "";
    case 1:
      return parts[0];
    default:
      const leading = parts.slice(0, parts.length - 1).join(", ");
      const trailing = parts[parts.length - 1];
      return `${leading} and ${trailing}`;
  }
}
