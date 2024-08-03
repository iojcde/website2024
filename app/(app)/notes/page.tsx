import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

const NotesPage = async () => {
  const payload = await getPayloadHMR({ config });

  const data = await payload.find({
    collection: "posts",
  });

  console.log(JSON.stringify(data, null, 2));

  return (
    <div className=" pt-12">
      <div className="sticky top-0 px-6  z-20 py-2">
        <h1 className="font-bold">Notes</h1>
      </div>
      <div className="space-y-4">
        {data.docs.map((doc) => (
          <div key={doc.id}>
            <h2 className="font-bold">{doc.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: doc.content_html,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
