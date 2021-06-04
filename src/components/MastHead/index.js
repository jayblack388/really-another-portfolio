import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default function MastHead() {
	const {
		github: {
			viewer: {
				avatarUrl,
				bio,
				company,
				email,
				isDeveloperProgramMember,
				isHireable,
				location,
				login,
				name,
				organizations,
				websiteUrl,
			},
		},
	} = useStaticQuery(graphql`
		query MastHeadQuery {
			github {
				viewer {
					avatarUrl
					bio
					company
					email
					isDeveloperProgramMember
					isHireable
					location
					login
					name
					organizations(first: 10) {
						nodes {
							avatarUrl
						}
					}
					url
					websiteUrl
				}
			}
		}
	`);
	return (
		<>
			<div>This will be the masthead</div>
		</>
	);
}
