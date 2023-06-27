const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")
const storageService = require("../services/storage")

blogsRouter.get("/", async (request, response, next) => {
    response.json(await storageService.getBlogs())
})

blogsRouter.get("/:id", (request, response, next) => {
    response.json({
        path: `/${request.params.id}`
    })
})

blogsRouter.post("/", async (request, response, next) => {
    const insertedBlog = await storageService.postBlog(request.body)
    logger.info(insertedBlog)
    response.json(insertedBlog)
})

module.exports = blogsRouter