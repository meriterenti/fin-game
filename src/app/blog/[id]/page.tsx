import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return response.json();
}

export const generateMetadata = ({ params: { id } }: Props) => {
  return {
    title: `post ${id}`,
  };
};

export default async function Post({ params: { id } }: Props) {
  const post: any = await getData(id);

  return (
    <>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </>
  );
}
