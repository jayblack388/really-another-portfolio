import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';

export default function Home({ data }) {
	const { title, description } = data.site.siteMetadata;

	return (
		<>
			<SEO title="Home" />
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
				<img alt='Cute dog' src={data.image.publicURL} />
				<Link to='/blog'>Read my blog</Link>
			</div>
		</>
	);
}

export const pageQuery = graphql`
	query MetadataQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
		image: file(base: { eq: "John-Avatar.jpg" }) {
			publicURL
		}
	}
`;
