import Header from "@/component/Header";
import { Stack } from "@/lib/contentstack";
import Link from "next/link";

export const revalidate = 60;

interface FieldMetadata {
  description?: string;
}

interface Field {
  uid: string;
  field_metadata?: FieldMetadata;
  display_name?: string;
}

interface ContentTypeDetails {
  schema: Field[];
  title?: string;
}

export default async function Home() {
  const query = Stack.ContentType("blog_landing_page").Query();
  const response = await query.toJSON().includeContentType().find();

  // Use the content type details from response[1]
  const contentTypeDetails: ContentTypeDetails = response[1];
  const schemaFields: Field[] = contentTypeDetails.schema;
  console.log("schemaFields", schemaFields);

  // Retrieve specific fields manually
  const bodyField = schemaFields.find((field) => field.uid === "body");
  const coverImageField = schemaFields.find((field) => field.uid === "cover_image");
  const customField = schemaFields.find((field) => field.uid === "custom_field");

  return (
    <>
      <Header />
      <main className="w-full min-h-screen">
        {/* Hero Section: Body Content and Cover Image */}
        <section className="w-full h-130">
          {bodyField ? (
            <div className="p-8 bg-gray-300 h-full rounded-lg flex flex-col">
              {bodyField.field_metadata?.description && (
                <p className="text-lg text-gray-700 mb-4">
                  {bodyField.field_metadata.description}
                </p>
              )}
              {coverImageField && (
                <div className="mt-4">
                  <p className="text-4xl w-1/3 text-black-700 mb-4">
                    Welcome to our content stack!
                  </p>
                  <img
                    src="https://images.contentstack.io/v3/assets/blt82a6ce14eb429f71/blt26013181e75a7cce/67dd6605f7eccc6f3a90d6a1/elevated-view-laptop-stationeries-yellow-backdrop.jpg"
                    alt="Cover Image"
                    className="w-full h-100 max-w-md object-cover rounded-lg float-right"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No hero content available.
            </p>
          )}
        </section>

        {/* Content Section for Additional Fields (e.g., Custom Field) */}
        {customField && (
          <section className="mb-10">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {customField.display_name}
              </h2>
              {customField.field_metadata?.description && (
                <p className="mt-2 text-gray-600">
                  {customField.field_metadata.description}
                </p>
              )}
            </div>
          </section>
        )}

        <footer className="mt-12 text-center">
          <Link href="/about" className="text-blue-600 hover:underline text-lg">
            About this Blog
          </Link>
        </footer>
      </main>
    </>
  );
}
