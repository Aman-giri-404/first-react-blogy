import express from "express";
import {
  blogwriter,
  blogadmin,
  blogget,
  blogapproved,
  deleteblog,
  getUserBlogs,
  getSingleBlog,
 updateBlog,
} from "../controllers/blogController.js";
import upload from "../middleware/upload.js";

const bRoutes = express.Router();

bRoutes.post("/create", blogwriter);



bRoutes.get("/admin", blogadmin);
bRoutes.get("/public", blogget);
bRoutes.put("/update/:id", blogapproved);
bRoutes.delete("/delete/:id", deleteblog);
bRoutes.get("/userblog", getUserBlogs);
bRoutes.get("/blogfull/:id", getSingleBlog);
bRoutes.put("/updatednew/:id", updateBlog);

export default bRoutes;
