import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiFile, FiPlus, FiMinus } from 'react-icons/fi';

const Upload = () => {
  const [resource, setResource] = useState({
    title: '',
    cover_img: null,
    description: '',
    price: '',
    tags: [],
    document: null,
    newTag: ''
  });

  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle cover image upload and preview
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResource({ ...resource, cover_img: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document drop
  const onDocumentDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setResource({ ...resource, document: acceptedFiles[0] });
    }
  }, [resource]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDocumentDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/epub+zip': ['.epub'],
      'application/msword': ['.doc', '.docx']
    },
    maxFiles: 1
  });

  // Handle tag operations
  const handleAddTag = () => {
    if (resource.newTag.trim() && !resource.tags.includes(resource.newTag.trim())) {
      setResource({
        ...resource,
        tags: [...resource.tags, resource.newTag.trim()],
        newTag: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setResource({
      ...resource,
      tags: resource.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Here you would typically send the data to your backend
    // const formData = new FormData();
    // formData.append('title', resource.title);
    // formData.append('description', resource.description);
    // formData.append('price', resource.price);
    // formData.append('tags', JSON.stringify(resource.tags));
    // if (resource.cover_img) formData.append('cover_img', resource.cover_img);
    // if (resource.document) formData.append('document', resource.document);

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsUploading(false);
    //   setUploadProgress(0);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Upload Book Resource</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={resource.title}
            onChange={(e) => setResource({ ...resource, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <div className="flex items-center space-x-4">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Cover preview"
                  className="h-32 w-24 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setResource({ ...resource, cover_img: null });
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <div className="h-32 w-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            <div>
              <input
                type="file"
                id="cover_img"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
              <label
                htmlFor="cover_img"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                <FiUpload className="inline mr-2" />
                Upload Cover
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={resource.description}
            onChange={(e) => setResource({ ...resource, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (USD)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              value={resource.price}
              onChange={(e) => setResource({ ...resource, price: e.target.value })}
              min="0"
              step="0.01"
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                >
                  <FiX size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={resource.newTag}
              onChange={(e) => setResource({ ...resource, newTag: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document <span className="text-red-500">*</span>
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {resource.document ? (
              <div className="flex flex-col items-center">
                <FiFile className="w-12 h-12 text-blue-500 mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {resource.document.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(resource.document.size / 1024)} KB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setResource({ ...resource, document: null });
                  }}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div>
                <FiUpload className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop your document here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, EPUB, DOCX (Max 50MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="pt-4">
            <div className="mb-1 text-sm font-medium text-gray-700">
              Uploading... {uploadProgress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isUploading || !resource.title || !resource.description || !resource.document}
            className={`w-full px-4 py-3 rounded-md text-white font-medium ${
              isUploading || !resource.title || !resource.description || !resource.document
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isUploading ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;