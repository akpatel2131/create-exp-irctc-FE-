
export const minToHHMM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes.toString().padStart(2, "0")}m`;
  };
  
export const currency = (value) => new Intl.NumberFormat("en-IN").format(value);