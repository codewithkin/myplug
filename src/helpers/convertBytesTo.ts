export function convertBytesTo(
    {
      bytes,
      unit
    }: {
      bytes: number,
      unit: "GB" | "MB" | "KB"
    }
  ): string {
    const units = {
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
    };
  
    const divisor = units[unit];
    return (bytes / divisor).toFixed(2);
  }
  