const Blog = require("../models/Blog");

// Create Blog
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to create article.",
    });
  }
};

// Get All Blogs
const getBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find({
      published: true,
    })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }
};

// Get Featured Blogs
const getFeaturedBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find({
      featured: true,
      published: true,
    }).limit(3);

    res.json({
      success: true,
      blogs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }

};

// Get Single Blog
const getSingleBlog = async (req, res) => {

  try {

    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {

      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });

    }

    blog.views += 1;

    await blog.save();

    res.json({
      success: true,
      blog,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }

};

// Update Blog
const updateBlog = async (req, res) => {

  try {

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      blog,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }

};

// Delete Blog
const deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Article deleted successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }

};

module.exports = {
  createBlog,
  getBlogs,
  getFeaturedBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};