/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.6,
  transform: async (config, path) => ({
    loc: path,
    changeFreq: config.changefreq,
    priority: getPriority(path, config.priority),
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: config.alternateRefs ?? [],
  }),
};

module.exports = config;

const getPriority = (path, defaultFreq) => {
  const reservedPaths = {
    "/": 1,
    "/cv": 0.8,
    "/projects": 0.8,
    "/contact-me": 0.7,
    string: defaultFreq,
  };
  if (!path) {
    return 1;
  } else if (Object.keys(reservedPaths).includes(path)) {
    return reservedPaths[path];
  } else {
    return defaultFreq;
  }
};
