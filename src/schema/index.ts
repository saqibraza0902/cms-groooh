import * as z from "zod";
export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required."),
  desc: z.string().min(1, "Description is required."),
  url: z.string().min(1, "Image URL is required"),
  content: z.string().min(1, "Content is required."),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required.")
    .max(5, "You can add up to 5 tags."),
});
export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  desc: z.string().min(1, "Description is required."),
  content: z.string().min(1, "Content is required."),
  gallery: z
    .array(
      z.object({
        url: z.string().min(1, "Image URL is required."),
        alt: z.string().min(1, "Alt text is required."),
      })
    )
    .min(1, "At least one image is required in the gallery."),
  clientName: z.string().min(1, "Client name is required"),
  clientCountry: z.string().min(1, "Client country is required"),
  startDate: z.date(),
  endDate: z.date(),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required.")
    .max(5, "You can add up to 5 tags."),
});
export const CommentSchema = z.object({
  desc: z.string().min(1, "Content is required."),
});
