import Blog from "../models/Blog.js";
// Create blog
export const blogwriter = async (req, res) => {
  try {
    const { title, content, authorId, thumbnail } = req.body;

    if (!authorId) {
      return res.status(400).json({ message: "Author ID missing" });
    }

    const blogger = await Blog.create({
      title,
      content,
      thumbnail,   // direct frontend se aayega
      author: authorId,
      status: "pending",
    });

    res.status(201).json({
      message: "Blog submitted",
      blogger,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// admin side blog
export const blogadmin = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      message: "Successfully get toward admin ",
      blogs, // This contains the filtered list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user seen blog
export const blogget = async (req, res) => {
  try {
    const status = req.query.status || "approved";
    const blogs = await Blog.find({ status });
    res.status(200).json({
      message: "Successfully get toward user",
      blogs, // This contains the filtered list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// blog approved by admin
export const blogapproved = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true },
    );
    res.status(200).json({
      message: "Successfully update",
      blogs, // This contains the filtered list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// blog delete by both
export const deleteblog = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId } = req.query;

    let blog;

    if (authorId) {
      // 👤 User deleting their own blog
      blog = await Blog.findOneAndDelete({
        _id: id,
        author: authorId,
      });
    } else {
      // 👨‍💼 Admin deleting any blog
      blog = await Blog.findByIdAndDelete(id);
    }

    if (!blog) {
      return res.status(403).json({
        message: "Not allowed to delete this blog",
      });
    }

    res.status(200).json({
      message: "Successfully deleted",
      blog,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getUserBlogs
export const getUserBlogs = async (req, res) => {
  try {
    const { authorId } = req.query;

    if (!authorId) {
      return res.status(400).json({ message: "Author ID required" });
    }

    const blogs = await Blog.find({ author: authorId });

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getSingleBlog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json({ blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// updateBlog by user
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        status: "pending"  
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated and approved successfully",
      updatedBlog,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
