// src/appwriteConfig.js
import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_APPWRITE_URL) // Your Appwrite endpoint
  .setProject(process.env.REACT_APP_PROJECT_ID); // Your Appwrite project ID

// Export the account object for authentication
export const account = new Account(client);

// Export the databases object for database operations
export const databases = new Databases(client);
