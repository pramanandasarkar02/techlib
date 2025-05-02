const API_BASE_URL = 'http://localhost:4040/api/v1';

export const fetchDocuments = async (type: 'saved' | 'liked' | 'downloaded', userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/${type}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch documents');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type} documents:`, error);
    throw error;
  }
};

export const fetchDocumentTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/document/types`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch document types');
    return await response.json();
  } catch (error) {
    console.error('Error fetching document types:', error);
    throw error;
  }
};

export const uploadDocument = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/document/create`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload document');
    return await response.json();
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};