import { defineField, defineType } from "sanity";

/**
 * External video embed (YouTube / Vimeo). Site renders an iframe; Sanity
 * stores just the provider + ID.
 */
export default defineType({
  name: "videoEmbed",
  title: "Video Embed",
  type: "object",
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
        ],
        layout: "radio",
      },
      initialValue: "youtube",
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      description:
        "The bit after v= in YouTube URLs (e.g. dQw4w9WgXcQ), or the numeric Vimeo ID.",
    }),
    defineField({
      name: "caption",
      title: "Caption (English)",
      type: "string",
    }),
    defineField({
      name: "captionRu",
      title: "Caption (Русский)",
      type: "string",
    }),
  ],
  preview: {
    select: { provider: "provider", videoId: "videoId", caption: "caption" },
    prepare({ provider, videoId, caption }) {
      return {
        title: caption || videoId || "(no video)",
        subtitle: provider,
      };
    },
  },
});
