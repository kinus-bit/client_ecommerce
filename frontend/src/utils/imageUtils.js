// Utility function to get full image URL
export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  
  const baseUrl = import.meta.env.VITE_BASE_URL || '';
  return `${baseUrl}${path}`;
};

