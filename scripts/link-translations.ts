import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/lib/api';

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  token: process.env.SANITY_WRITE_TOKEN, // Make sure to create a token with write access
});

// Function to link translations between posts
const linkTranslations = async () => {
  // Fetch all posts
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current) && defined(language)]`
  );

  console.log(`Found ${posts.length} posts to process`);

  // Group posts by title (assuming same title means same content in different languages)
  const postsByTitle: Record<string, any[]> = {};

  posts.forEach((post: any) => {
    const title = post.title;
    if (!postsByTitle[title]) {
      postsByTitle[title] = [];
    }
    postsByTitle[title].push(post);
  });

  // Process each group of posts with the same title
  for (const [title, groupPosts] of Object.entries(postsByTitle)) {
    // Skip if there's only one post with this title
    if (groupPosts.length <= 1) continue;

    console.log(
      `Processing group with title: "${title}" (${groupPosts.length} posts)`
    );

    // For each post in the group, link to all other posts as translations
    for (const post of groupPosts) {
      // Skip posts that are in the same language
      const otherPosts = groupPosts.filter(
        (p: any) => p._id !== post._id && p.language !== post.language
      );

      if (otherPosts.length === 0) continue;

      // Create references to other posts
      const translationRefs = otherPosts.map((p: any) => ({
        _type: 'reference',
        _ref: p._id,
        _key: `${p._id}-${Date.now()}`,
      }));

      // Update the post with translation references
      try {
        await client
          .patch(post._id)
          .set({
            translations: translationRefs,
          })
          .commit();

        console.log(
          `✓ Updated post ${post._id} (${post.language}) with ${translationRefs.length} translations`
        );
      } catch (error: any) {
        console.error(`✗ Failed to update post ${post._id}:`, error.message);
      }
    }
  }

  console.log('Translation linking completed!');
};

// Run the function
linkTranslations().catch(console.error);
