import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import metaData from '../../../site-meta-data.json';

const { title } = metaData;

function SEO({ description, image: metaImage, lang, meta, pathname, title }) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						author
						description
						keywords
						siteUrl
						title
					}
				}
			}
		`
	);
	const canonical = pathname
		? `${site.siteMetadata.siteUrl}${pathname}`
		: null;
	const image = metaImage?.src
		? `${site.siteMetadata.siteUrl}${metaImage.src}`
		: null;
	const metaDescription = description || site.siteMetadata.description;
	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			link={
				canonical
					? [
							{
								rel: 'canonical',
								href: canonical,
							},
					  ]
					: []
			}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					name: 'keywords',
					content: site.siteMetadata.keywords.join(','),
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				{
					name: `twitter:title`,
					content: title,
				},
			]
				.concat(
					metaImage
						? [
								{
									property: 'og:image',
									content: image,
								},
								{
									property: 'og:image:width',
									content: metaImage.width,
								},
								{
									property: 'og:image:height',
									content: metaImage.height,
								},
								{
									name: 'twitter:card',
									content: 'summary_large_image',
								},
						  ]
						: [
								{
									name: 'twitter:card',
									content: 'summary',
								},
						  ]
				)
				.concat(meta)}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
		/>
	);
}

SEO.propTypes = {
	description: PropTypes.string,
	image: PropTypes.shape({
		src: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
	}),
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	pathname: PropTypes.string,
	title: PropTypes.string.isRequired,
};

SEO.defaultProps = {
	description: ``,
	lang: `en`,
	meta: [],
	title,
};

export default SEO;
