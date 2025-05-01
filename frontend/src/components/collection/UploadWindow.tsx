import React, { useState, useEffect, useRef } from 'react';

interface FormData {
  author_id: string;
  title: string;
  description: string;
  document_type_id: string;
  is_public: boolean;
}

interface DocumentType {
  _id: number;
  document_type: string;
}

interface DocumentResponse {
  _id: number;
  author_id: number;
  title: string;
  description: string | null;
  file_path: string;
  document_type_id: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface ErrorResponse {
  error: string;
}

const API_BASE_URL = 'http://localhost:4040/api/v1';

const UploadWindow: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    author_id: '',
    title: '',
    description: '',
    document_type_id: '',
    is_public: false,
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData | 'file', string>>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      const cachedTypes = localStorage.getItem('documentTypes');
      if (cachedTypes) {
        try {
          setDocumentTypes(JSON.parse(cachedTypes));
          return;
        } catch (err) {
          console.error('Failed to parse cached document types:', err);
        }
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/document/types`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch document types: ${response.statusText}`);
        }
        const data = await response.json();
        // Validate response: expect an array of DocumentType
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected an array of document types');
        }
        const documentTypes = data.filter((item: any) =>
          typeof item === 'object' && '_id' in item && 'document_type' in item
        );
        setDocumentTypes(documentTypes);
        localStorage.setItem('documentTypes', JSON.stringify(documentTypes));
      } catch (err) {
        console.error('Error fetching document types:', err);
        setFieldErrors({
          document_type_id: err instanceof Error ? err.message : 'Failed to load document types',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocumentTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      setFieldErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData | 'file', string>> = {};
    const authorId = Number(formData.author_id);
    if (!formData.author_id || isNaN(authorId) || authorId <= 0) {
      errors.author_id = 'Author ID must be a positive number';
    }
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      errors.title = 'Title must be 255 characters or less';
    }
    if (formData.description.length > 1000) {
      errors.description = 'Description must be 1000 characters or less';
    }
    if (!formData.document_type_id && documentTypes.length > 0) {
      errors.document_type_id = 'Document type is required';
    }
    if (!uploadFile) {
      errors.file = 'A file is required';
    } else {
      const validMimeTypes: { [key: string]: string[] } = {
        md: ['text/markdown'],
        pdf: ['application/pdf'],
        txt: ['text/plain'],
        png: ['image/png'],
        jpg: ['image/jpeg'],
        odt: ['application/vnd.oasis.opendocument.text'],
        docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        ppt: ['application/vnd.ms-powerpoint'],
        xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        json: ['application/json'],
      };
      const selectedType = documentTypes.find(
        (type) => type._id === Number(formData.document_type_id)
      );
      const expectedMimeTypes = selectedType
        ? validMimeTypes[selectedType.document_type.toLowerCase()] || []
        : Object.values(validMimeTypes).flat();
      if (!expectedMimeTypes.includes(uploadFile.type)) {
        errors.file = `File must be a ${selectedType ? selectedType.document_type : 'supported format'}`;
      }
      if (uploadFile.size > 10 * 1024 * 1024) {
        errors.file = 'File size must be less than 10MB';
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      if (uploadFile) {
        formDataToSend.append('file', uploadFile);
      }

      const response = await fetch(`${API_BASE_URL}/document/create`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        body: formDataToSend,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to upload document';
        try {
          const errorData: ErrorResponse = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
        }
        throw new Error(errorMessage);
      }

      await response.json();
      setSuccess('Document uploaded successfully!');
      setFormData({
        author_id: '',
        title: '',
        description: '',
        document_type_id: '',
        is_public: false,
      });
      setUploadFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setFieldErrors({ file: err instanceof Error ? err.message : 'An unknown error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && !documentTypes.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="author_id" className="block text-sm font-medium text-gray-700 mb-1">
            Author ID
          </label>
          <input
            type="number"
            id="author_id"
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.author_id ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            min="1"
            aria-invalid={!!fieldErrors.author_id}
            aria-describedby={fieldErrors.author_id ? 'author_id_error' : undefined}
          />
          {fieldErrors.author_id && (
            <p id="author_id_error" className="text-red-500 text-sm mt-1">
              {fieldErrors.author_id}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            maxLength={255}
            aria-invalid={!!fieldErrors.title}
            aria-describedby={fieldErrors.title ? 'title_error' : undefined}
          />
          {fieldErrors.title && (
            <p id="title_error" className="text-red-500 text-sm mt-1">
              {fieldErrors.title}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 ${
              fieldErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={1000}
            aria-invalid={!!fieldErrors.description}
            aria-describedby={fieldErrors.description ? 'description_error' : undefined}
          />
          {fieldErrors.description && (
            <p id="description_error" className="text-red-500 text-sm mt-1">
              {fieldErrors.description}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="document_type_id" className="block text-sm font-medium text-gray-700 mb-1">
            Document Type
          </label>
          <select
            id="document_type_id"
            name="document_type_id"
            value={formData.document_type_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.document_type_id ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            aria-invalid={!!fieldErrors.document_type_id}
            aria-describedby={fieldErrors.document_type_id ? 'document_type_id_error' : undefined}
          >
            <option value="">Select a document type</option>
            {documentTypes.map((docType) => (
              <option key={docType._id} value={docType._id}>
                {docType.document_type.toUpperCase()}
              </option>
            ))}
          </select>
          {fieldErrors.document_type_id && (
            <p id="document_type_id_error" className="text-red-500 text-sm mt-1">
              {fieldErrors.document_type_id}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              fieldErrors.file ? 'border-red-500' : ''
            }`}
            required
            accept=".md,.pdf,.txt,.png,.jpg,.jpeg,.odt,.docx,.ppt,.xlsx,.json"
            aria-invalid={!!fieldErrors.file}
            aria-describedby={fieldErrors.file ? 'file_error' : undefined}
          />
          {fieldErrors.file && (
            <p id="file_error" className="text-red-500 text-sm mt-1">
              {fieldErrors.file}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="is_public" className="flex items-center">
            <input
              type="checkbox"
              id="is_public"
              name="is_public"
              checked={formData.is_public}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Make Public</span>
          </label>
        </div>
        {success && (
          <div className="text-green-500 text-sm mt-2" role="alert">
            {success}
          </div>
        )}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${
              isSubmitting || isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadWindow;