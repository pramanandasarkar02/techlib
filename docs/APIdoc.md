







# explore

1.a fetchRecommendedDocuments   /api/v1/recommendations/${userId}
1.b fetchTrendingDocuments      /api/v1/trending
1.c fetchNewDocuments           /api/v1/new/${userId}




# collection

2.a getSavedDocument            /api/v1/read/${userId}/${documentId}/saved
2.b getLikedDocument            /api/v1/read/${userId}/${documentId}/like
2.c getDownloadedDocument       /api/v1/read/${userId}/${documentId}/download
2.d uploadDocument              /api/v1/book/upload
2.e deleteDocument              /api/v1/read/${userId}/delete
2.f getshearDocumentLink        /api/v1/read/${userId}/${documentId}/shareLink

