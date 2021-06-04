require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
	/* Your site config here */
	siteMetadata: {
		title: 'Myasd New Blog',
		description: 'This is my awesome blog I made from scratch!',
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `blog`,
				path: `${__dirname}/blog/`,
			},
		},
		// {
		// 	resolve: `gatsby-source-filesystem`,
		// 	options: {
		// 		name: `blog`,
		// 		path: `${__dirname}/src/blog/`,
		// 	},
		// },
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images/`,
			},
		},
		{
			resolve: 'gatsby-source-graphql',
			options: {
				fieldName: 'github',
				headers: {
					Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
				},
				typeName: 'GitHub',
				url: 'https://api.github.com/graphql',
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-plugin-netlify-cms`,
	],
};
