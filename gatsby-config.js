require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
	/* Your site config here */
	siteMetadata: require('./site-meta-data.json'),
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `blog`,
				path: `${__dirname}/blog/`,
			},
		},
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
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				background_color: `#f7f0eb`,
				cache_busting_mode: 'none',
				display: `standalone`,
				icon: `src/images/icon.png`,
				icon_options: {
					purpose: `any maskable`,
				},
				name: `John Blackwell Portfolio`,
				short_name: `JB Portfolio`,
				start_url: `/`,
				theme_color: `#a2466c`,
				theme_color_in_head: false, // This will avoid adding theme-color meta tag.
			},
		},
		`gatsby-plugin-netlify-cms`,
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				serialize: ({ path, modifiedGmt }) => {
					return {
						url: path,
						lastmod: modifiedGmt,
					};
				},
			},
		},
		`gatsby-transformer-remark`,
	],
};
