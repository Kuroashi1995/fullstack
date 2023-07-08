const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totalLikes = 0
    const reducer = (sum, item) => {
        sum += item.likes
        return sum
    }
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}