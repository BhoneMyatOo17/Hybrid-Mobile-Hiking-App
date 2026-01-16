import * as SQLite from 'expo-sqlite';

let db;

// Initialize database
export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('mhike.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        date TEXT NOT NULL,
        parking TEXT NOT NULL,
        length REAL NOT NULL,
        difficulty TEXT NOT NULL,
        weather TEXT,
        terrain TEXT,
        description TEXT,
        is_favorite INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Database initialized successfully'); //log database initializaion
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
// Toggle favorite hike feature
export const toggleFavorite = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus ? 0 : 1;
    await db.runAsync(
      'UPDATE hikes SET is_favorite = ? WHERE id = ?',
      [newStatus, id]
    );
    console.log('Favorite status updated');
    return newStatus;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

// Get only favorite hikes
export const getFavoriteHikes = async () => {
  try {
    const favorites = await db.getAllAsync(
      'SELECT * FROM hikes WHERE is_favorite = 1 ORDER BY date DESC'
    );
    console.log('Fetched favorite hikes:', favorites.length);
    return favorites;
  } catch (error) {
    console.error('Error fetching favorite hikes:', error);
    throw error;
  }
};

// Insert a new hike
export const insertHike = async (hike) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO hikes (name, location, date, parking, length, difficulty, weather, terrain, description) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hike.name,
        hike.location,
        hike.date,
        hike.parking,
        hike.length,
        hike.difficulty,
        hike.weather || null,
        hike.terrain || null,
        hike.description || null
      ]
    );
    console.log('Hike inserted with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting hike:', error);
    throw error;
  }
};

// Get all hikes
export const getAllHikes = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM hikes ORDER BY date DESC');
    console.log('Fetched hikes:', allRows.length);
    return allRows;
  } catch (error) {
    console.error('Error fetching hikes:', error);
    throw error;
  }
};

// Get hike by ID
export const getHikeById = async (id) => {
  try {
    const row = await db.getFirstAsync('SELECT * FROM hikes WHERE id = ?', [id]);
    return row;
  } catch (error) {
    console.error('Error fetching hike:', error);
    throw error;
  }
};

// Update hike
export const updateHike = async (id, hike) => {
  try {
    await db.runAsync(
      `UPDATE hikes 
       SET name = ?, location = ?, date = ?, parking = ?, length = ?, 
           difficulty = ?, weather = ?, terrain = ?, description = ?
       WHERE id = ?`,
      [
        hike.name,
        hike.location,
        hike.date,
        hike.parking,
        hike.length,
        hike.difficulty,
        hike.weather || null,
        hike.terrain || null,
        hike.description || null,
        id
      ]
    );
    console.log('Hike updated successfully');
  } catch (error) {
    console.error('Error updating hike:', error);
    throw error;
  }
};

// Delete hike
export const deleteHike = async (id) => {
  try {
    await db.runAsync('DELETE FROM hikes WHERE id = ?', [id]);
    console.log('Hike deleted successfully');
  } catch (error) {
    console.error('Error deleting hike:', error);
    throw error;
  }
};

// Delete all hikes
export const deleteAllHikes = async () => {
  try {
    await db.runAsync('DELETE FROM hikes');
    console.log('All hikes deleted successfully');
  } catch (error) {
    console.error('Error deleting all hikes:', error);
    throw error;
  }
};

// Search hikes by name
export const searchHikesByName = async (searchTerm) => {
  try {
    const results = await db.getAllAsync(
      'SELECT * FROM hikes WHERE name LIKE ? ORDER BY date DESC',
      [`%${searchTerm}%`]
    );
    console.log('Search results:', results.length);
    return results;
  } catch (error) {
    console.error('Error searching hikes:', error);
    throw error;
  }
};