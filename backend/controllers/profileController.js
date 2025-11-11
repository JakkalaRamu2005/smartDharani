// GET profile
import db from "../config/db.js"
import dotenv from 'dotenv';

dotenv.config();


export const getProfile = async (req, res) => {

  try {
    const userId = req.params.userId;


    const [rows] = await db.execute('SELECT * FROM user_profiles WHERE user_id=?', [userId]);


    if (rows.length === 0) {
      return res.json({
        user_id: userId,
        full_name: null,
        phone: null,
        location: null,
        bio: null,
        profile_image: null,
        preferred_language: 'english'
      });

      res.json(rows[0]);
    }

  } catch (error) {
    console.error('Error fetching profile', error);
    res.status(500).json({ message: 'server error white fetching profile' });
  }






}


export const updateProfile = async (req, res) => {

  try {
    const userId = req.params.userId;

    const { full_name, phone, location, bio, profile_image, preferred_language } = req.body;

    const [existing] = await db.execute('SELECT * FROM user_profiles WHERE user_id=?', [userId]);


    if (existing.length == 0) {
      await db.execute(`INSERT INTO user_profiles (user_id, full_name, phone, location, bio, profile_image, preferred_language)
      
      VALUES (?,?,?,?,?,?,?)`,
        [userId, full_name, phone, location, bio, profile_image, preferred_language || 'english']);
    } else {

      await db.execute(`UPDATE user_profiles SET full_name=?, phone=?, location=?, bio=?, profil_image=?, preferred_language=?
      
      
      WHERE user_id=?`, [full_name, phone, location, bio, profile_image, preferred_language || 'english'])




    }

    res.json({ message: 'Profile updated sucessfully', success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error while updating profile' });

  }


}