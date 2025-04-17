// Import JSON files with the required type attribute
import Books from "./book.json" with { type: "json" };
import Users from "./user.json" with { type: "json" };
import Connections from "./connection.json" with { type: "json" };
import Reviews from "./review.json" with { type: "json" };

// Export the data
export { Books, Users, Connections, Reviews };