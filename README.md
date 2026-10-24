# FRAME//SHIFT — Cinematic Video Editor Portfolio

A responsive, no-build portfolio website for an Instagram Reels / short-form video editor. It uses plain HTML, CSS, and JavaScript, so it can be run immediately without installing Node.js or dependencies.

## Run it

1. Extract the ZIP file.
2. Open the `frame-shift-portfolio` folder.
3. Double-click `index.html` to open it in a modern browser.

For local development, you can also run a simple local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Important: personalize before publishing

Open `script.js` and edit the `SITE_CONFIG` object near the top:

- `instagramUrl`: the editor's Instagram profile URL.
- `whatsappNumber`: phone number with country code, digits only. Example: `919876543210`.
- `email`: the contact email (add the actual address where needed).
- `demoVideoUrl`: replace with a direct MP4 URL for your showreel.

The visual project entries are in the `PROJECTS` object in `script.js`. Each project can have a `title`, `category`, `description`, `instagramUrl`, and direct `videoUrl`. The project cards and their thumbnails are in `index.html`; replace their image URLs with your real thumbnail assets.

## Add your own video files

1. Create an `assets/videos` folder.
2. Copy your MP4 files into it.
3. In `script.js`, set a project's `videoUrl` to a relative path such as `assets/videos/my-reel.mp4`.
4. Update the corresponding card image in `index.html` to your own thumbnail.

A direct MP4 URL or local MP4 path is required for native video playback. An Instagram Reel URL is not a direct MP4 URL; use the Instagram profile/link as an external viewing option.

## Contact form behavior

The inquiry form creates a message and opens WhatsApp. The visitor must press Send in WhatsApp; the website does not silently submit anything. Set `whatsappNumber` to direct messages to the correct number. Until a number is configured, WhatsApp opens with no preselected recipient.

## Demo content notice

The included project titles and images are illustrative demo concepts, not real client work or testimonials. Replace them with the editor's actual projects before publishing. Demo images load from Unsplash and therefore need an internet connection.

## Included

- Responsive desktop and mobile layout
- Mobile navigation with close button
- Portfolio category filtering
- Video modal with playback and error fallback
- Keyboard Escape support and focus restoration
- WhatsApp inquiry form
- Reduced-motion support
- Basic SEO and Open Graph metadata
- Centralized site configuration and project data
