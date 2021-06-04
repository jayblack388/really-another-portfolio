const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ actions, getNode, node }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode, basePath: `pages` });

		createNodeField({
			node,
			name: `slug`,
			value,
		});
	}
};
exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;
	const result = await graphql(`
		query {
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: path.join('blog', node.fields.slug),
			component: path.resolve(`./src/templates/blog-post.js`),
			context: {
				// Data passed to context is available
				// in page queries as GraphQL variables.
				slug: node.fields.slug,
			},
		});
	});
};
