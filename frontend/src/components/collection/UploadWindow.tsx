import React, { useState, useEffect } from 'react';

interface FormData {
  title: string;
  authors: string;
  description: string;
  publishedYear: string;
  price: string;
  genre: string[]; // Array for multiple genres
  documentType: string;
}

interface Genre {
  id: string;
  name: string;
}

interface DocumentType {
  id: string;
  name: string;
}

const UploadWindow: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: '',
    description: '',
    publishedYear: '',
    price: '',
    genre: [], // Initialize as empty array
    documentType: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [genreFields, setGenreFields] = useState<string[]>(['']); // Array to track genre dropdowns

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch genres
        const genresResponse = await fetch('http://localhost:4040/api/v1/book/genre/all');
        if (!genresResponse.ok) {
          throw new Error(`Failed to fetch genres: ${genresResponse.statusText}`);
        }
        const genresResponseData = await genresResponse.json();
        console.log('Genres response:', genresResponseData);
        const genresData: Genre[] = genresResponseData.data.genres.map((name: string, index: number) => ({
          id: `genre-${index}`,
          name,
        }));
        setGenres(genresData);

        // Fetch document types
        const docTypesResponse = await fetch('http://localhost:4040/api/v1/book/type/all');
        if (!docTypesResponse.ok) {
          throw new Error(`Failed to fetch document types: ${docTypesResponse.statusText}`);
        }
        const docTypesResponseData = await docTypesResponse.json();
        console.log('Document types response:', docTypesResponseData);
        const docTypesData: DocumentType[] = docTypesResponseData.data.documentTypes.map(
          (name: string, index: number) => ({
            id: `docType-${index}`,
            name,
          })
        );
        setDocumentTypes(docTypesData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === 'genre' && index !== undefined) {
      // Update specific genre field
      const updatedGenres = [...genreFields];
      updatedGenres[index] = value;
      setGenreFields(updatedGenres);
      // Update formData.genre with all non-empty genre selections
      setFormData((prev) => ({
        ...prev,
        genre: updatedGenres.filter((g) => g !== ''),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addGenreField = () => {
    setGenreFields((prev) => [...prev, '']);
  };

  const removeGenreField = (index: number) => {
    const updatedGenres = genreFields.filter((_, i) => i !== index);
    setGenreFields(updatedGenres);
    setFormData((prev) => ({
      ...prev,
      genre: updatedGenres.filter((g) => g !== ''),
    }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'genre') {
          formDataToSend.append(key, value);
        }
      });
      formData.genre.forEach((genreId, index) => {
        formDataToSend.append(`genre[${index}]`, genreId);
      });
      if (coverImage) formDataToSend.append('coverImage', coverImage);
      if (uploadFile) formDataToSend.append('file', uploadFile);

      const response = await fetch('http://localhost:4040/api/v1/book/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload');
      }

      alert('Book uploaded successfully!');
      setFormData({
        title: '',
        authors: '',
        description: '',
        publishedYear: '',
        price: '',
        genre: [],
        documentType: '',
      });
      setGenreFields(['']);
      setCoverImage(null);
      setUploadFile(null);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700 mb-1">
            Authors
          </label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="comma separated"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">Separate multiple authors with commas</p>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleCoverImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 mb-1">
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            min="1900"
            max="2099"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genres</label>
          {genreFields.map((genre, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                name="genre"
                value={genre}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={index === 0} // Only the first genre is required
              >
                <option value="">Select a genre</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              {genreFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGenreField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addGenreField}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add More
          </button>
        </div>
        <div>
          <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
            Document Type
          </label>
          <select
            id="documentType"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a document type</option>
            {documentTypes.map((docType) => (
              <option key={docType.id} value={docType.id}>
                {docType.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileUploadChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadWindow;