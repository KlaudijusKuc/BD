import { defineEventHandler, createError } from 'h3'

const posts = [
  {
    slug: 'future-of-cloud-computing-2024',
    title: 'The Future of Cloud Computing in 2024',
    excerpt: 'Explore the latest trends and innovations shaping cloud computing in 2024.',
    image: '/images/blog/cloud-computing.jpg',
    date: '2024-04-01',
    readingTime: 5,
    content: `
      <h2>Introduction</h2>
      <p>Cloud computing continues to evolve at a rapid pace, transforming how businesses operate and innovate. In 2024, we're seeing several emerging trends that are reshaping the cloud computing landscape.</p>

      <h2>Key Trends</h2>
      <ul>
        <li>Edge Computing Integration</li>
        <li>AI and Machine Learning Services</li>
        <li>Multi-Cloud Strategies</li>
        <li>Serverless Computing</li>
      </ul>

      <h2>Conclusion</h2>
      <p>As we move forward in 2024, cloud computing will continue to be a crucial driver of digital transformation, enabling organizations to become more agile, efficient, and innovative.</p>
    `
  },
  {
    slug: 'cybersecurity-best-practices-remote-work',
    title: 'Cybersecurity Best Practices for Remote Work',
    excerpt: 'Essential security measures for protecting your remote workforce.',
    image: '/images/blog/cybersecurity.jpg',
    date: '2024-03-28',
    readingTime: 4,
    content: `
      <h2>Introduction</h2>
      <p>With remote work becoming the norm, organizations must prioritize cybersecurity to protect their data and systems. Here are essential best practices for maintaining security in a remote work environment.</p>

      <h2>Best Practices</h2>
      <ul>
        <li>Use VPN for Secure Connections</li>
        <li>Implement Multi-Factor Authentication</li>
        <li>Regular Security Training</li>
        <li>Endpoint Protection</li>
      </ul>

      <h2>Conclusion</h2>
      <p>By following these best practices, organizations can significantly reduce their cybersecurity risks while maintaining productivity in a remote work setting.</p>
    `
  },
  {
    slug: 'digital-transformation-guide-smes',
    title: 'Digital Transformation Guide for SMEs',
    excerpt: 'A comprehensive guide to digital transformation for small and medium enterprises.',
    image: '/images/blog/digital-transformation.jpg',
    date: '2024-03-25',
    readingTime: 6,
    content: `
      <h2>Introduction</h2>
      <p>Digital transformation is crucial for SMEs to remain competitive in today's business environment. This guide provides a roadmap for successful digital transformation.</p>

      <h2>Key Steps</h2>
      <ul>
        <li>Assess Current Digital Maturity</li>
        <li>Develop a Digital Strategy</li>
        <li>Choose the Right Technologies</li>
        <li>Train and Empower Employees</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Digital transformation is an ongoing journey that requires commitment, planning, and the right resources. Start small, measure results, and continuously adapt your approach.</p>
    `
  }
];

// GET /api/blog - Get all blog posts
export const getBlogPosts = defineEventHandler(async (event) => {
  return posts.map(({ content, ...post }) => post);
});

// GET /api/blog/:slug - Get a single blog post
export const getBlogPost = defineEventHandler(async (event) => {
  const slug = event.context.params.slug;
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    throw createError({
      statusCode: 404,
      message: 'Blog post not found'
    });
  }
  
  return post;
});

// Default handler for all routes
export default defineEventHandler(async (event) => {
  const method = event.method;
  const path = event.path;
  
  // Handle GET /api/blog
  if (method === 'GET' && path === '/api/blog') {
    return getBlogPosts(event);
  }
  
  // Handle GET /api/blog/:slug
  if (method === 'GET' && path.match(/^\/api\/blog\/[a-z0-9-]+$/)) {
    return getBlogPost(event);
  }
  
  // Return 404 for other routes
  throw createError({
    statusCode: 404,
    message: 'Not found'
  });
}); 