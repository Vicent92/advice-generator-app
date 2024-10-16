import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async () => {
  const data = await fetch("https://api.adviceslip.com/advice");
  const resJson = await data.json();
  console.log("RES", resJson);
  return resJson?.slip;
};

export const loader = async () => {
  const data = await fetch("https://api.adviceslip.com/advice");
  const resJson = await data.json();

  return resJson?.slip;
};

export default function Index() {
  const { id, advice } = useLoaderData<typeof loader>();
  const newFetcher = useFetcher();

  const finalAdvice = newFetcher.data?.advice ?? advice;
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container-advice">
        <div className="advice-content">{finalAdvice}</div>

        <newFetcher.Form method="post">
          <button className="new-button" type="submit">
            NEW
          </button>
        </newFetcher.Form>
      </div>
    </div>
  );
}
