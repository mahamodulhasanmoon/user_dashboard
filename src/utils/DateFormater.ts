export function formatUtcToLocal(utcTime:any) {
    const options:any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
  
    const date = new Date(utcTime);
    const localTimeString = date.toLocaleString(undefined, options);
    return localTimeString;
  }