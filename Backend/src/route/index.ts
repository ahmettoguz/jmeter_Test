import { Router } from 'express';
import multer from '../services/Multer';
import route from '../endpoint';

const userRouter: Router = Router();

// CRUD operations
userRouter.route('/signUp').post(route.signUp);
userRouter.route('/login').post(route.login);

userRouter.route('/runTest').post(multer.single('jmxFile'), route.runTest);
userRouter.route('/result/:id/report/:id1/:id2/:id3/:id4/:id5/:fileId').get(route.getFileforSixDepth);
userRouter.route('/result/:id/report/:id1/:id2/:id3/:id4/:fileId').get(route.getFileforFiveDepth);
userRouter.route('/result/:id/report/:id1/:id2/:id3/:fileId').get(route.getFileforFourDepth);
userRouter.route('/result/:id/report/:id1/:id2/:fileId').get(route.getFileforThreeDepth);
userRouter.route('/result/:id/report/:id1/:fileId').get(route.getFileforTwoDepth);
userRouter.route('/result/:id/report/:fileId').get(route.showResult);

export default userRouter;