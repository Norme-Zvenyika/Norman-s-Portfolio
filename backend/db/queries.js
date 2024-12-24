export const SQL_QUERIES = {
  GET_LATEST_ID: {
    name: 'get-latest-id',
    text: `
          SELECT COALESCE(MAX(id), 0) as max_id 
          FROM messages
      `
  },

  GET_ALL_MESSAGES: {
    name: 'get-all-messages',
    text: `
          SELECT id, name, email, message, created_at 
          FROM messages 
          ORDER BY created_at DESC
      `
  },

  INSERT_MESSAGE: {
    name: 'insert-message',
    text: `
          INSERT INTO messages (name, email, message) 
          VALUES ($1, $2, $3)
          RETURNING *
      `
  },

  DELETE_MESSAGE: {
    name: 'delete-message',
    text: `
          DELETE FROM messages 
          WHERE id = $1
          RETURNING *
      `
  }
};