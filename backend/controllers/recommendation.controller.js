import { pgClient, pool } from "../config/postgresdb.js";


const getRecommendation = async (req, res) => {
    let client;
    try {
      client = await pool.connect();
      console.log("Fetching all documents");
  
      const result = await client.query(`
        SELECT 
          d._id AS document_id,
          d.author_id,
          u.firstname AS author_firstname,
          u.lastname AS author_lastname,
          d.title,
          d.description,
          d.file_path,
          d.document_type_id,
          dt.document_type,
          d.is_public,
          COALESCE(di.view_count, 0) AS view_count,
          COALESCE(di.like_count, 0) AS like_count,
          COALESCE(AVG(rt.rating), 0) AS avg_rating,
          d.created_at,
          d.updated_at
        FROM documents d
        JOIN users u ON d.author_id = u._id
        JOIN document_types dt ON d.document_type_id = dt._id
        LEFT JOIN doc_info di ON d._id = di.document_id
        LEFT JOIN review_table rt ON d._id = di.document_id
        GROUP BY 
          d._id, 
          u.firstname, 
          u.lastname, 
          dt.document_type, 
          di.view_count, 
          di.like_count
        ORDER BY d.created_at DESC;
      `);
  
      const documents = result.rows;
  
      if (documents.length === 0) {
        return res.status(200).json({ message: "No documents found", documents: [] });
      }
  
      res.status(200).json({ documents });
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents" });
    } finally {
      if (client) client.release();
    }
  };

const getNew = (req, res) => {
    const { userId } = req.params;

    // Logic to retrieve new books for a user   


    res.status(200).json({ newBooks });
}



const getTrending = (req, res) => {
    // Logic to retrieve trending books

    // query to find the document most like * 2 and upvote * 10 . 
    
    
}   

export { getRecommendation, getNew, getTrending }
