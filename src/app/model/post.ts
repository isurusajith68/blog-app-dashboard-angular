export interface Post {
    title: string,
    permalink: string,
    category: {
        categoryId: string,
        category: string
    },
    postImagPath: string,
    excerpt: string,
    content: string,
    isFeatured: boolean,
    views: string,
    status: string,
    createdAt: Date
}
