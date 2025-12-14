import React from "react";
type Props = {
  params: {
    id: string;
  };
};
const SinglePageItem = async ({ params }: Props) => {
  const i = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  console.log(await i.json());

  return <div>SinglePageItem</div>;
};

export default SinglePageItem;
9;
