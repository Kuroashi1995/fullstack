const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        sum += item.likes
        return sum
    }
    let totalLikes = 0
    if (blogs.length !== 0) {
        totalLikes = blogs.reduce(reducer, 0)
    }

    return totalLikes
}

const favoriteBlog = (blogs) => {
    let favoriteBlog
    if (blogs.length !== 0) {
        let mostLikes = 0
        for (blog of blogs) {
            if (blog.likes > mostLikes) {
                mostLikes = blog.likes
                favoriteBlog = blog
            }
        }
        return favoriteBlog
    } else {
        return 0
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const bloggers = _.countBy(blogs, (blog) => {
        return blog.author
    })

    const maxBlogs = Math.max(...Object.values(bloggers))

    const bestBloggerRaw = _.pickBy(bloggers, (value, key) => {
        return value === maxBlogs ? true : false
    })

    bestBlogger = {
        author: Object.keys(bestBloggerRaw)[0],
        blogs: Object.values(bestBloggerRaw)[0]
    }

    return bestBlogger
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }
    let likes = []
    const authors = _.flatMap(blogs, (blog) => {
        return blog.author
    })

    for (author of authors) {
        const auhtorlikes = blogs.reduce((total, blog) => {
            return blog.author === author ? total + blog.likes : total
        }, 0)
        likes.push(auhtorlikes)
    }

    const mostLikedIndex = likes.indexOf(Math.max(...likes))

    const mostLikedAuthor = {
        author: authors[mostLikedIndex],
        likes: likes[mostLikedIndex]
    }
    return mostLikedAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}