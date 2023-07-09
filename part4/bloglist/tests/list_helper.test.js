const listHelper = require("../utils/list_helper")

testBlogs = [{
    title: 'First Post',
    author: 'Andru Jalei',
    likes: 2
},
{
    title: 'Second Post',
    author: 'Andrew Halley',
    likes: 13
},
{
    title: 'Most Liked Post',
    author: 'Andrew Halley',
    likes: 18
},
{
    title: 'Fourth Post',
    author: 'Andru Jalei',
    likes: 10
},
{
    title: 'Fifth Post',
    author: 'Andru Jalei',
    likes: 7
}]

test('dummy returns 1', () => {
    const blogs = []

    expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {
    test('when the list is empty, returns 0', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when there is only one item on the list, returns its number of likes', () => {
        expect(listHelper.totalLikes([{ likes: 7 }])).toBe(7)
    })

    test('when there are more than one item, returns the correct number of likes', () => {
        expect(listHelper.totalLikes([{ likes: 7 }, { likes: 11 }])).toBe(18)
    })
})

describe('Most liked posts', () => {
    test('when there are no posts returns 0', () => {
        expect(listHelper.favoriteBlog([])).toBe(0)
    })

    test('when there is only one blog, it returs that blog', () => {
        expect(listHelper.favoriteBlog([{
            title: 'Only one post',
            author: 'Andru Jalei',
            likes: 12
        }])).toStrictEqual({
            title: 'Only one post',
            author: 'Andru Jalei',
            likes: 12
        })
    })

    test('when there are many posts, it returns the most liked', () => {
        expect(listHelper.favoriteBlog(testBlogs)).toStrictEqual({
            title: 'Most Liked Post',
            author: 'Andrew Halley',
            likes: 18
        })
    })
})

describe('Blogger with most blogs', () => {
    test('If no blogs are passed returns 0', () => {
        expect(listHelper.mostBlogs([])).toBe(0)
    })

    test('If only one blog is passed, returns the author and one post', () => {
        expect(listHelper.mostBlogs([{
            title: 'Test Blog',
            author: 'Andru Jalei',
            likes: 12
        }])).toStrictEqual({
            author: 'Andru Jalei',
            blogs: 1
        })
    })

    test('If multiple posts are passed, the blogger with more blogs is returned', () => {
        expect(listHelper.mostBlogs(testBlogs)).toStrictEqual({
            author: 'Andru Jalei',
            blogs: 3
        })
    })
})

describe('Blogger with most likes', () => {
    test('If no blogs are passed, returns 0', () => {
        expect(listHelper.mostLikes([])).toBe(0)
    })

    test('If only one blog is passed, returns the author and the likes', () => {
        expect(listHelper.mostLikes([{
            title: 'Test Blog',
            author: 'Andru Jalei',
            likes: 12
        }])).toStrictEqual({
            author: 'Andru Jalei',
            likes: 12
        })
    })

    test('If multiple post are passed, returns the most liked author', () => {
        expect(listHelper.mostLikes(testBlogs)).toStrictEqual({
            author: 'Andrew Halley',
            likes: 31
        })
    })
})