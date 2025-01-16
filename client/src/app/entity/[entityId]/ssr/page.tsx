import { Suspense, use } from "react";

const getFiles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["file1", "file2", "file3"]);
    }, 5000);
  });
};

const Listing = () => {
  const files = use(getFiles());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>{JSON.stringify(files, null, 2)}</div>
    </Suspense>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Listing />
    </Suspense>
  );
};
export default Page;
