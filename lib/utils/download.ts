// Utility function for downloading images
export async function downloadImage(url: string, filename: string): Promise<boolean> {
  try {
    // Fetch the image
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    
    // Check if blob is valid
    if (!blob || blob.size === 0) {
      throw new Error('Empty blob received');
    }
    
    // Create blob URL
    const blobUrl = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 100);
    
    return true;
    
  } catch (error) {
    console.error('Download failed:', error);
    
    // Fallback: Open in new tab
    try {
      window.open(url, '_blank');
      return true;
    } catch (openError) {
      console.error('Fallback failed:', openError);
      return false;
    }
  }
}

// For Cloudinary images with transformations
export function getDownloadUrl(url: string, quality: number = 90): string {
  // If using Cloudinary, add download parameters
  if (url.includes('cloudinary.com')) {
    // Add flags for forcing download
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}fl=attachment`;
  }
  
  return url;
}

// Generate filename from URL
export function generateFilename(url: string, prefix: string = 'yelloi'): string {
  const timestamp = Date.now();
  const extension = url.split('.').pop()?.split('?')[0] || 'jpg';
  return `${prefix}-${timestamp}.${extension}`;
}