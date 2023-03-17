export const DateValue = (date: string): string => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    let formattedDate: string;
    
    if (diffInSeconds < 60) {
      formattedDate = `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      formattedDate = `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      formattedDate = `${diffInHours} hours ago`;
    } else if (diffInDays < 365) {
      formattedDate = `${diffInDays} days ago`;
    } else {
      formattedDate = `${diffInYears} years ago`;
    }
  
    return formattedDate;
  };
  