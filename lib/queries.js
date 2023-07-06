export const getPostList = (endCursor = null) => {
    const condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}}`
    return `{ posts(${condition}) { nodes { title date slug excerpt(format: RENDERED) featuredImage { node { altText mediaDetails { file sizes { sourceUrl width height } } } } categories { nodes { name slug } } } pageInfo { endCursor hasNextPage hasPreviousPage startCursor } } }`
}

export const getPostHeadline = () => {
    return `{ categories(where:{slug:"headline"}) { edges { node { posts(first:5,where:{orderby:{field:DATE,order:DESC}}) { edges { node { id title date uri featuredImage { node { altText sourceUrl } } } } } } } } }`
}

export const getTagsPopular = () => `{ tags(first: 10, where: { orderby: COUNT, order: DESC }) { nodes { name slug uri } } }`;

export const getPostByCategory = (slug, endCursor = null) => {
    const condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}}`
    return `{ category(idType: SLUG, id: "${slug}") { name posts(${condition}) { nodes { slug title(format: RENDERED) uri date excerpt(format: RENDERED) featuredImage { node { altText mediaDetails { sizes { sourceUrl width height } } } } } pageInfo { endCursor hasNextPage hasPreviousPage startCursor } } } }`
}

export const getPostByTag = (slug, endCursor = null) => {
    const condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}}`
    return `{ tag(idType: SLUG, id: "${slug}") { name posts(${condition}) { nodes { slug title(format: RENDERED) uri date excerpt(format: RENDERED) featuredImage { node { altText mediaDetails { sizes { sourceUrl width height } } } } } pageInfo { endCursor hasNextPage hasPreviousPage startCursor } } } }`
}

export const getPostByAuthor = (slug, endCursor = null) => {
    const condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}}`
    return `{ user(idType: SLUG, id: "${slug}") { name posts(${condition}) { nodes { slug title(format: RENDERED) uri date excerpt(format: RENDERED) featuredImage { node { altText mediaDetails { sizes { sourceUrl height width } } } } } pageInfo { endCursor hasNextPage hasPreviousPage startCursor } } } }`
}

export const getPostBySearch = (search, endCursor = null) => {
    const condition = `after: "${endCursor}", first: 10, where: {search: "${search}" orderby: {field: DATE, order: DESC}}`
    return `{ posts(${condition}) { nodes { date featuredImage { node { altText mediaDetails { sizes { sourceUrl width height } } } } excerpt(format: RENDERED) title(format: RENDERED) uri slug  } pageInfo { endCursor hasNextPage hasPreviousPage startCursor } } }`
}

export const getMenuFooter = () => {
    return `{ menuItems(where: {location: FOOTER}, first: 10) { nodes { key: id parentId title: label url uri } } }`
}