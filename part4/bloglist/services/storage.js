const mongoose = require("mongoose")
const Blog = require("../models/blog")
const logger = require("../utils/logger")
const { MONGODB_URI } = require("../utils/config")

mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)
    .then(() => logger.info("Connected to DB"))
    .catch((error) => {
        logger.error("Error connecting to db: ", error.message)
    })

getBlogs = async (id) => {
    const blogs = await Blog.find({})
    return blogs
}

postBlog = async (blogArg) => {
    const blog = new Blog(blogArg)
    try {
        insertedBlog = await Blog.create(blog)
        return insertedBlog
    }
    catch (error) {
        logger.error("Error al crear Blog: ", error.message)
    }
}

module.exports = {
    getBlogs,
    postBlog
}