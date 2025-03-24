type CityPageProps = {
    params: {
      city: string;
    };
  };
  
  export default async function CityPage({
    params, // Access the entire params object
  }: {
    params: { city: string };
  }) {
    const { city } =  await params; // Destructure 'city' within the function body
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">City: {city}</h1>
        <p>Welcome to the dynamic page for {city}!</p>
      </div>
    );
  }
  