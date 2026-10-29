import express from 'express';
import multer from 'multer';
import { createCourse, deleteCourse, getCourseById, getCourses, getMyRating, getPublicCourses, rateCourse, updateCourse, updateCourseStatus } from '../controllers/courseController.js';
import requireAdmin from '../middleware/requireAdmin.js';

// Use memory storage — file buffer is streamed directly to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

const courseRouter = express.Router();

courseRouter.get('/public', getPublicCourses);
courseRouter.get('/', requireAdmin, getCourses);
courseRouter.get('/:id', getCourseById);

courseRouter.post('/', requireAdmin, upload.single('image'), createCourse);
courseRouter.put('/:id', requireAdmin, upload.single('image'), updateCourse);
courseRouter.patch('/:id/status', requireAdmin, updateCourseStatus);
courseRouter.delete('/:id', requireAdmin, deleteCourse);

courseRouter.post('/:courseId/rate', rateCourse);
courseRouter.get('/:courseId/rating', getMyRating);

export default courseRouter;
