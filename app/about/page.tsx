// app/page.js
import { Stack } from '@/lib/contentstack';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const query = Stack.ContentType('blog_landing_page').Query();
  const response = await query.toJSON().includeContentType().find();

  // Use the content type details from response[1]
  const contentTypeDetails = response[1];
  const schemaFields = contentTypeDetails.schema; // array of all fields

  return (
    <main className="max-w-3xl mx-auto p-4">
      <header className="mb-8">
        {/* Display the landing page title and description */}
        <h1 className="text-4xl font-bold">{contentTypeDetails.title}</h1>
        {contentTypeDetails.description && (
          <p className="text-gray-600">{contentTypeDetails.description}</p>
        )}
      </header>

      <section>
        {schemaFields.map((field :any) => (
          <div key={field.uid} className="mb-6 border p-4 rounded">
            <h2 className="text-2xl font-semibold">{field.display_name}</h2>
            {field.field_metadata?.description && (
              <p className="text-gray-600">{field.field_metadata.description}</p>
            )}
            <p className="text-sm text-gray-500">Data Type: {field.data_type}</p>
            {/* If the field is "cover_image", display a profile picture placeholder */}
            {field.uid === 'cover_image' && (
              <div className="mt-4">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Cover Image Placeholder"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            )}
          </div>
        ))}
      </section>

      <footer className="mt-8">
        <Link href="/about" className="text-blue-600 hover:underline">
          About this Blog
        </Link>
      </footer>
    </main>
  );
}
