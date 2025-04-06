// scripts/migrate.ts
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '../sanity/lib/api'

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  token: process.env.SANITY_WRITE_TOKEN // Make sure to create a token with write access
})

// Function to migrate all posts
const migratePosts = async () => {
  // First, fetch all posts that have the old language field
  const posts = await client.fetch(`*[_type == "post" && defined(language)]`)
  
  console.log(`Found ${posts.length} posts to migrate`)

  for (const post of posts) {
    try {
      // First, check if this is a draft
      const isDraft = post._id.startsWith('drafts.')
      const baseId = isDraft ? post._id.replace('drafts.', '') : post._id
      
      // 1. Update the published document if it exists
      if (!isDraft) {
        await client
          .patch(post._id)
          .unset(['language']) // Remove old field
          .set({
            __i18n_lang: post.language,
          })
          .commit()
          .then(() => {
            console.log(`✓ Migrated published post ${post._id}`)
          })
      }

      // 2. Update the draft if it exists
      const draftId = `drafts.${baseId}`
      const draftExists = await client.fetch(`*[_id == $id][0]`, { id: draftId })
      
      if (draftExists) {
        await client
          .patch(draftId)
          .unset(['language'])
          .set({
            __i18n_lang: post.language,
          })
          .commit()
          .then(() => {
            console.log(`✓ Migrated draft post ${draftId}`)
          })
      }

    } catch (err) {
      console.error(`✗ Failed to migrate post ${post._id}:`, err.message)
    }
  }

  console.log('Migration completed!')
}

// Run migration
migratePosts().catch(console.error)