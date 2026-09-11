/**
 * Renders structured data as a plain script tag (Next's recommended pattern
 * for JSON-LD — it is data, not executable code, so next/script is wrong
 * here). `<` is escaped so no string in the payload can close the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
