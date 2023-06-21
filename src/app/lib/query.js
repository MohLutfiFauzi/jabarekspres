import graphqlRequest from "./graphqlRequest"

const flatListToHierarchical = (
  data = [],
  { idKey = 'key', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
  const tree = [];
  const childrenOf = {};
  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId
      ? (
        childrenOf[parentId] = childrenOf[parentId] || []
      ).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};

export async function getPostList(first = 10) {
  const condition = `after: "null", first: ${first}, where: {orderby: {field: DATE, order: DESC}}`
  const query = {
    query: `query {
            posts(${condition}) {
              nodes {
                title
                date
                slug
                excerpt(format: RENDERED)
                featuredImage {
                  node {
                    altText
                    mediaDetails {
                      file
                      sizes {
                        sourceUrl
                        width
                        height
                      }
                    }
                  }
                }
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }`
  };

  const resJson = await graphqlRequest(query);
  const allPosts = resJson.data.posts.nodes;

  return allPosts;
}

export async function getTagsPopular() {
  const query = {
    query: ` query {
      tags(first: 10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        name
        slug
        uri
      }
    }
  }`
  };

  const resJson = await graphqlRequest(query);
  const tagsPopuler = resJson.data.tags.nodes;

  return tagsPopuler;
}

export async function getMenuPrimary() {
  const query = {
    query: ` query {
      menuItems(where: {location: PRIMARY}, first: 20) {
        nodes {
          key: id
          parentId
          title: label
          url
          uri
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const menusPrimary = resJson.data.menuItems.nodes;
  const hierarchicalList = flatListToHierarchical(menusPrimary);
  return hierarchicalList;
}

export async function getMenuFooter() {
  const query = {
    query: ` query {
      menuItems(where: {location: FOOTER}, first: 10) {
        nodes {
          key: id
          parentId
          title: label
          url
          uri
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const menusFooter = resJson.data?.menuItems?.nodes;
  const hierarchicalList = flatListToHierarchical(menusFooter);
  return hierarchicalList;
}


export async function getStaticPage(slug) {
  const query = {
    query: ` query {
      pageBy(uri: "${slug}") {
        id
        title(format: RENDERED)
        content(format: RENDERED)
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const staticPage = resJson.data?.pageBy;
  return staticPage;
}

export async function getSinglePost(slug) {
  const query = {
    query: ` query {
      post(id: "${slug}", idType: SLUG) {
        content(format: RENDERED)
        excerpt(format: RENDERED)
        modified
        slug
        title(format: RENDERED)
        featuredImage {
          node {
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
              }
            }
            altText
          }
        }
        author {
          node {
            name
            uri
          }
        }
        tags {
          nodes {
            name
            slug
            uri
          }
        }
        categories {
          nodes {
            name
            id
            slug
            uri
          }
        }
      }
    }`
  };


  const resJson = await graphqlRequest(query);
  const singlePost = resJson.data.post;
  return singlePost;
}

export async function getForMetadata(slug) {
  const query = {
    query: ` query {
      post(id: "${slug}", idType: SLUG) {
        excerpt(format: RENDERED)
        title(format: RENDERED)
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const metadata = resJson.data.post;
  return metadata;
}

export async function getPageSlug() {
  const query = {
    query: ` query {
      pages {
        nodes {
          slug
          uri
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const pageSlugs = resJson.data.pages.nodes;
  return pageSlugs;
}

export async function getPostBySlug(slug) {
  const query = {
    query: `query {
      category(idType: SLUG, id: "${slug}") {
        name
        posts {
          nodes {
            slug
            title(format: RENDERED)
            uri
            date
            excerpt(format: RENDERED)
            featuredImage {
              node {
                altText
                mediaDetails {
                  sizes {
                    sourceUrl
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const postByCategory = resJson.data.category?.posts?.nodes;
  const nameCategory = resJson.data.category?.name;
  return [postByCategory, nameCategory];
}

export async function getPostByTag(slug) {
  const query = {
    query: `query getPostByTag {
      tag(id: "${slug}", idType: SLUG) {
        posts {
          nodes {
            slug
            title(format: RENDERED)
            uri
            date
            excerpt(format: RENDERED)
            featuredImage {
              node {
                altText
                mediaDetails {
                  sizes {
                    sourceUrl
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const pageSlugs = resJson.data.tag?.posts?.nodes;
  return pageSlugs;
}

export async function getPostByAuthor(slug) {
  const query = {
    query: `query  {
      user(id: "${slug}", idType: SLUG) {
        posts {
          nodes {
            slug
            title(format: RENDERED)
            uri
            date
            excerpt(format: RENDERED)
            featuredImage {
              node {
                altText
                mediaDetails {
                  sizes {
                    sourceUrl
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const pageSlugs = resJson.data.user?.posts?.nodes;
  return pageSlugs;
}

export async function getPostBySearch(search) {
  const query = {
    query: `query {
      posts(where: {search: "${search}"}) {
        nodes {
          date
          featuredImage {
            node {
              altText
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
          excerpt(format: RENDERED)
          title(format: RENDERED)
          uri
          slug
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const posts = resJson.data.posts?.nodes;
  return posts;
}