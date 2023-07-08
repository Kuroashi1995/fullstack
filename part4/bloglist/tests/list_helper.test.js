const listHelper = require("../utils/list_helper")

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
        expect(listHelper.favoriteBlog([{
            title: 'First Post',
            author: 'Andru Jalei',
            likes: 12
        },
        {
            title: 'Second Post',
            author: 'Andru Jalei',
            likes: 13
        },
        {
            title: 'Most Liked Post',
            author: 'Andru Jalei',
            likes: 18
        },
        {
            title: 'Fourth Post',
            author: 'Andru Jalei',
            likes: 15
        }])).toStrictEqual({
            title: 'Most Liked Post',
            author: 'Andru Jalei',
            likes: 18
        })
    })
})