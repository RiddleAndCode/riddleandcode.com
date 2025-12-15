# Content Feed Management

This file controls the LinkedIn and Medium posts displayed on the `/company/news.html` page.

## How to Add New Content

### 1. LinkedIn Posts

#### Option A: Embedded Post (Recommended)
```json
{
  "type": "linkedin",
  "title": "Your Post Title",
  "description": "Brief description of the post",
  "url": "https://www.linkedin.com/posts/riddleandcode_post-url",
  "embedUrl": "https://www.linkedin.com/embed/feed/update/urn:li:share:YOUR_POST_ID",
  "date": "2024-12-12",
  "featured": false
}
```

**How to get embedUrl:**
1. Go to your LinkedIn post
2. Click the "..." menu (top right of post)
3. Select "Embed"
4. Copy the `src` attribute from the iframe code
5. Paste it as the `embedUrl` value

#### Option B: Link Card (No Embed)
```json
{
  "type": "linkedin",
  "title": "Your Post Title",
  "description": "Brief description of the post",
  "url": "https://www.linkedin.com/posts/riddleandcode_post-url",
  "date": "2024-12-12",
  "featured": false
}
```

### 2. Medium Articles

```json
{
  "type": "medium",
  "title": "Your Article Title",
  "description": "Brief description or excerpt from the article",
  "url": "https://medium.com/@riddleandcode/your-article-slug",
  "image": "https://your-image-url.com/image.jpg",
  "date": "2024-12-12",
  "featured": false
}
```

**Image URL:** You can use the article's featured image URL from Medium.

## Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | Either `"linkedin"` or `"medium"` |
| `title` | Yes | Title of the post/article |
| `description` | Yes | Brief description (1-2 sentences) |
| `url` | Yes | Direct link to the post/article |
| `embedUrl` | LinkedIn only | Embed URL for LinkedIn iframe |
| `image` | Medium only | Featured image URL |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `featured` | Optional | Set to `true` to highlight (not yet implemented) |

## Example Complete Entry

```json
{
  "posts": [
    {
      "type": "linkedin",
      "title": "Announcing Our New Partnership with RDDL Foundation",
      "description": "Excited to announce our strategic partnership that will accelerate Web3 adoption in the energy sector.",
      "url": "https://www.linkedin.com/posts/riddleandcode_partnership-announcement",
      "embedUrl": "https://www.linkedin.com/embed/feed/update/urn:li:share:7145678901234567890",
      "date": "2024-12-12",
      "featured": true
    },
    {
      "type": "medium",
      "title": "The Future of Energy Tokenization",
      "description": "Exploring how blockchain technology is transforming the energy sector through tokenization and smart contracts.",
      "url": "https://medium.com/@riddleandcode/future-of-energy-tokenization-abc123",
      "image": "https://miro.medium.com/max/1400/1*YourImageHash.jpg",
      "date": "2024-12-10",
      "featured": false
    }
  ]
}
```

## Tips

- **Date Format:** Always use YYYY-MM-DD (e.g., 2024-12-12)
- **Order:** Posts are automatically sorted by date (newest first)
- **Testing:** After adding new content, refresh the page and check all three filter tabs
- **LinkedIn Embeds:** Embedded posts look better but take more vertical space
- **Medium Images:** Optional but recommended for visual appeal

## Troubleshooting

**Content not showing?**
- Check JSON syntax (use a JSON validator)
- Ensure all required fields are present
- Check browser console for errors

**LinkedIn embed not working?**
- Verify the embedUrl is correct
- Make sure the post is public
- Some corporate posts may not support embedding
