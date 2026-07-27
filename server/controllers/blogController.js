const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const slugify = require("slugify");
const Blog = require("../models/Blog");

//Create Blog
const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      category,
      tags,
      featured,
      published,
      readingTime,
      content,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required.",
      });
    }

    // Temporary image path
    const coverTemp = req.file.path;

    // Upload to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(coverTemp, {
      folder: "researchhub-articles",
    });

    const coverImage = imageUpload.secure_url;

    // Delete local temp file
    fs.unlinkSync(coverTemp);

    // Generate slug
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      category,
      coverImage,
      content,
      readingTime,

      featured: featured === "true",
      published: published === "true",

      tags: tags ? JSON.parse(tags) : [],
    });

    res.status(201).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to publish article.",
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
        message: "Article not found",
      });
    }

    const viewed = req.headers["x-viewed"];

    if (!viewed) {
      blog.views += 1;
      await blog.save();
    }

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

const getAdminBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find()
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

const getBlogStats = async (req, res) => {
  try {

    const totalArticles = await Blog.countDocuments();

    const published = await Blog.countDocuments({
      published: true,
    });

    const drafts = await Blog.countDocuments({
      published: false,
    });

    const featured = await Blog.countDocuments({
      featured: true,
    });

    const totalViews = await Blog.aggregate([
      {
        $group: {
          _id: null,
          views: {
            $sum: "$views",
          },
        },
      },
    ]);

    const mostViewed = await Blog.findOne()
      .sort({
        views: -1,
      });

    res.json({
      success: true,

      stats: {

        totalArticles,

        published,

        drafts,

        featured,

        totalViews:
          totalViews.length > 0
            ? totalViews[0].views
            : 0,

        mostViewed,

      },

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
  getAdminBlogs,
  
  getBlogStats,
};