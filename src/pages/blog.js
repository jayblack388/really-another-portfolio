import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import metaData from '../../site-meta-data.json';

const { author } = metaData;

export default function Blog({ data }) {
	const { posts } = data.blog;

	return (
		<>
			<SEO title='Blog' />
			<div>
				<h1>My blog posts</h1>

				{posts.map(post => (
					<article key={post.id}>
						<Link to={`/blog${post.fields.slug}`}>
							<h2>{post.frontmatter.title}</h2>
						</Link>
						<small>
							{author}, {post.frontmatter.date}
						</small>
						<p>{post.frontmatter.snippet}</p>
					</article>
				))}
			</div>
		</>
	);
}

export const pageQuery = graphql`
	query MyQuery {
		blog: allMarkdownRemark {
			posts: nodes {
				fields {
					slug
				}
				frontmatter {
					date(fromNow: true)
					snippet
					title
				}
				id
			}
		}
	}
`;
