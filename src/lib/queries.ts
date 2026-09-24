const image = `{
  alt,
  caption,
  hotspot,
  crop,
  asset->{ _id, url, metadata { lqip, dimensions } }
}`;

const projectFields = `
  title,
  "slug": slug.current,
  description,
  headline,
  category,
  year,
  role,
  featured,
  "technologies": coalesce(technologies, []),
  coverImage ${image},
  "gallery": coalesce(gallery[] ${image}, []),
  problem,
  approach,
  implementation,
  lessons,
  "results": coalesce(results, []),
  github,
  liveUrl
`;

export const siteQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name,
  role,
  publication,
  tagline,
  description,
  heroHeadline,
  heroIntro,
  bio,
  portrait ${image},
  location,
  yearsExperience,
  focus,
  email,
  github,
  linkedin,
  "resume": coalesce(resume.asset->url, resumeUrl),
  contactHeadline,
  "stack": coalesce(stack[]{ label, "items": coalesce(items, []) }, []),
  "lab": coalesce(lab[]{ title, note, url }, []),
  sections
}`;

export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(featured desc, coalesce(order, 999) asc, year desc) {
  ${projectFields}
}`;

export const experienceQuery = `*[_type == "experience"] | order(startDate desc) {
  company,
  role,
  startDate,
  endDate,
  location,
  description,
  "surfaces": coalesce(surfaces, []),
  "technologies": coalesce(technologies, []),
  "achievements": coalesce(achievements, [])
}`;
